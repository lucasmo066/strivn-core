"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";

import { StrivnButton } from "@/components/shared/strivn-button";

interface ContactSuccessProps {
  source: "contact_form" | "call_request";
}

export function ContactSuccess({ source }: ContactSuccessProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div ref={ref} className="flex h-full min-h-80 flex-col justify-center rounded-[var(--radius-button)] border border-orange/30 bg-orange/5 p-6 outline-none sm:p-8" role="status" tabIndex={-1}>
      <CheckCircle2 className="size-8 text-orange" strokeWidth={1.5} aria-hidden />
      <h2 className="mt-5 font-display text-2xl tracking-wide text-foreground">
        {source === "call_request" ? "Your call request is in." : "Thanks, we got it."}
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {source === "call_request"
          ? "We’ll email you within one business day to find a time. Your call is confirmed once we’ve agreed on a time."
          : "Your project details are saved. We’ll reply within one business day with next steps."}
      </p>
      {source === "contact_form" && (
        <div className="mt-8 border-t border-orange/20 pt-6">
          <p className="mb-4 text-sm text-muted-foreground">Want to talk it through?</p>
          <StrivnButton variant="outline" arrow asChild><Link href="/book">Book a call</Link></StrivnButton>
        </div>
      )}
    </div>
  );
}
