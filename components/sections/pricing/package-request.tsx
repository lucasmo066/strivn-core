"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { BlurFade } from "@/components/ui/blur-fade";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { ADD_ONS, BUILD_PACKAGES, RETAINER_PLANS } from "@/lib/constants";
import styles from "./package-request.module.css";

const retainerSummaries: Record<string, string> = {
  Basic: "Hosting, monitoring, security updates, and 2 small edits each month.",
  Growth: "Everything in Basic, plus SEO content, Google Business Profile updates, and a monthly performance report.",
  Premium: "Everything in Growth, plus unlimited small edits, priority support, and a monthly strategy call.",
};

export function PackageRequest({ initialPackage }: { initialPackage: string }) {
  const [selected, setSelected] = useState(initialPackage);
  const [selectedRetainer, setSelectedRetainer] = useState("Growth");
  const [extras, setExtras] = useState<string[]>([]);
  const pkg = BUILD_PACKAGES.find((item) => item.name === selected) ?? BUILD_PACKAGES[0];
  const retainer = RETAINER_PLANS.find((item) => item.name === selectedRetainer) ?? RETAINER_PLANS[1];
  const selectionSummary = `Package requested: ${pkg.name} (${pkg.price}${pkg.priceNote === "up to $6,000" ? "–$6,000" : ""}; ${pkg.pages}).\nOngoing care requested: ${retainer.name} ($${retainer.monthly}/month). We’ll confirm the right scope and start date together.${extras.length ? `\nAdd-ons requested: ${extras.join(", ")}.` : ""}`;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
      <div className="space-y-6">
        <fieldset>
          <legend className="mb-4 font-display text-xl">01 / Choose your build</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {BUILD_PACKAGES.map((item, index) => (
              <BlurFade key={item.name} className="h-full" direction="right" delay={index * 0.16} duration={1.15} inViewAmount={0.1}>
                <label
                  data-revealed={selected === item.name ? "true" : undefined}
                  data-featured={"featured" in item && item.featured ? "true" : undefined}
                  className={`${styles.buildOption} relative isolate flex h-full cursor-pointer items-start gap-3 overflow-hidden rounded-[var(--radius-button)] border border-border p-4 has-checked:border-orange has-checked:bg-orange/5 has-focus-visible:outline-2 has-focus-visible:outline-orange`}
                >
                  {selected === item.name && <StripedPattern className="reveal-stripes opacity-0" />}
                  <input type="radio" name="package" value={item.name} checked={selected === item.name} onChange={() => setSelected(item.name)} className="relative mt-1 accent-orange" />
                  <span className="relative"><span className="text-orange-gradient inline-block font-medium">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.pages}</span><span className="mt-3 block font-display text-xl">{item.price}</span><span className="mt-1 block text-xs text-muted-foreground">{item.priceNote}</span></span>
                </label>
              </BlurFade>
            ))}
          </div>
        </fieldset>
        <section aria-labelledby="care-choice-heading" className="border-t border-border pt-6">
          <BlurFade delay={0.68} duration={1.15} inViewAmount={0.1}>
            <h2 id="care-choice-heading" className="font-display text-xl">A partner after launch</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A website creates value when it stays secure, current, and useful as your business changes. Our care plans keep a team involved after launch, so you are not left chasing help when you need an update or want to build on what is working.</p>
          </BlurFade>
          <fieldset className="mt-4">
            <legend className="sr-only">Choose ongoing website care</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {RETAINER_PLANS.map((plan, index) => (
                <BlurFade key={plan.name} className="h-full" direction="right" delay={0.84 + index * 0.16} duration={1.15} inViewAmount={0.1}>
                  <label
                    data-revealed={selectedRetainer === plan.name ? "true" : undefined}
                    data-featured={plan.featured ? "true" : undefined}
                    className={`${styles.careOption} relative isolate flex h-full cursor-pointer items-start gap-3 overflow-hidden rounded-[var(--radius-button)] border border-border p-4 has-checked:border-orange has-checked:bg-orange/5 has-focus-visible:outline-2 has-focus-visible:outline-orange`}
                  >
                    {selectedRetainer === plan.name && <StripedPattern className="reveal-stripes opacity-0" />}
                    <input type="radio" name="care-plan" value={plan.name} checked={selectedRetainer === plan.name} onChange={() => setSelectedRetainer(plan.name)} className="relative mt-1 accent-orange" />
                    <span className="relative min-w-0">
                      <span className="flex items-center gap-2"><span className="text-orange-gradient font-medium">{plan.name}</span>{plan.featured && <span className="text-[0.65rem] font-medium text-orange">RECOMMENDED</span>}</span>
                      <span className="mt-1 block font-display text-lg">${plan.monthly}<span className="font-sans text-xs text-muted-foreground"> / month</span></span>
                      <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">{retainerSummaries[plan.name]}</span>
                    </span>
                  </label>
                </BlurFade>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Growth is a strong starting point for businesses that want ongoing visibility work as well as reliable site care. This request is not a commitment; we’ll confirm the plan and scope together.</p>
          </fieldset>
        </section>
        <BlurFade className="rounded-[var(--radius-button)] border border-border p-5" delay={1.32} duration={1.15} inViewAmount={0.1} aria-live="polite">
          <h2 className="font-medium">Included with {pkg.name}</h2>
          <ul className="mt-4 space-y-3">{pkg.includes.map((item) => <li key={item} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />{item}</li>)}</ul>
          {pkg.name === "Shopify" && <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">Shopify subscription billed separately by Shopify.</p>}
        </BlurFade>
        <BlurFade delay={1.48} duration={1.15} inViewAmount={0.1}>
          <details className="rounded-[var(--radius-button)] border border-border p-5">
            <summary className="cursor-pointer text-sm font-medium">Optional add-ons{extras.length ? ` (${extras.length} selected)` : ""}</summary>
            <div className="mt-5 space-y-4">{ADD_ONS.map((item) => (
              <label key={item.name} className="flex cursor-pointer items-start gap-3 text-sm">
                <input type="checkbox" checked={extras.includes(item.name)} onChange={(event) => setExtras((current) => event.target.checked ? [...current, item.name] : current.filter((name) => name !== item.name))} className="mt-1 accent-orange" />
                <span><span className="block">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.price} · {item.description}</span></span>
              </label>
            ))}</div>
          </details>
        </BlurFade>
        <BlurFade delay={1.64} duration={1.15} inViewAmount={0.1}>
          <p className="text-sm leading-relaxed text-muted-foreground">This is a project request. No payment is collected here. We’ll agree on the final scope and price before the 50% deposit at signing.</p>
        </BlurFade>
      </div>
      <BlurFade direction="right" delay={0.64} duration={1.15} inViewAmount={0.1}>
        <h2 className="mb-4 font-display text-xl">02 / Tell us about the project</h2>
        <ContactForm selectionSummary={selectionSummary} />
      </BlurFade>
    </div>
  );
}
