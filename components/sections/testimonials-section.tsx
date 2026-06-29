import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import {
  HairlineCard,
  HairlineCardContent,
  HairlineCardHeader,
} from "@/components/surfaces/hairline-card";
import { TESTIMONIALS } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <section className="section-y border-b border-border bg-muted/30">
      <Container className="space-y-10">
        <div className="mx-auto max-w-2xl space-y-3 text-center md:mx-0 md:text-left">
          <MonoLabel>Client feedback</MonoLabel>
          <h2 className="font-display text-[var(--text-h2)]">
            Trusted by local businesses
          </h2>
          <p className="font-ui text-muted-foreground">
            What Front Range owners say about working with Strivn.
          </p>
        </div>

        <div
          className={cn(
            "grid gap-4",
            TESTIMONIALS.length > 1 ? "md:grid-cols-2" : "md:max-w-2xl"
          )}
        >
          {TESTIMONIALS.map((testimonial) => (
            <HairlineCard
              key={`${testimonial.company}-${testimonial.author}`}
              brackets
              accentBrackets={testimonial.featured}
              className="flex flex-col"
            >
              <HairlineCardHeader className="flex-1">
                <blockquote className="font-ui text-base leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </HairlineCardHeader>
              <HairlineCardContent>
                <footer className="font-ui text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {testimonial.author}
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      · {testimonial.role}
                    </span>
                  </p>
                  <p className="mt-1">
                    {testimonial.company} · {testimonial.location}
                  </p>
                </footer>
              </HairlineCardContent>
            </HairlineCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
