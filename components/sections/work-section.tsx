import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import {
  SoftCard,
  SoftCardContent,
  SoftCardHeader,
  SoftCardTitle,
} from "@/components/surfaces/soft-card";
import { WORK_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WorkSection() {
  return (
    <section id="work" className="section-y border-t border-border bg-muted/40">
      <Container className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[var(--text-h2)]">
            Recent work
          </h2>
          <Link
            href="/#contact"
            className="text-sm font-medium text-orange transition-hairline hover:text-orange/80"
          >
            Start your project
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {WORK_ITEMS.map((project) => {
            const featured = "featured" in project && project.featured;

            return (
              <SoftCard
                key={project.title}
                accent={featured}
                className="flex flex-col"
              >
                <SoftCardHeader className="space-y-4">
                  <div
                    className={cn(
                      "flex aspect-4/3 items-end rounded-2xl p-5",
                      featured ? "bg-void" : "bg-ink/[0.06]"
                    )}
                  >
                    <div>
                      <MonoLabel
                        className={cn(featured && "text-white/50")}
                      >
                        {project.category}
                      </MonoLabel>
                      <p
                        className={cn(
                          "mt-2 font-display text-2xl font-semibold tracking-tight",
                          featured ? "text-white" : "text-foreground"
                        )}
                      >
                        {project.title}
                      </p>
                    </div>
                  </div>
                  <SoftCardTitle className="sr-only">{project.title}</SoftCardTitle>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </SoftCardHeader>
                <SoftCardContent className="mt-auto pt-0">
                  <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                    {project.metric}
                  </p>
                </SoftCardContent>
              </SoftCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
