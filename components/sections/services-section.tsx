import { Container } from "@/components/shared/container";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { SERVICES_HEADLINE } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="services" className="section-y">
      <Container className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-[var(--text-h2)]">
            {SERVICES_HEADLINE}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Every section has a job: help the right person find you, trust you,
            and take the next step.
          </p>
        </div>
        <ServicesShowcase />
      </Container>
    </section>
  );
}
