import Link from "next/link";

import { Container } from "@/components/shared/container";
import { HERO_PROOF } from "@/lib/constants";
import { getHomepageIndustries } from "@/lib/industries";

export function SocialProofSection() {
  const homepageIndustries = getHomepageIndustries();

  return (
    <section className="border-y border-border py-8 md:py-10">
      <Container className="space-y-8">
        <div className="grid gap-5 sm:grid-cols-3 sm:gap-4 md:gap-8">
          {HERO_PROOF.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 border-b border-border pb-5 text-left last:border-b-0 last:pb-0 sm:border-b-0 sm:pb-0"
            >
              <p className="font-display text-[clamp(1rem,4.4vw,1.875rem)] tracking-wide tabular-nums whitespace-nowrap">
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
