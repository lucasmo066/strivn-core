import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(254),
  business: z.string().trim().min(1, "Business is required").max(120),
  details: z.string().trim().min(1, "Tell us what you need").max(2000),
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "business" | "details", string>
>;

export type ContactSuccessResponse = { ok: true };

export type ContactErrorResponse = {
  ok: false;
  error: string;
  fieldErrors?: ContactFieldErrors;
};

export type ContactResponse = ContactSuccessResponse | ContactErrorResponse;

export function fieldErrorsFromZod(
  error: z.ZodError
): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (
      key === "name" ||
      key === "email" ||
      key === "business" ||
      key === "details"
    ) {
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
  }

  return fieldErrors;
}
