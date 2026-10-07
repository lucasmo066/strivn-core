import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/shared/container";
import dots from "@/components/shared/dotted-section.module.css";
import { BlurFade } from "@/components/ui/blur-fade";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { ScrollGlass } from "@/components/shared/scroll-glass";
import { BRAND, TAGLINES } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className={`section-y border-t border-border ${dots.section}`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-16 xl:gap-20">
          <BlurFade className="flex h-full flex-col" inViewAmount={0.45}>
            <div className="space-y-5">
              <h2 className="font-display text-[var(--text-h2)] leading-[var(--leading-tight)] tracking-wide text-foreground">
                {TAGLINES.cta}
              </h2>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Share a few details and we&apos;ll reply within one business day
                with next steps.
              </p>
            </div>
            <div className="mt-8 flex flex-1 flex-col justify-end gap-5">
              <figure className="relative mx-auto aspect-3/2 w-full max-w-xl overflow-hidden rounded-[var(--radius-button)] border border-border lg:mx-0 lg:max-w-none">
                <div className="absolute inset-x-0 top-1/2 aspect-[1.15/1] w-full -translate-y-1/2">
                  <ChromaticImage
                    src="/assets/contact/limon-cottonwood-v2.webp"
                    alt="A solitary cottonwood tree in eastern Colorado grasslands"
                    sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 42vw, (min-width: 768px) 36rem, calc(100vw - 3.5rem)"
                    className="size-full"
                    objectPosition="100% 50%"
                    backgroundColor="#fcf8d7"
                    zoom={0.12}
                    displacement={0.032}
                    chromaticShift={0.008}
                    tilt={0.16}
                  />
                </div>
              </figure>
              <p className="font-pixel text-micro text-muted-foreground">
                {BRAND.name}
                <span className="text-orange"> / </span>
                {BRAND.location}
              </p>
            </div>
          </BlurFade>

          <BlurFade className="h-full" delay={0.12} inViewAmount={0.35}>
            <ScrollGlass className="contact-glass h-full rounded-[var(--radius-button)] border border-border bg-background dark:bg-card">
              <ContactForm />
            </ScrollGlass>
          </BlurFade>
        </div>
      </Container>
    </section>
  );
}
