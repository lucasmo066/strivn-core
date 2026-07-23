"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { StrivnButton } from "@/components/shared/strivn-button";
import { Input } from "@/components/ui/input";
import type { ContactFieldErrors, ContactResponse } from "@/lib/contact";
import { TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const fieldLabelClass = "text-sm font-medium text-foreground";

const textareaClass = cn(
  "min-h-28 w-full resize-y rounded-xl border border-input bg-paper/60 px-3 py-2.5 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm"
);

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  const loading = status === "loading";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);
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
      <div className="space-y-3 py-6 text-center">
        <p className="font-display text-xl text-foreground">Thanks — we got it.</p>
        <p className="text-sm text-muted-foreground">
          We&apos;ll reply within one business day with next steps.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className={fieldLabelClass}>
            Name
          </label>
          <Input
            id="contact-name"
            name="name"
            placeholder="Alex Rivera"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            aria-invalid={Boolean(fieldErrors.name)}
            className="h-11 rounded-xl bg-paper/60"
          />
          {fieldErrors.name ? (
            <p className="text-xs text-destructive">{fieldErrors.name}</p>
          ) : null}
        </div>
        <div className="space-y-1.5">
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
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            aria-invalid={Boolean(fieldErrors.email)}
            className="h-11 rounded-xl bg-paper/60"
          />
          {fieldErrors.email ? (
            <p className="text-xs text-destructive">{fieldErrors.email}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-business" className={fieldLabelClass}>
          Business
        </label>
        <Input
          id="contact-business"
          name="business"
          placeholder="Your business name"
          autoComplete="organization"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          disabled={loading}
          aria-invalid={Boolean(fieldErrors.business)}
          className="h-11 rounded-xl bg-paper/60"
        />
        {fieldErrors.business ? (
          <p className="text-xs text-destructive">{fieldErrors.business}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
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
          onChange={(e) => setDetails(e.target.value)}
          disabled={loading}
          aria-invalid={Boolean(fieldErrors.details)}
        />
        {fieldErrors.details ? (
          <p className="text-xs text-destructive">{fieldErrors.details}</p>
        ) : null}
      </div>

      <StrivnButton
        type="submit"
        variant="primary"
        arrow={!loading}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Sending…" : TAGLINES.heroCta}
      </StrivnButton>

      {error ? (
        <p className="text-center text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <p className="text-center text-xs text-muted-foreground">
        Prefer a calendar link?{" "}
        <Link
          href="#contact"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Ask in your message
        </Link>
        .
      </p>
    </form>
  );
}
