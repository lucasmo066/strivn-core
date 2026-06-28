import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { StatusChip } from "@/components/hud/status-chip";
import { SegmentedProgress } from "@/components/hud/segmented-progress";
import { BRAND, TAGLINES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="section-y border-b border-border">
      <Container className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <StatusChip status="active">[ ACTIVE ]</StatusChip>
            <MonoLabel>{BRAND.location}</MonoLabel>
          </div>

          <h1 className="font-display max-w-3xl text-[var(--text-display)] leading-[var(--leading-display)] font-semibold tracking-tight bg-[linear-gradient(to_right,#ffb347,var(--orange),#ff3d00,var(--orange))] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
            Built to be found. Built to be chosen.
          </h1>

          <p className="max-w-xl font-ui text-muted-foreground">
            We build fast, custom websites for small businesses in Denver and
            Boulder. Design, development, and ongoing support — engineered for
            performance, not templates.
          </p>

          <div className="flex flex-wrap gap-3">
            <StrivnButton variant="primary" arrow>
              Get found. Get chosen.
            </StrivnButton>
            <StrivnButton variant="outline">View work</StrivnButton>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-card p-5 font-ui">
          <MonoLabel>Performance</MonoLabel>
          <div className="grid grid-cols-2 gap-4 tabular-nums">
            <div>
              <p className="text-micro text-muted-foreground">Lighthouse</p>
              <p className="text-2xl font-semibold">99</p>
            </div>
            <div>
              <p className="text-micro text-muted-foreground">LCP</p>
              <p className="text-2xl font-semibold">0.8s</p>
            </div>
          </div>
          <SegmentedProgress total={8} value={7} />
          <p className="text-sm text-muted-foreground">{TAGLINES.speed}</p>
        </div>
      </Container>
    </section>
  );
}
