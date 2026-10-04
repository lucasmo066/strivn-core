import "server-only";

import { Resend } from "resend";
import type { ContactInput } from "./contact";
import { createNotionLead } from "./notion-leads";
import { updateLeadDelivery } from "./lead-store";

type DeliveryStatus = "sent" | "failed" | "not_configured";
type LeadNotification = Pick<ContactInput, "name" | "email" | "business" | "details"> & {
  source: ContactInput["source"] | "calendly_booking";
};

async function emailLead(
  lead: LeadNotification,
  id: string,
  subjectPrefix?: string,
): Promise<DeliveryStatus> {
  const { RESEND_API_KEY: apiKey, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!apiKey || !to || !from) return "not_configured";

  try {
    const resend = new Resend(apiKey);
    const options = { idempotencyKey: `website-lead/${id}`, signal: AbortSignal.timeout(10_000) };
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: lead.email,
      subject: `${subjectPrefix ?? (lead.source === "call_request" ? "Call request" : "New project inquiry")}: ${lead.business.replace(/[\r\n]/g, " ")}`,
      text: [
        `Name: ${lead.name}`, `Email: ${lead.email}`, `Business: ${lead.business}`,
        `Source: ${lead.source}`, "", lead.details, "",
        "Reply to this email to follow up directly.",
        ...(process.env.CONTACT_LEADS_URL ? [`Lead inbox: ${process.env.CONTACT_LEADS_URL}`] : []),
        `Lead ID: ${id}`,
      ].join("\n"),
    }, options);
    return error ? "failed" : "sent";
  } catch {
    return "failed";
  }
}

async function mirrorLead(lead: LeadNotification): Promise<DeliveryStatus> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_PIPELINE_DATABASE_ID) {
    return "not_configured";
  }
  try {
    await createNotionLead(lead);
    return "sent";
  } catch {
    return "failed";
  }
}

export async function notifyLead(
  lead: LeadNotification,
  id: string,
  options: { subjectPrefix?: string; mirrorToNotion?: boolean } = {},
) {
  const [email_status, notion_status] = await Promise.all([
    emailLead(lead, id, options.subjectPrefix),
    options.mirrorToNotion === false ? Promise.resolve("not_configured" as const) : mirrorLead(lead),
  ]);
  if (email_status === "failed" || notion_status === "failed") {
    console.error("Lead saved; a notification needs follow-up", { id, email_status, notion_status });
  }
  try {
    await updateLeadDelivery(id, { email_status, notion_status });
  } catch {
    console.error("Lead saved; delivery status could not be updated", { id });
  }
}
