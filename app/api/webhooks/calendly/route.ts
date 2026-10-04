import { after, NextResponse } from "next/server";

import { calendlyLead, parseCalendlyWebhook, verifyCalendlySignature } from "@/lib/calendly-webhook";
import { notifyLead } from "@/lib/lead-notifications";
import { LeadStoreError, syncCalendlyLead } from "@/lib/lead-store";

export const runtime = "nodejs";
export const maxDuration = 60;
const MAX_WEBHOOK_BYTES = 262_144;

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(length) && length > MAX_WEBHOOK_BYTES) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  const body = await request.text();
  if (Buffer.byteLength(body) > MAX_WEBHOOK_BYTES) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }
  if (!process.env.CALENDLY_WEBHOOK_SIGNING_KEY) {
    console.error("Calendly webhook is not configured");
    return NextResponse.json({ ok: false }, { status: 503 });
  }
  if (!verifyCalendlySignature(
    body,
    request.headers.get("calendly-webhook-signature"),
    process.env.CALENDLY_WEBHOOK_SIGNING_KEY,
  )) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let event;
  try {
    event = parseCalendlyWebhook(JSON.parse(body));
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const lead = calendlyLead(event);
  try {
    const saved = await syncCalendlyLead(lead);
    if (saved.changed) {
      after(() => notifyLead(lead, saved.id, {
        subjectPrefix: lead.bookingStatus === "canceled" ? "Calendly booking canceled" : "New Calendly booking",
        mirrorToNotion: false,
      }));
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Calendly webhook could not save a lead", {
      status: error instanceof LeadStoreError ? error.status : "unavailable",
    });
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
