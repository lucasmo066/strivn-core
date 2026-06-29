import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import {
  HairlineCard,
  HairlineCardContent,
  HairlineCardDescription,
  HairlineCardHeader,
  HairlineCardTitle,
} from "@/components/surfaces/hairline-card";
import { WORK_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WorkSection() {
  return (
    <section id="work" className="void scanlines section-y">
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-3">
            <MonoLabel>Selected work</MonoLabel>
            <h2 className="font-display text-[var(--text-h2)]">
              Real businesses, real results
            </h2>
            <p className="font-ui text-muted-foreground">
              A sample of what we&apos;re building for Denver and Boulder
              clients — fast sites with clear messaging and room to grow.
            </p>
          </div>
          <StrivnButton variant="outline" className="shrink-0 border-[var(--line-dark)] bg-transparent text-foreground hover:border-[var(--line-dark-strong)]">
            View all work
          </StrivnButton>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {WORK_ITEMS.map((project) => (
            <HairlineCard
              key={project.title}
              brackets
              accentBrackets={"featured" in project && project.featured}
              className={cn(
                "group border-[var(--line-dark)] bg-void-2 hover:border-[var(--line-dark-strong)]",
                "featured" in project &&
                  project.featured &&
                  "lg:col-span-1"
              )}
            >
              <HairlineCardHeader>
                <div
                  className={cn(
                    "mb-4 flex items-end overflow-hidden rounded-md border border-[var(--line-dark)] bg-[linear-gradient(135deg,#141414_0%,#1f1208_55%,#2a1508_100%)] p-5",
                    "featured" in project && project.featured
                      ? "aspect-[16/10]"
                      : "aspect-[4/3]"
                  )}
                >
                  <div>
                    <MonoLabel>
                      {project.category} · {project.location}
                    </MonoLabel>
                    <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
                      {project.title}
                    </p>
                  </div>
                </div>
                <HairlineCardTitle className="font-display text-lg">
                  {project.title}
                </HairlineCardTitle>
                <HairlineCardDescription>
                  {project.description}
                </HairlineCardDescription>
              </HairlineCardHeader>
              <HairlineCardContent className="flex items-center justify-between gap-4">
                <p className="font-ui text-sm tabular-nums text-muted-foreground">
                  {project.metric}
                </p>
                {"featured" in project && project.featured ? (
                  <Link
                    href="#contact"
                    className="font-ui text-sm text-orange transition-hairline hover:text-orange/80"
                  >
                    Case study soon →
                  </Link>
                ) : null}
              </HairlineCardContent>
            </HairlineCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
