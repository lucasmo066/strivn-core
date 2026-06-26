import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import {
  HairlineCard,
  HairlineCardContent,
  HairlineCardDescription,
  HairlineCardHeader,
  HairlineCardTitle,
} from "@/components/surfaces/hairline-card";

const PLACEHOLDER_WORK = [
  {
    title: "Sahara Grill",
    category: "Restaurant · Denver",
    metric: "Lighthouse 98",
  },
  {
    title: "Summit First",
    category: "Financial · Boulder",
    metric: "LCP 0.9s",
  },
  {
    title: "Your business",
    category: "Next build",
    metric: "From $2,000",
  },
] as const;

export function WorkSection() {
  return (
    <section id="work" className="void scanlines section-y">
      <Container className="space-y-8">
        <div className="space-y-3">
          <MonoLabel>Selected work</MonoLabel>
          <h2 className="font-display text-[var(--text-h2)]">
            Found fast. Sold faster.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PLACEHOLDER_WORK.map((project) => (
            <HairlineCard
              key={project.title}
              brackets
              className="border-[var(--line-dark)] bg-void-2 hover:border-[var(--line-dark-strong)]"
            >
              <HairlineCardHeader>
                <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-md border border-[var(--line-dark)] bg-void font-pixel text-[10px] text-muted-foreground uppercase">
                  [ image slot ]
                </div>
                <MonoLabel>{project.category}</MonoLabel>
                <HairlineCardTitle className="font-display">
                  {project.title}
                </HairlineCardTitle>
                <HairlineCardDescription className="tabular-nums">
                  {project.metric}
                </HairlineCardDescription>
              </HairlineCardHeader>
              <HairlineCardContent />
            </HairlineCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
