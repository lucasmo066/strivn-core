"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";

interface BookingCalendarProps {
  url: string;
}

export function BookingCalendar({ url }: BookingCalendarProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const embed = new URL(url);
  embed.searchParams.set("hide_gdpr_banner", "0");
  embed.searchParams.set("primary_color", "ff5c00");

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
        <span className="font-pixel text-micro text-muted-foreground">Choose a time</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium hover:underline">
          Open Calendly <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </div>
      {showCalendar ? (
        <iframe src={embed.toString()} title="Schedule a call with Strivn on Calendly" className="h-[46rem] w-full border-0 bg-white" />
      ) : (
        <div className="flex min-h-[30rem] flex-col items-center justify-center px-6 py-12 text-center">
          <CalendarDays className="size-9 text-orange" strokeWidth={1.25} aria-hidden />
          <h2 className="mt-6 font-display text-2xl">Let’s find a time.</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            See available times in your timezone and choose what works for you.
          </p>
          <button type="button" onClick={() => setShowCalendar(true)} className="mt-7 rounded-xl bg-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange">
            Show available times
          </button>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Opens Calendly here. Their privacy and cookie settings apply.
          </p>
        </div>
      )}
    </div>
  );
}
