import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/shared/container";
import { MediaSlot } from "@/components/shared/media-slot";
import { BRAND, TAGLINES } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="section-y border-t border-border">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          <div className="space-y-5">
            <h2 className="font-display text-[var(--text-h2)] leading-[var(--leading-tight)] tracking-wide text-foreground">
              {TAGLINES.cta}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Share a few details and we&apos;ll reply within one business day
              with next steps.
            </p>
            {/* TODO: Replace with approved project-work media. This stays hidden on mobile to protect the form path. */}
            <MediaSlot
              alt="Contact section project-work media"
              label="Project work media"
              className="hidden max-w-md lg:grid"
            />
            <p className="font-pixel text-micro text-muted-foreground">
              {BRAND.name}
              <span className="text-orange"> / </span>
              {BRAND.location}
            </p>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
