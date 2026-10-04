"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";

interface BookingCalendarProps {
  url: string;
}

export function BookingCalendar({ url }: BookingCalendarProps) {
  const [booked, setBooked] = useState(false);
  const embed = new URL(url);
  embed.searchParams.set("hide_gdpr_banner", "0");
  embed.searchParams.set("hide_event_type_details", "1");
  embed.searchParams.set("primary_color", "ff5c00");
  embed.searchParams.set("utm_source", "strivnagency.com");
  embed.searchParams.set("utm_medium", "website");
  embed.searchParams.set("utm_campaign", "book_call");

  useEffect(() => {
    function handleCalendlyEvent(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      if (event.data?.event === "calendly.event_scheduled") setBooked(true);
    }
    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
            <Clock3 className="size-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Website strategy call</p>
            <p className="font-pixel text-micro text-muted-foreground">30 minutes · Google Meet</p>
          </div>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium hover:underline">
          Open separately <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </div>
      {booked && (
        <div className="flex items-start gap-3 border-b border-orange/20 bg-orange/5 px-5 py-4 text-sm sm:px-7" role="status">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange" aria-hidden />
          <div>
            <p className="font-medium">You’re booked.</p>
            <p className="mt-1 text-muted-foreground">Check your email for the calendar invitation and Google Meet link.</p>
          </div>
        </div>
      )}
      <iframe
        src={embed.toString()}
        title="Schedule a 30-minute website strategy call with Strivn"
        className="h-[46rem] w-full border-0 bg-white"
      />
      <p className="border-t border-border px-5 py-3 text-center text-xs leading-relaxed text-muted-foreground sm:px-7">
        Availability is shown in your timezone. Scheduling is securely handled by Calendly.
      </p>
    </div>
  );
}
