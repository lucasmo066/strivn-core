import Link from "next/link";

import { Container } from "@/components/shared/container";
import { HERO_PROOF } from "@/lib/constants";
import { getHomepageIndustries } from "@/lib/industries";

export function SocialProofSection() {
  const homepageIndustries = getHomepageIndustries();

  return (
    <section className="border-y border-border py-8 md:py-10">
      <Container className="space-y-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          {HERO_PROOF.map((stat) => (
            <div key={stat.label} className="min-w-0 text-center md:text-left">
              <p className="font-display text-xl tracking-wide tabular-nums sm:text-2xl md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Built for local businesses that need to get found
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {homepageIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries#${industry.slug}`}
                className="text-muted-foreground transition-hairline hover:text-foreground"
              >
                {industry.shortName ?? industry.name}
              </Link>
            ))}
            <Link
              href="/industries"
              className="font-medium text-orange transition-hairline hover:text-orange/80"
            >
              All industries
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
