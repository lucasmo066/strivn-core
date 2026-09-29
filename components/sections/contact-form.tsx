"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { StrivnButton } from "@/components/shared/strivn-button";
import { Input } from "@/components/ui/input";
import type { ContactFieldErrors, ContactResponse } from "@/lib/contact";
import { TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const fields = ["name", "email", "business", "details"] as const;

type ContactField = (typeof fields)[number];

const fieldLabelClass =
  "text-xs font-semibold tracking-[0.08em] text-foreground uppercase";

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

export function ContactForm() {
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
    setError(null);
    setTouched({ name: true, email: true, business: true, details: true });

    const clientErrors = fields.reduce<ContactFieldErrors>((errors, field) => {
      const message = validationMessage(field, values[field]);
      if (message) errors[field] = message;
      return errors;
    }, {});

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

    setStatus("loading");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, business, details, website }),
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
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[var(--radius-button)] border border-orange/30 bg-orange/5 p-6 sm:p-8"
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <CheckCircle2 className="size-6 text-orange" aria-hidden />
        <p className="mt-4 font-display text-xl tracking-wide text-foreground">
          Thanks, we got it.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We&apos;ll reply within one business day with next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      className="relative space-y-6 rounded-[var(--radius-button)] border border-border bg-background p-5 shadow-soft sm:p-7 dark:bg-card"
      onSubmit={onSubmit}
      noValidate
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
          </label>
          <Input
            id="contact-name"
            name="name"
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
            <p id="contact-name-error" className="text-xs font-medium text-destructive">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className={fieldLabelClass}>
            Email
          </label>
          <Input
            id="contact-email"
            name="email"
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
            <p id="contact-email-error" className="text-xs font-medium text-destructive">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-business" className={fieldLabelClass}>
          Business
        </label>
        <Input
          id="contact-business"
          name="business"
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
          <p id="contact-business-error" className="text-xs font-medium text-destructive">
            {fieldErrors.business}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-details" className={fieldLabelClass}>
          What do you need?
        </label>
        <textarea
          id="contact-details"
          name="details"
          className={textareaClass}
          placeholder="New website, redesign, or ongoing support"
          rows={3}
          value={details}
          onChange={(e) => onFieldChange("details", e.target.value, setDetails)}
          onBlur={() => onFieldBlur("details")}
          disabled={loading}
          aria-invalid={Boolean(fieldErrors.details)}
          aria-describedby={fieldErrors.details ? "contact-details-error" : undefined}
        />
        {fieldErrors.details ? (
          <p id="contact-details-error" className="text-xs font-medium text-destructive">
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
          {loading ? "Sending…" : TAGLINES.heroCta}
        </StrivnButton>

        {error ? (
          <p id="contact-form-error" className="text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <p className="text-xs text-muted-foreground">
          Prefer a calendar link?{" "}
          <Link
            href="#contact"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Ask in your message
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
