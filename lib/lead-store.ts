import "server-only";

import type { ContactInput } from "./contact";

export class LeadStoreError extends Error {
  constructor(public readonly status: number) {
    super("Lead storage failed");
  }
}

export interface SavedLead {
  id: string;
  created: boolean;
}

async function databaseRequest(path: string, init: RequestInit) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new LeadStoreError(503);

  // The dashboard sometimes presents the Data API endpoint rather than the
  // project origin. Accept either without creating /rest/v1/rest/v1 URLs.
  const baseUrl = url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

  const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      // Legacy JWT keys require Authorization; new secret keys use apikey only.
      ...(key.startsWith("sb_secret_") ? {} : { Authorization: `Bearer ${key}` }),
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new LeadStoreError(response.status);
  return response;
}

export async function saveLead(lead: ContactInput): Promise<SavedLead> {
  const response = await databaseRequest("rpc/submit_website_lead", {
    method: "POST",
    body: JSON.stringify({
      p_request_id: lead.requestId,
      p_name: lead.name,
      p_email: lead.email.toLowerCase(),
      p_business: lead.business,
      p_details: lead.details,
      p_source: lead.source,
    }),
  });
  const saved: unknown = await response.json();
  if (
    !saved || typeof saved !== "object" || !("id" in saved) ||
    typeof saved.id !== "string" || !("created" in saved) ||
    typeof saved.created !== "boolean"
  ) throw new LeadStoreError(502);
  return saved as SavedLead;
}

export async function updateLeadDelivery(
  id: string,
  delivery: Record<"email_status" | "notion_status", "sent" | "failed" | "not_configured">
) {
  await databaseRequest(`website_leads?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(delivery),
  });
}
