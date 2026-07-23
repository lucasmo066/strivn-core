import { Container } from "@/components/shared/container";
import {
  SoftCard,
  SoftCardDescription,
  SoftCardHeader,
  SoftCardTitle,
} from "@/components/surfaces/soft-card";
import { SERVICES } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="services" className="section-y">
      <Container className="space-y-8">
        <h2 className="max-w-xl font-display text-[var(--text-h2)]">
          Everything you need to launch and grow online.
        </h2>

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
