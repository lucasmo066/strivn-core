import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { BlurFade } from "@/components/ui/blur-fade";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { HERO_PROOF } from "@/lib/constants";
import { getHomepageIndustries } from "@/lib/industries";

export function SocialProofSection() {
  const homepageIndustries = getHomepageIndustries();

  return (
    <section className="border-b border-border bg-muted/40 py-12 md:py-16">
      <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14">
        <div className="min-w-0 space-y-6">
          <BlurFade className="space-y-3" inViewAmount={0.8}>
            <p className="font-mono text-[10px] font-semibold tracking-[0.12em] text-orange uppercase">
              Built for local demand
            </p>
            <h2 className="max-w-none font-display text-[clamp(1.25rem,5.9vw,1.45rem)] leading-tight tracking-wide text-foreground sm:text-[clamp(1.45rem,2.9vw,2.25rem)] lg:max-w-[15ch]">
              Clear enough to earn<span className="block lg:inline"> the next call.</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Local businesses need a fast answer, a credible first impression,
              and a direct route to getting in touch.
            </p>
          </BlurFade>

          <dl className="grid auto-rows-fr gap-3 min-[440px]:grid-cols-3">
            {HERO_PROOF.map((stat, index) => (
              <BlurFade
                key={stat.label}
                className="h-full min-w-0"
                direction="right"
                delay={index * 0.12}
                duration={0.98}
                inViewAmount={0.9}
              >
                <div className="relative isolate grid h-full min-h-16 min-w-0 grid-cols-[1fr_auto] items-center gap-3 overflow-hidden rounded-[var(--radius-button)] border border-border bg-background px-3 py-4 min-[440px]:grid-cols-1 min-[440px]:grid-rows-[2rem_auto] min-[440px]:gap-2 min-[440px]:text-center">
                  <StripedPattern className="reveal-stripes opacity-0" />
                  <dt className="text-xs leading-4 text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-base tracking-wide tabular-nums text-foreground">
                    {stat.value}
                  </dd>
                </div>
              </BlurFade>
            ))}
          </dl>
        </div>

        <nav aria-label="Industries we serve" className="min-w-0 space-y-4">
          <BlurFade inViewAmount={0.8}>
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
                scroll={false}
                href="/industries"
                className="inline-flex shrink-0 items-center gap-1 rounded-[var(--radius-button)] px-2 py-1 text-sm font-medium text-orange transition-hairline hover:bg-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40"
              >
                View all
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </BlurFade>

          <div className="grid auto-rows-fr gap-2 sm:grid-cols-2">
            {homepageIndustries.map((industry, index) => (
              <BlurFade
                key={industry.slug}
                className="h-full min-w-0"
                direction="up"
                delay={index * 0.06}
                duration={0.9}
                offset={10}
                inViewAmount={0.9}
              >
                <Link
                  scroll={false}
                  href={`/industries#${industry.slug}`}
                  className="group relative isolate flex h-full min-h-14 items-center justify-between gap-3 overflow-hidden rounded-[var(--radius-button)] border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-hairline hover:border-orange/50 hover:bg-[color-mix(in_srgb,var(--orange)_5%,var(--background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40"
                >
                  <StripedPattern className="reveal-stripes opacity-0 transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" />
                  <span className="relative">{industry.shortName ?? industry.name}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-orange transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </BlurFade>
            ))}
          </div>
        </nav>
      </Container>
    </section>
  );
}
