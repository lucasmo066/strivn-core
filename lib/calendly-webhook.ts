import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

const questionSchema = z.object({
  question: z.string().max(500),
  answer: z.string().max(2000),
}).passthrough();

const payloadSchema = z.object({
  event: z.enum(["invitee.created", "invitee.canceled"]),
  payload: z.object({
    email: z.string().email().max(254),
    name: z.string().trim().min(1).max(100),
    uri: z.string().url().max(500),
    timezone: z.string().max(100).default("UTC"),
    questions_and_answers: z.array(questionSchema).max(10).default([]),
    cancellation: z.object({
      canceled_at: z.string().datetime(),
      reason: z.string().max(1000).nullish(),
    }).nullish(),
    scheduled_event: z.object({
      uri: z.string().url().max(500),
      name: z.string().trim().min(1).max(200),
      start_time: z.string().datetime(),
      end_time: z.string().datetime(),
    }).passthrough(),
  }).passthrough(),
}).passthrough();

export type CalendlyWebhook = z.infer<typeof payloadSchema>;

export function verifyCalendlySignature(
  body: string,
  header: string | null,
  signingKey: string | undefined,
  nowSeconds = Math.floor(Date.now() / 1000),
): boolean {
  if (!header || !signingKey) return false;
  const values = Object.fromEntries(header.split(",").map((part) => {
    const [key, ...rest] = part.trim().split("=");
    return [key, rest.join("=")];
  }));
  const timestamp = Number(values.t);
  const provided = values.v1;
  if (!Number.isSafeInteger(timestamp) || !provided || !/^[a-f0-9]{64}$/i.test(provided)) return false;
  if (Math.abs(nowSeconds - timestamp) > 180) return false;

  const expected = createHmac("sha256", signingKey).update(`${timestamp}.${body}`).digest();
  const actual = Buffer.from(provided, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function parseCalendlyWebhook(value: unknown): CalendlyWebhook {
  return payloadSchema.parse(value);
}

export function calendlyLead(event: CalendlyWebhook) {
  const { payload } = event;
  const answers = payload.questions_and_answers;
  const businessAnswer = answers.find(({ question }) => /business|company|organization/i.test(question))?.answer;
  const answersText = answers.length
    ? answers.map(({ question, answer }) => `${question}: ${answer}`).join("\n")
    : "No additional booking answers were provided.";
  const canceled = event.event === "invitee.canceled";

  return {
    name: payload.name,
    email: payload.email.toLowerCase(),
    business: (businessAnswer?.trim() || "Calendly booking").slice(0, 120),
    details: [
      `${payload.scheduled_event.name} (${canceled ? "canceled" : "confirmed"})`,
      `Starts: ${payload.scheduled_event.start_time}`,
      `Timezone: ${payload.timezone}`,
      "",
      answersText,
      ...(payload.cancellation?.reason ? ["", `Cancellation reason: ${payload.cancellation.reason}`] : []),
    ].join("\n").slice(0, 2000),
    source: "calendly_booking" as const,
    eventUri: payload.scheduled_event.uri,
    inviteeUri: payload.uri,
    startAt: payload.scheduled_event.start_time,
    endAt: payload.scheduled_event.end_time,
    timezone: payload.timezone,
    bookingStatus: canceled ? "canceled" as const : "active" as const,
    canceledAt: payload.cancellation?.canceled_at ?? null,
    cancelReason: payload.cancellation?.reason ?? null,
  };
}
