import { Container } from "@/components/shared/container";
import { ContactForm } from "@/components/sections/contact-form";
import { SoftCard, SoftCardContent } from "@/components/surfaces/soft-card";
import { BRAND, TAGLINES } from "@/lib/constants";

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

          <SoftCard accent lift={false} className="relative gap-0 py-0">
            <SoftCardContent className="space-y-5 px-6 py-6 md:px-8 md:py-8">
              <ContactForm />
            </SoftCardContent>
          </SoftCard>
        </div>
      </Container>
    </section>
  );
}
