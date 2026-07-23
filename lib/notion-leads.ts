import { Client } from "@notionhq/client";

import type { ContactInput } from "@/lib/contact";

export async function createNotionLead(
  lead: Pick<ContactInput, "name" | "email" | "business" | "details">
): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_PIPELINE_DATABASE_ID;

  if (!token || !databaseId) {
    return;
  }

  const notion = new Client({ auth: token });

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
        select: { name: "Contacted" },
      },
      Source: {
        select: { name: "Website form" },
      },
      Notes: {
        rich_text: [
          {
            type: "text",
            text: { content: lead.details.slice(0, 2000) },
          },
        ],
      },
    },
  });
}
