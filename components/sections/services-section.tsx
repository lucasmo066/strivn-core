import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import {
  HairlineCard,
  HairlineCardContent,
  HairlineCardDescription,
  HairlineCardHeader,
  HairlineCardTitle,
} from "@/components/surfaces/hairline-card";
import { SERVICES } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="services" className="section-y border-b border-border">
      <Container className="space-y-10">
        <div className="mx-auto max-w-2xl space-y-3 text-center md:mx-0 md:text-left">
          <MonoLabel>What we do</MonoLabel>
          <h2 className="font-display text-[var(--text-h2)]">
            Design, build, and support — end to end
          </h2>
          <p className="font-ui text-muted-foreground">
            Everything you need to launch a site that looks professional, loads
            fast, and gives customers a clear path to reach you.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((service) => (
            <HairlineCard key={service.title} brackets>
              <HairlineCardHeader>
                <HairlineCardTitle className="font-display">
                  {service.title}
                </HairlineCardTitle>
                <HairlineCardDescription>
                  {service.description}
                </HairlineCardDescription>
              </HairlineCardHeader>
              <HairlineCardContent>
                <ul className="space-y-2 font-ui text-sm text-muted-foreground">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-orange">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </HairlineCardContent>
            </HairlineCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
