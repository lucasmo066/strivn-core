import Link from "next/link";

import { Container } from "@/components/shared/container";
import { StrivnButton } from "@/components/shared/strivn-button";
import { SoftCard, SoftCardContent } from "@/components/surfaces/soft-card";
import { Input } from "@/components/ui/input";
import { BRAND, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const fieldLabelClass = "text-sm font-medium text-foreground";

const textareaClass = cn(
  "min-h-28 w-full resize-y rounded-xl border border-input bg-paper/60 px-3 py-2.5 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
);

export function ContactSection() {
  return (
    <section id="contact" className="section-y border-t border-border bg-muted/40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="space-y-4">
            <h2 className="font-display text-[var(--text-h2)]">{TAGLINES.cta}</h2>
            <p className="max-w-md text-muted-foreground">
              Share a few details and we&apos;ll reply within one business day
              with next steps.
            </p>
            <p className="text-sm text-muted-foreground">
              {BRAND.name} / {BRAND.location}
            </p>
          </div>

          <SoftCard accent lift={false} className="gap-0 py-0">
            <SoftCardContent className="space-y-5 px-6 py-6 md:px-8 md:py-8">
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className={fieldLabelClass}>
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      placeholder="Alex Rivera"
                      autoComplete="name"
                      className="h-11 rounded-xl bg-paper/60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className={fieldLabelClass}>
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="alex@yourbusiness.com"
                      autoComplete="email"
                      className="h-11 rounded-xl bg-paper/60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-business" className={fieldLabelClass}>
                    Business
                  </label>
                  <Input
                    id="contact-business"
                    placeholder="Your business name"
                    autoComplete="organization"
                    className="h-11 rounded-xl bg-paper/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-details" className={fieldLabelClass}>
                    What do you need?
                  </label>
                  <textarea
                    id="contact-details"
                    className={textareaClass}
                    placeholder="New website, redesign, or ongoing support"
                    rows={3}
                  />
                </div>

                <StrivnButton variant="primary" arrow className="w-full">
                  {TAGLINES.heroCta}
                </StrivnButton>
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
            </SoftCardContent>
          </SoftCard>
        </div>
      </Container>
    </section>
  );
}
