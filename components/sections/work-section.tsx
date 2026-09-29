import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { BlurFade } from "@/components/ui/blur-fade";
import { WORK_ITEMS } from "@/lib/constants";

import { WorkCarousel } from "./work/work-carousel";

export function WorkSection() {
  return (
    <section id="work" className="section-y border-t border-border bg-muted/40">
      <Container className="space-y-6">
        <WorkCarousel projects={WORK_ITEMS}>
          <BlurFade inViewAmount={0.8}>
            <h2 id="work-heading" className="font-display text-[var(--text-h2)]">
              Recent work
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Live work and planned projects.
            </p>
          </BlurFade>
        </WorkCarousel>

        <BlurFade className="w-fit" direction="up" inViewAmount={0.9}>
          <Link
            href="/#contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-foreground underline decoration-orange underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            Start your project
            <ArrowUpRight className="size-4 text-orange" aria-hidden />
          </Link>
        </BlurFade>
      </Container>
    </section>
  );
}
