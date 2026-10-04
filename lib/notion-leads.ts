import { Client } from "@notionhq/client";

export async function createNotionLead(
  lead: {
    name: string;
    email: string;
    business: string;
    details: string;
    source: "contact_form" | "call_request" | "calendly_booking";
  }
): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_PIPELINE_DATABASE_ID;

  if (!token || !databaseId) {
    return;
  }

  const notion = new Client({ auth: token, timeoutMs: 10_000 });

  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      "Business Name": {
        title: [{ type: "text", text: { content: lead.business.slice(0, 2000) } }],
      },
      Contact: {
        rich_text: [
          {
            type: "text",
            text: { content: `${lead.name} · ${lead.email}`.slice(0, 2000) },
          },
        ],
      },
      Stage: {
        select: { name: "New" },
      },
      Source: {
        select: { name: "Website form" },
      },
      Notes: {
        rich_text: [
          {
            type: "text",
            text: { content: `${lead.source === "call_request" ? "Call requested\n\n" : ""}${lead.details}`.slice(0, 2000) },
          },
        ],
      },
    },
  });
}
