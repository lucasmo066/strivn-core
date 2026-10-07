"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";

import { StrivnButton } from "@/components/shared/strivn-button";
import { Input } from "@/components/ui/input";
import type { ContactFieldErrors, ContactResponse } from "@/lib/contact";
import { BRAND } from "@/lib/constants";
import { ContactSuccess } from "@/components/sections/contact-success";
import { cn } from "@/lib/utils";

const fields = ["name", "email", "business", "details"] as const;

type ContactField = (typeof fields)[number];

const fieldLabelClass =
  "text-xs font-semibold tracking-[0.08em] text-foreground uppercase";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="ml-1 text-orange">
      *
    </span>
  );
}

const fieldClass =
  "h-12 rounded-xl border-input bg-background px-3.5 text-[16px] shadow-none placeholder:text-muted-foreground/80 focus-visible:border-orange focus-visible:ring-4 focus-visible:ring-orange/15 md:text-sm";

const textareaClass = cn(
  "min-h-32 w-full resize-y rounded-xl border border-input bg-background px-3.5 py-3 text-[16px] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:border-orange focus-visible:ring-4 focus-visible:ring-orange/15 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm"
);

type FormStatus = "idle" | "loading" | "success" | "error";

function validationMessage(field: ContactField, value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return field === "details" ? "Tell us what you need" : `${field[0].toUpperCase()}${field.slice(1)} is required`;
  }

  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Enter a valid email";
  }

  return undefined;
}

interface ContactFormProps {
  source?: "contact_form" | "call_request";
  selectionSummary?: string;
}

export function ContactForm({ source = "contact_form", selectionSummary }: ContactFormProps) {
  const requestId = useRef<{ id: string; selection?: string } | null>(null);
  const submitting = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});

  const loading = status === "loading";

  const values = { name, email, business, details };

  function setFieldError(field: ContactField, value: string) {
    setFieldErrors((current) => {
      const next = { ...current };
      const message = validationMessage(field, value);

      if (message) {
        next[field] = message;
      } else {
        delete next[field];
      }

      return next;
    });
  }

  function onFieldBlur(field: ContactField) {
    setTouched((current) => ({ ...current, [field]: true }));
    setFieldError(field, values[field]);
  }

  function onFieldChange(
    field: ContactField,
    value: string,
    setValue: (nextValue: string) => void
  ) {
    setValue(value);
    requestId.current = null;

    if (touched[field] || fieldErrors[field]) {
      setFieldError(field, value);
    }

    if (status === "error") {
      setStatus("idle");
      setError(null);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    setError(null);
    setTouched({ name: true, email: true, business: true, details: true });

    const clientErrors = fields.reduce<ContactFieldErrors>((errors, field) => {
      const message = validationMessage(field, values[field]);
      if (message) errors[field] = message;
      return errors;
    }, {});
    const detailsLimit = 2000 - (selectionSummary ? selectionSummary.length + 2 : 0);
    if (details.length > detailsLimit) {
      clientErrors.details = `Keep your project details under ${detailsLimit} characters so we can include your package selection.`;
    }

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatus("error");
      setError("Please correct the highlighted fields and try again.");

      const firstInvalidField = fields.find((field) => clientErrors[field]);
      if (firstInvalidField) {
        requestAnimationFrame(() => {
          document.getElementById(`contact-${firstInvalidField}`)?.focus();
        });
      }
      return;
    }

    submitting.current = true;
    if (!requestId.current || requestId.current.selection !== selectionSummary) {
      requestId.current = { id: crypto.randomUUID(), selection: selectionSummary };
    }
    setStatus("loading");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, business, details: selectionSummary ? `${selectionSummary}\n\n${details}` : details, website, source, requestId: requestId.current.id }),
        signal: AbortSignal.timeout(20_000),
      });

      const data = (await res.json()) as ContactResponse;

      if (!res.ok || !data.ok) {
        if (!data.ok) {
          setFieldErrors(data.fieldErrors ?? {});
          setError(data.error);
        } else {
          setError("Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "success") {
    return <ContactSuccess source={source} />;
  }

  return (
    <form
      className="relative flex h-full flex-col space-y-6 rounded-[var(--radius-button)] border border-border bg-background p-5 shadow-soft sm:p-7 dark:bg-card"
      onSubmit={onSubmit}
      noValidate
      aria-busy={loading}
      aria-describedby={error ? "contact-form-error" : undefined}
    >
      <div
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className={fieldLabelClass}>
            Name
            <RequiredMark />
          </label>
          <Input
            id="contact-name"
            name="name"
            maxLength={100}
            required
            placeholder="Alex Rivera"
            autoComplete="name"
            value={name}
            onChange={(e) => onFieldChange("name", e.target.value, setName)}
            onBlur={() => onFieldBlur("name")}
            disabled={loading}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            className={fieldClass}
          />
          {fieldErrors.name ? (
            <p id="contact-name-error" className="text-xs font-medium text-destructive dark:text-red-300">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className={fieldLabelClass}>
            Email
            <RequiredMark />
          </label>
          <Input
            id="contact-email"
            name="email"
            maxLength={254}
            required
            type="email"
            placeholder="alex@yourbusiness.com"
            autoComplete="email"
            value={email}
            onChange={(e) => onFieldChange("email", e.target.value, setEmail)}
            onBlur={() => onFieldBlur("email")}
            disabled={loading}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            className={fieldClass}
          />
          {fieldErrors.email ? (
            <p id="contact-email-error" className="text-xs font-medium text-destructive dark:text-red-300">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-business" className={fieldLabelClass}>
          Business
          <RequiredMark />
        </label>
        <Input
          id="contact-business"
          name="business"
          maxLength={120}
          required
          placeholder="Your business name"
          autoComplete="organization"
          value={business}
          onChange={(e) => onFieldChange("business", e.target.value, setBusiness)}
          onBlur={() => onFieldBlur("business")}
          disabled={loading}
          aria-invalid={Boolean(fieldErrors.business)}
          aria-describedby={fieldErrors.business ? "contact-business-error" : undefined}
          className={fieldClass}
        />
        {fieldErrors.business ? (
          <p id="contact-business-error" className="text-xs font-medium text-destructive dark:text-red-300">
            {fieldErrors.business}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-details" className={fieldLabelClass}>
          {source === "call_request" ? "What would you like to discuss?" : "What do you need?"}
          <RequiredMark />
        </label>
        <textarea
          id="contact-details"
          name="details"
          maxLength={2000 - (selectionSummary ? selectionSummary.length + 2 : 0)}
          required
          className={textareaClass}
          placeholder={source === "call_request" ? "Tell us about your project and a few times you’re available (including your timezone)." : "New website, redesign, or ongoing support"}
          rows={3}
          value={details}
          onChange={(e) => onFieldChange("details", e.target.value, setDetails)}
          onBlur={() => onFieldBlur("details")}
          disabled={loading}
          aria-invalid={Boolean(fieldErrors.details)}
          aria-describedby={fieldErrors.details ? "contact-details-error" : undefined}
        />
        {fieldErrors.details ? (
          <p id="contact-details-error" className="text-xs font-medium text-destructive dark:text-red-300">
            {fieldErrors.details}
          </p>
        ) : null}
      </div>

      <div className="space-y-3 pt-2">
        <StrivnButton
          type="submit"
          variant="primary"
          arrow={!loading}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? "Sending…" : selectionSummary ? "Send package request" : source === "call_request" ? "Request a call" : "Send project details"}
        </StrivnButton>

        {error ? (
          <div id="contact-form-error" className="space-y-2 text-sm" role="alert">
            <p className="font-medium text-destructive dark:text-red-300">{error}</p>
            <a href={`mailto:${BRAND.email}`} className="text-foreground underline underline-offset-4">Email {BRAND.email}</a>
          </div>
        ) : null}

        <p className="text-xs leading-relaxed text-muted-foreground">
          We’ll use these details to respond to your inquiry. Read our{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">privacy policy</Link>.
        </p>
        {source === "contact_form" && (
          <p className="border-t border-border pt-4 text-sm text-muted-foreground">
            Prefer a conversation?{" "}
            <Link href="/book" className="font-medium text-foreground underline underline-offset-4">Book a call</Link>
          </p>
        )}
      </div>
    </form>
  );
}
