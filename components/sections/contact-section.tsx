import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/shared/container";
import { HeadlinePeriod } from "@/components/shared/headline-period";
import { BRAND, TAGLINES } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="section-y border-t border-border">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          <div className="space-y-5">
            <HeadlinePeriod
              as="h2"
              className="text-[var(--text-h2)] leading-[var(--leading-tight)]"
            >
              {TAGLINES.cta}
            </HeadlinePeriod>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Share a few details and we&apos;ll reply within one business day
              with next steps.
            </p>
            <p className="font-pixel text-micro text-muted-foreground">
              {BRAND.name}
              <span className="text-orange"> / </span>
              {BRAND.location}
            </p>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
