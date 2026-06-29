import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { TRUST_STATS } from "@/lib/constants";
import { getHomepageIndustries } from "@/lib/industries";

export function SocialProofSection() {
  const homepageIndustries = getHomepageIndustries();

  return (
    <section className="border-b border-border bg-muted/30 py-10">
      <Container className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-3xl font-bold tabular-nums tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 font-ui text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2 text-center sm:text-left">
            <MonoLabel>Who we build for</MonoLabel>
            <p className="max-w-sm font-ui text-sm text-muted-foreground">
              Denver & Boulder businesses where your website is the sales pitch.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              {homepageIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries#${industry.slug}`}
                  className="rounded-full border border-border bg-card px-3 py-1 font-ui text-sm text-muted-foreground transition-hairline hover:border-foreground/30 hover:text-foreground"
                >
                  {industry.shortName ?? industry.name}
                </Link>
              ))}
            </div>
            <Link
              href="/industries"
              className="font-ui text-sm text-muted-foreground transition-hairline hover:text-foreground"
            >
              View all industries →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
