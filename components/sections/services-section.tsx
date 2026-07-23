import { Container } from "@/components/shared/container";
import {
  SoftCard,
  SoftCardDescription,
  SoftCardHeader,
  SoftCardTitle,
} from "@/components/surfaces/soft-card";
import {
  SERVICES,
  SERVICES_AI_LINE,
  SERVICES_HEADLINE,
} from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="services" className="section-y">
      <Container className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-[var(--text-h2)]">
            {SERVICES_HEADLINE}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {SERVICES_AI_LINE}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map((service, index) => (
            <SoftCard key={service.title} accent={index === 0}>
              <SoftCardHeader>
                <SoftCardTitle className="font-display text-lg">
                  {service.title}
                </SoftCardTitle>
                <SoftCardDescription className="text-base">
                  {service.description}
                </SoftCardDescription>
              </SoftCardHeader>
            </SoftCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
