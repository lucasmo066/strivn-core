import { after, NextResponse } from "next/server";

import { contactSchema, fieldErrorsFromZod, type ContactErrorResponse } from "@/lib/contact";
import { LeadStoreError, saveLead } from "@/lib/lead-store";
import { notifyLead } from "@/lib/lead-notifications";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;
const MAX_BODY_BYTES = 16_384;

function jsonError(status: number, body: ContactErrorResponse, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonError(403, { ok: false, error: "Please submit from our website." });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.success) {
    return jsonError(429, { ok: false, error: "Too many requests. Please try again in 10 minutes." },
      { "Retry-After": String(limited.retryAfterSec) });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonError(415, { ok: false, error: "Please submit using the contact form." });
  }

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return jsonError(413, { ok: false, error: "Your message is too long. Please shorten it." });
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return jsonError(400, { ok: false, error: "Invalid request body." });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, {
      ok: false, error: "Please check the form and try again.",
      fieldErrors: fieldErrorsFromZod(parsed.error),
    });
  }
  if (parsed.data.website?.trim()) return NextResponse.json({ ok: true });

  try {
    const saved = await saveLead(parsed.data);
    // Persist first. Notification failures must never discard a lead or invite duplicate submissions.
    if (saved.created) after(() => notifyLead(parsed.data, saved.id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof LeadStoreError && error.status === 429) {
      return jsonError(429, { ok: false, error: "Too many requests. Please try again in 10 minutes." },
        { "Retry-After": "600" });
    }
    if (error instanceof LeadStoreError && error.status === 409) {
      return jsonError(409, { ok: false, error: "This request was already sent. Refresh the page to send a new message." });
    }
    console.error("Contact form could not save a lead", {
      status: error instanceof LeadStoreError ? error.status : "unavailable",
    });
    return jsonError(503, { ok: false, error: "We couldn’t save your message. Please try again, or email us directly." });
  }
}
