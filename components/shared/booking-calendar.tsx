"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";

interface BookingCalendarProps {
  url: string;
}

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (options: { url: string; parentElement: HTMLElement; resize: boolean }) => void };
  }
}

export function BookingCalendar({ url }: BookingCalendarProps) {
  const [booked, setBooked] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [slowLoading, setSlowLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const embed = new URL(url);
  embed.searchParams.set("hide_gdpr_banner", "0");
  embed.searchParams.set("hide_event_type_details", "1");
  embed.searchParams.set("primary_color", "ff5c00");
  embed.searchParams.set("utm_source", "strivnagency.com");
  embed.searchParams.set("utm_medium", "website");
  embed.searchParams.set("utm_campaign", "book_call");
  const embedUrl = embed.toString();

  useEffect(() => {
    if (calendarLoaded) return;
    const timer = window.setTimeout(() => setSlowLoading(true), 12_000);
    return () => window.clearTimeout(timer);
  }, [calendarLoaded]);

  useEffect(() => {
    const container = containerRef.current;
    if (!ready || !container || !window.Calendly) return;
    window.Calendly.initInlineWidget({ url: embedUrl, parentElement: container, resize: true });
    const iframe = container.querySelector("iframe");
    if (iframe) iframe.title = "Schedule a 30-minute website strategy call with Strivn";
    return () => container.replaceChildren();
  }, [ready, embedUrl]);

  useEffect(() => {
    function handleCalendlyEvent(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      if (event.source !== containerRef.current?.querySelector("iframe")?.contentWindow) return;
      if (event.data?.event === "calendly.page_height" && Number.parseFloat(String(event.data.payload?.height)) >= 200) {
        setCalendarLoaded(true);
      }
      if (event.data?.event === "calendly.event_scheduled") setBooked(true);
    }
    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" onReady={() => setReady(true)} onError={() => setFailed(true)} />
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
      {slowLoading && !calendarLoaded && !failed && (
        <p role="status" className="border-b border-border px-5 py-4 text-sm leading-relaxed sm:px-7">
          The calendar is taking a little longer to load. <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Open scheduling directly</a> to choose a time.
        </p>
      )}
      {failed ? (
        <p role="status" className="p-6 text-sm leading-relaxed">The calendar couldn’t load here. <a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Open Calendly to choose a time.</a></p>
      ) : <div ref={containerRef} data-testid="booking-embed" data-loaded={calendarLoaded} aria-busy={!calendarLoaded} className="h-[700px] w-full bg-white data-[loaded=false]:min-h-[700px] [&_iframe]:block [&_iframe]:w-full [&_iframe]:border-0" />}
      <p className="border-t border-border px-5 py-3 text-center text-xs leading-relaxed text-muted-foreground sm:px-7">
        Availability is shown in your timezone. Scheduling is securely handled by Calendly.
      </p>
    </div>
  );
}
