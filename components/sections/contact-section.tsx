import Image from "next/image";

import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/shared/container";
import dots from "@/components/shared/dotted-section.module.css";
import { BlurFade } from "@/components/ui/blur-fade";
import { BRAND, TAGLINES } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className={`section-y border-t border-border ${dots.section}`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          <BlurFade className="space-y-5" inViewAmount={0.45}>
            <h2 className="font-display text-[var(--text-h2)] leading-[var(--leading-tight)] tracking-wide text-foreground">
              {TAGLINES.cta}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Share a few details and we&apos;ll reply within one business day
              with next steps.
            </p>
            <figure className="relative hidden aspect-4/3 max-w-md overflow-hidden rounded-[var(--radius-button)] border border-border lg:block">
              <Image
                src="/assets/contact/limon-cottonwood-v2.webp"
                alt="A solitary cottonwood tree in eastern Colorado grasslands"
                fill
                sizes="(min-width: 1024px) 32vw, 0px"
                className="object-cover"
              />
            </figure>
            <p className="font-pixel text-micro text-muted-foreground">
              {BRAND.name}
              <span className="text-orange"> / </span>
              {BRAND.location}
            </p>
          </BlurFade>

          <BlurFade delay={0.12} inViewAmount={0.35}>
            <ContactForm />
          </BlurFade>
        </div>
      </Container>
    </section>
  );
}
