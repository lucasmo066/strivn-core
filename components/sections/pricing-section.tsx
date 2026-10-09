import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import dots from "@/components/shared/dotted-section.module.css";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { PRICING_COPY } from "@/lib/constants";

import { WebsiteValue } from "./pricing/website-value";
import { BuildPackages } from "./pricing/build-packages";
import styles from "./pricing/pricing.module.css";

export function PricingSection() {
  return (
    <section id="pricing" className={`section-y border-t border-border ${dots.section}`} aria-labelledby="pricing-heading">
      <Container>
        <div className={styles.shell}>
          <svg aria-hidden focusable="false" width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="strivn-orange-gradient" gradientUnits="userSpaceOnUse" x1="4" y1="17" x2="20" y2="6">
                <stop offset="0%" stopColor="var(--orange-gradient-from)" />
                <stop offset="50%" stopColor="var(--orange-gradient-via)" />
                <stop offset="100%" stopColor="var(--orange-gradient-to)" />
              </linearGradient>
            </defs>
          </svg>
          <BlurFade as="header" className={styles.intro} inViewAmount={0.7}>
            <h2 id="pricing-heading" className="font-display text-[var(--text-h2)]">
              Launch strong. Keep getting better.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {PRICING_COPY.intro} Monthly care keeps your site supported and moving forward.
            </p>
            <StrivnButton variant="outline" className="mt-6" asChild>
              <Link scroll={false} href="/pricing">How pricing works</Link>
            </StrivnButton>
          </BlurFade>
          <BuildPackages />
          <div className="grid border-t border-border sm:grid-cols-2">
            <Link scroll={false} href="/pricing#care" className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-orange sm:p-8">
              <div>
                <p className="font-display text-lg">A website partner who stays involved</p>
                <p className="mt-2 text-sm text-muted-foreground">Updates, performance checks, and a team that knows your business. Plans from $200/month.</p>
                <p className="mt-3 text-sm font-medium text-orange">Compare care plans</p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-orange" aria-hidden />
            </Link>
            <Link scroll={false} href="/pricing#add-ons" className="group flex items-center justify-between gap-4 border-t border-border p-6 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-orange sm:border-t-0 sm:border-l sm:p-8">
              <div>
                <p className="font-display text-lg">Make it yours</p>
                <p className="mt-2 text-sm text-muted-foreground">SEO, branding, booking, and more.</p>
                <p className="mt-3 text-sm font-medium text-orange">Explore add-ons & pricing</p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-orange" aria-hidden />
            </Link>
          </div>
          <WebsiteValue />
        </div>
      </Container>
    </section>
  );
}
