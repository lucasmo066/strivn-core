import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { CLIENT_VERTICALS, TRUST_STATS } from "@/lib/constants";

export function SocialProofSection() {
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

        <div className="flex flex-col items-center gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <MonoLabel>Who we build for</MonoLabel>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            {CLIENT_VERTICALS.map((vertical) => (
              <span
                key={vertical}
                className="rounded-full border border-border bg-card px-3 py-1 font-ui text-sm text-muted-foreground"
              >
                {vertical}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
