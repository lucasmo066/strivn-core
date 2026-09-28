import Link from "next/link";
import { ArrowUpRight, Gauge, HeartHandshake, PenTool, ScanSearch } from "lucide-react";

import { SERVICES, SERVICES_MEDIA } from "@/lib/constants";

import { FrontRangeMedia } from "./services/front-range-media";
import { ServicesReveal } from "./services/services-reveal";
import styles from "./services/services-bento.module.css";

const capabilityLinks = [
  { icon: PenTool, href: "/#work" },
  { icon: Gauge, href: "/#pricing" },
  { icon: ScanSearch, href: "/industries" },
  { icon: HeartHandshake, href: "/#pricing" },
] as const;

export function ServicesBento() {
  return (
    <ServicesReveal className={styles.bento}>
      <figure className={styles.feature}>
        <FrontRangeMedia {...SERVICES_MEDIA} />
        <figcaption className={styles.caption}>
          <h3 className="font-display text-xl leading-tight sm:text-2xl">
            Local roots.<br />A clear next step.
          </h3>
          <Link href="/#contact" className={styles.contactLink}>
            Book a call <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </figcaption>
      </figure>

      <ul className={styles.capabilities} aria-label="Website services">
        {SERVICES.map((service, index) => {
          const { icon: Icon, href } = capabilityLinks[index];

          return (
            <li key={service.title} className={styles.capability}>
              <Link href={href} className={styles.capabilityLink}>
                <Icon className={styles.icon} strokeWidth={1.5} aria-hidden />
                <div className={styles.copy}>
                  <h3 className="font-display text-lg leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <ArrowUpRight className={styles.arrow} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </ServicesReveal>
  );
}
