import Link from "next/link";
import { ArrowUpRight, Gauge, HeartHandshake, PenTool, ScanSearch } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { SectionLink } from "@/components/shared/section-link";
import { SERVICES, SERVICES_MEDIA } from "@/lib/constants";

import { FrontRangeMedia } from "./services/front-range-media";
import { ServicesReveal } from "./services/services-reveal";
import styles from "./services/services-bento.module.css";

const capabilityLinks = [
  { icon: PenTool, href: "/#work" },
  { icon: Gauge, href: "/process" },
  { icon: ScanSearch, href: "/industries" },
  { icon: HeartHandshake, href: "/pricing#care" },
] as const;

export function ServicesBento() {
  return (
    <ServicesReveal className={styles.bento}>
      <BlurFade
        as="figure"
        className={styles.feature}
        direction="left"
        delay={0.06}
        duration={1.05}
        inViewAmount={0.4}
      >
        <FrontRangeMedia {...SERVICES_MEDIA} />
        <figcaption className={styles.caption}>
          <h3 className="text-orange-gradient font-display text-xl leading-tight sm:text-2xl">
            Local roots.<br />A clear next step.
          </h3>
          <Link href="/book" className={styles.contactLink}>
            Book a call <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </figcaption>
      </BlurFade>

      <ul className={styles.capabilities} aria-label="Website services">
        {SERVICES.map((service, index) => {
          const { icon: Icon, href } = capabilityLinks[index];

          return (
            <BlurFade
              key={service.title}
              as="li"
              className={styles.capability}
              direction="left"
              delay={0.14 + index * 0.1}
              duration={1}
              inViewAmount={0.7}
            >
              <SectionLink href={href} className={styles.capabilityLink}>
                <StripedPattern className={styles.stripes} />
                <Icon className={styles.icon} strokeWidth={1.5} aria-hidden />
                <div className={styles.copy}>
                  <h3 className="text-orange-gradient font-display text-lg leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <ArrowUpRight className={styles.arrow} aria-hidden />
              </SectionLink>
            </BlurFade>
          );
        })}
      </ul>
    </ServicesReveal>
  );
}
