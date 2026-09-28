import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import dots from "@/components/shared/dotted-section.module.css";
import { HERO_PROOF } from "@/lib/constants";
import { getHomepageIndustries } from "@/lib/industries";

export function SocialProofSection() {
  const homepageIndustries = getHomepageIndustries();

  return (
    <section className={`border-y border-border bg-background py-12 md:py-16 ${dots.section}`}>
      <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14">
        <div className="min-w-0 space-y-6">
          <div className="space-y-3">
            <p className="font-mono text-[10px] font-semibold tracking-[0.12em] text-orange uppercase">
              Built for local demand
            </p>
            <h2 className="max-w-[15ch] font-display text-[clamp(1.45rem,2.9vw,2.25rem)] leading-tight tracking-wide text-foreground">
              Clear enough to earn the next call.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Local businesses need a fast answer, a credible first impression,
              and a direct route to getting in touch.
            </p>
          </div>

          <dl className="grid auto-rows-fr gap-3 min-[440px]:grid-cols-3">
            {HERO_PROOF.map((stat) => (
              <div
                key={stat.label}
                className="grid min-h-16 min-w-0 grid-cols-[1fr_auto] items-center gap-3 rounded-[var(--radius-md)] border border-border bg-background px-3 py-4 min-[440px]:grid-cols-1 min-[440px]:grid-rows-[2rem_auto] min-[440px]:gap-2 min-[440px]:text-center"
              >
                <dt className="text-xs leading-4 text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="font-display text-base tracking-wide tabular-nums text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Industries we serve" className="min-w-0 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold tracking-[0.12em] text-orange uppercase">
                Find your industry
              </p>
              <h3 className="mt-2 font-display text-xl tracking-wide text-foreground">
                A focused local approach
              </h3>
            </div>
            <Link
              href="/industries"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-orange transition-hairline hover:bg-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40"
            >
              View all
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="grid auto-rows-fr gap-2 sm:grid-cols-2">
            {homepageIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries#${industry.slug}`}
                className="group flex min-h-14 items-center justify-between gap-3 rounded-[var(--radius-md)] border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-hairline hover:border-orange/50 hover:bg-[color-mix(in_srgb,var(--orange)_5%,var(--background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40"
              >
                <span>{industry.shortName ?? industry.name}</span>
                <ArrowUpRight className="size-4 shrink-0 text-orange transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            ))}
          </div>
        </nav>
      </Container>
    </section>
  );
}
