import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { Input } from "@/components/ui/input";
import { TAGLINES } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="section-y">
      <Container>
        <div className="mx-auto max-w-xl space-y-6 rounded-lg border border-border bg-card p-6">
          <div className="space-y-2">
            <MonoLabel>Command menu</MonoLabel>
            <h2 className="font-display text-[var(--text-h2)]">
              {TAGLINES.cta}
            </h2>
            <p className="font-ui text-sm text-muted-foreground">
              Tell us about your business. We respond within one business day.
            </p>
          </div>

          <form className="space-y-3">
            <Input placeholder="Name" aria-label="Name" />
            <Input type="email" placeholder="Email" aria-label="Email" />
            <Input placeholder="Business type" aria-label="Business type" />
            <StrivnButton variant="primary" arrow className="w-full">
              Send message
            </StrivnButton>
          </form>
        </div>
      </Container>
    </section>
  );
}
