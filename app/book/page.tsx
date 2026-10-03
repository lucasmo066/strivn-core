import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MessageSquare, Video } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { BookingCalendar } from "@/components/shared/booking-calendar";
import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { calendlyUrl } from "@/lib/booking";
import { BRAND } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Book a call — Strivn",
  description: "Talk through your website, your goals, and the next step with Strivn.",
};

export default function BookingPage() {
  const url = calendlyUrl(process.env.CALENDLY_URL);
  return (
    <main className="pt-28 sm:pt-36">
      <Container className="pb-20 sm:pb-28">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden /> Back to Strivn
        </Link>
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <MonoLabel className="text-orange">A conversation, a clear next step.</MonoLabel>
            <h1 className="mt-5 font-display text-[var(--text-display)] leading-tight">Let’s talk<br />about your site.</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Bring an idea, an existing website, or a problem you want to solve.
              We’ll talk through what your business needs and where to start.
            </p>
            <div className="mt-10 space-y-6 border-y border-border py-7">
              <div className="flex gap-4">
                <MessageSquare className="mt-0.5 size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
                <div><p className="text-sm font-medium">Your goals come first</p><p className="mt-1 text-sm text-muted-foreground">What’s working, what isn’t, and what success looks like.</p></div>
              </div>
              <div className="flex gap-4">
                <Video className="mt-0.5 size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
                <div><p className="text-sm font-medium">A practical conversation</p><p className="mt-1 text-sm text-muted-foreground">Scope, timing, and a budget that makes sense.</p></div>
              </div>
            </div>
            <p className="mt-7 text-sm text-muted-foreground">Prefer to write it out?</p>
            <Link href="/#contact" className="mt-2 inline-flex items-center gap-1 text-sm font-medium hover:underline">Send project details <ArrowUpRight className="size-4" aria-hidden /></Link>
            <a href={`mailto:${BRAND.email}`} className="mt-3 block text-sm text-muted-foreground hover:text-foreground">{BRAND.email}</a>
          </div>
          <div>
            {url ? <BookingCalendar url={url} /> : (
              <div className="space-y-5">
                <div className="space-y-2">
                  <h2 className="font-display text-xl">Request a call</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">Online scheduling isn’t available yet. Share your details and a few times that work; we’ll reply within one business day to arrange a call.</p>
                </div>
                <ContactForm source="call_request" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
