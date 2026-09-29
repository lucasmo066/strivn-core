import { Container } from "@/components/shared/container";
import dots from "@/components/shared/dotted-section.module.css";
import { ServicesBento } from "@/components/sections/services-bento";
import { BlurFade } from "@/components/ui/blur-fade";
import { SERVICES_HEADLINE } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className={`section-y ${dots.section}`}>
      <Container className="space-y-8">
        <BlurFade className="max-w-2xl space-y-3" direction="left" inViewAmount={0.7}>
          <h2 id="services-heading" className="font-display text-[var(--text-h2)]">
            {SERVICES_HEADLINE}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Custom websites for Front Range practices, from a credible first
            impression to the next call.
          </p>
        </BlurFade>
        <ServicesBento />
      </Container>
    </section>
  );
}
