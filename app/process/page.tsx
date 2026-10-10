import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { ProcessHeading } from "@/components/sections/process-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";
import { ShineBorder } from "@/registry/magicui/shine-border";

export const metadata: Metadata = {
  title: "Our Process",
  description: "From the first conversation to a custom website and optional care after launch. See how scope, onboarding, reviews, and launch work at Strivn.",
};

const steps = [
  {
    title: "Start with your business.",
    stage: "Conversation",
    body: "Book a call or send your project details. We’ll talk about your customers, what you want the site to do, and what’s getting in the way today.",
    outcome: "A shared understanding of your goals and priorities.",
    bring: "An idea, your existing site, and any timing you have in mind.",
  },
  {
    title: "Agree on the work.",
    stage: "Package & scope",
    body: "Choose a build package and agree on the pages, features, and any add-ons. Scope is fixed per tier, with extra pages at $200 each. We confirm what’s included before work begins.",
    outcome: "A defined scope, project price, and launch plan.",
    bring: "Your must-haves, budget, and any integrations the site needs.",
  },
  {
    title: "Get everything in place.",
    stage: "Onboarding",
    body: "A 50% deposit at signing starts the project. We gather the content, brand assets, and access needed for the agreed scope, then confirm priorities and how we’ll collect your feedback.",
    outcome: "The materials and direction needed to start the build.",
    bring: "Your logo, photos, page content, and relevant domain or platform access.",
  },
  {
    title: "Design. Build. Refine.",
    stage: "The build",
    body: "We shape the pages around your business and the actions visitors need to take. You review the work with us as it develops, so the design and content stay aligned with the agreed scope.",
    outcome: "A custom site ready for final review across screen sizes.",
    bring: "Consolidated feedback and any remaining content.",
  },
  {
    title: "Make it live.",
    stage: "Review & launch",
    body: "We review the final pages and check navigation, forms, and the integrations included in your scope before launch. A typical build takes 2–4 weeks; content readiness and feedback help keep it moving.",
    outcome: "Your approved site, published and ready for visitors.",
    bring: "Final approval. The remaining 50% is due at launch, within 7 days of the invoice.",
  },
  {
    title: "Keep moving forward.",
    stage: "Care after launch",
    body: "Choose an optional care plan for hosting, maintenance, and included edits. Plans start at $200/month. Medium or large changes are estimated in writing and approved before any extra charge.",
    outcome: "A clear route for updates as your business grows.",
    bring: "New content, changing business needs, and your next priorities.",
  },
] as const;

export default function ProcessPage() {
  return (
    <main className="relative isolate overflow-hidden pt-8 pb-20 sm:pt-12 sm:pb-28">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-[-1]",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          "[mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_75%)]",
        )}
      />
      <Container className="relative z-10">
        <Link scroll={false} href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" aria-hidden />Back to Strivn</Link>
        <BlurFade as="header" className="relative mt-8 grid gap-8 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16" inViewAmount={0.15}>
          <div>
            <MonoLabel className="text-orange">The Strivn process</MonoLabel>
            <ProcessHeading />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">A clear next step at every stage. Here’s how we turn your goals into a website, and keep it working for your business after launch.</p>
          </div>
          <BlurFade className="process-card nav-glass rounded-[var(--radius-button)] border border-[color-mix(in_srgb,var(--foreground)_34%,transparent)] p-6 dark:border-white/15" direction="right" delay={0.12} inViewAmount={0.3}>
            <p className="font-pixel text-xs text-orange">AT A GLANCE</p>
            <p className="mt-3 font-display text-3xl">2–4 weeks</p>
            <p className="mt-2 text-sm text-muted-foreground">A typical website build, with scope and timing agreed up front.</p>
            <p className="mt-5 border-t border-border pt-5 text-sm">50% at signing <span className="text-orange">/</span> 50% at launch</p>
          </BlurFade>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />
        </BlurFade>

        <ol className="mt-12 space-y-4 sm:space-y-6">
          {steps.map((step, index) => (
            <BlurFade as="li" key={step.stage} className="process-card nav-glass grid gap-6 rounded-[var(--radius-button)] border border-[color-mix(in_srgb,var(--foreground)_34%,transparent)] p-6 dark:border-white/15 sm:grid-cols-[4rem_1fr] sm:p-8 lg:grid-cols-[5rem_1fr_0.7fr] lg:gap-10" delay={index * 0.07} duration={0.75} inViewAmount={0.15}>
              <span className="text-orange-gradient font-pixel text-3xl" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <MonoLabel className="text-orange">{step.stage}</MonoLabel>
                <h2 className="mt-3 font-display text-2xl">{step.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                <p className="mt-5 flex items-start gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />{step.outcome}</p>
              </div>
              <div className="border-t border-border pt-5 sm:col-start-2 lg:col-start-auto lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <p className="font-pixel text-xs text-muted-foreground">YOUR PART</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.bring}</p>
                {index === 1 && <Link scroll={false} href="/pricing" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium">See packages & pricing <ArrowUpRight className="size-4 text-orange" aria-hidden /></Link>}
                {index === 5 && <Link scroll={false} href="/pricing#care" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium">Explore care plans <ArrowUpRight className="size-4 text-orange" aria-hidden /></Link>}
              </div>
            </BlurFade>
          ))}
        </ol>

        <BlurFade as="section" className="process-card nav-glass relative mt-12 flex flex-col items-start justify-between gap-8 rounded-[var(--radius-button)] border border-[color-mix(in_srgb,var(--foreground)_34%,transparent)] p-6 dark:border-white/15 sm:p-8 md:flex-row md:items-center" aria-labelledby="process-next" inViewAmount={0.2}>
          <ShineBorder shineColor={["#ff7540", "#ff9a4a", "#ffb56a"]} />
          <div><h2 id="process-next" className="font-display text-2xl">Let’s find your first step.</h2><p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">Talk through an idea, or choose a package and send the details when you know what you need.</p></div>
          <div className="flex flex-wrap gap-4"><StrivnButton arrow asChild><Link scroll={false} href="/book">Book a call</Link></StrivnButton><StrivnButton variant="outline" asChild><Link scroll={false} href="/start">Choose a package</Link></StrivnButton></div>
        </BlurFade>
      </Container>
    </main>
  );
}
