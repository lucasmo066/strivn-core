import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  contactSchema,
  fieldErrorsFromZod,
  type ContactErrorResponse,
  type ContactSuccessResponse,
} from "@/lib/contact";
import { createNotionLead } from "@/lib/notion-leads";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function jsonError(
  status: number,
  body: ContactErrorResponse,
  headers?: HeadersInit
) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.success) {
    return jsonError(
      429,
      { ok: false, error: "Too many requests. Please try again later." },
      { "Retry-After": String(limited.retryAfterSec) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, { ok: false, error: "Invalid request body." });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, {
      ok: false,
      error: "Please check the form and try again.",
      fieldErrors: fieldErrorsFromZod(parsed.error),
    });
  }

  const { website, ...lead } = parsed.data;

  // Honeypot tripped — pretend success without sending.
  if (website && website.trim().length > 0) {
    const ok: ContactSuccessResponse = { ok: true };
    return NextResponse.json(ok);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Contact form missing RESEND_API_KEY / CONTACT_* env");
    return jsonError(500, {
      ok: false,
      error: "Something went wrong. Please try again later.",
    });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: lead.email,
      subject: `New lead: ${lead.business}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Business: ${lead.business}`,
        "",
        "What they need:",
        lead.details,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return jsonError(500, {
        ok: false,
        error: "Something went wrong. Please try again later.",
      });
    }
  } catch (err) {
    console.error("Resend send failed:", err);
    return jsonError(500, {
      ok: false,
      error: "Something went wrong. Please try again later.",
    });
  }

  try {
    await createNotionLead(lead);
  } catch (err) {
    console.error("Notion lead create failed:", err);
  }

  const ok: ContactSuccessResponse = { ok: true };
  return NextResponse.json(ok);
}
