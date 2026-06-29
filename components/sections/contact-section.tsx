import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { Input } from "@/components/ui/input";
import { BRAND, TAGLINES } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="section-y border-t border-border bg-muted/20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div className="space-y-5">
            <MonoLabel>Contact</MonoLabel>
            <h2 className="font-display text-[var(--text-h2)]">{TAGLINES.cta}</h2>
            <p className="max-w-md font-ui text-muted-foreground">
              Tell us about your business and what you need from your website.
              We respond within one business day with next steps — no pressure,
              no generic pitch deck.
            </p>
            <div className="space-y-1 font-ui text-sm text-muted-foreground">
              <p>{BRAND.name}</p>
              <p>{BRAND.location}</p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Name" aria-label="Name" />
                <Input type="email" placeholder="Email" aria-label="Email" />
              </div>
              <Input placeholder="Business name" aria-label="Business name" />
              <Input
                placeholder="What do you need help with?"
                aria-label="Project details"
              />
              <StrivnButton variant="primary" arrow className="w-full">
                Send message
              </StrivnButton>
              <p className="text-center font-ui text-xs text-muted-foreground">
                Prefer to talk live? We&apos;ll include a scheduling link in
                our reply.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
