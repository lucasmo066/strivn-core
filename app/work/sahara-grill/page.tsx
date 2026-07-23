import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { SAHARA_CASE_STUDY, TAGLINES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SAHARA_CASE_STUDY.title} — Strivn`,
  description: SAHARA_CASE_STUDY.summary,
};

export default function SaharaGrillCaseStudyPage() {
  return (
    <main>
      <section className="section-y border-b border-border">
        <Container className="space-y-10">
          <div className="max-w-2xl space-y-4">
            <MonoLabel>
              {SAHARA_CASE_STUDY.category} · {SAHARA_CASE_STUDY.location}
            </MonoLabel>
            <h1 className="font-display text-[var(--text-h2)]">
              {SAHARA_CASE_STUDY.title}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              {SAHARA_CASE_STUDY.summary}
            </p>
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              {SAHARA_CASE_STUDY.metric}
            </p>
          </div>

          <div className="flex aspect-21/9 max-w-3xl items-end rounded-2xl bg-void p-6 sm:p-8">
            <div>
              <MonoLabel className="text-white/50">
                {SAHARA_CASE_STUDY.category}
              </MonoLabel>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {SAHARA_CASE_STUDY.title}
              </p>
            </div>
          </div>

          <div className="max-w-2xl space-y-5">
            {SAHARA_CASE_STUDY.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Ready for a site that gets customers to call?
            </p>
            <StrivnButton variant="primary" arrow asChild>
              <Link href="/#contact">{TAGLINES.heroCta}</Link>
            </StrivnButton>
          </div>
        </Container>
      </section>
    </main>
  );
}
