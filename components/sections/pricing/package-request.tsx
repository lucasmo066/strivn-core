"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { ADD_ONS, BUILD_PACKAGES } from "@/lib/constants";

export function PackageRequest({ initialPackage }: { initialPackage: string }) {
  const [selected, setSelected] = useState(initialPackage);
  const [extras, setExtras] = useState<string[]>([]);
  const pkg = BUILD_PACKAGES.find((item) => item.name === selected) ?? BUILD_PACKAGES[0];
  const selectionSummary = `Package requested: ${pkg.name} (${pkg.price}${pkg.priceNote === "up to $6,000" ? "–$6,000" : ""}; ${pkg.pages}).${extras.length ? `\nAdd-ons requested: ${extras.join(", ")}.` : ""}`;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
      <div className="space-y-6">
        <fieldset>
          <legend className="mb-4 font-display text-xl">01 / Choose your build</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {BUILD_PACKAGES.map((item) => (
              <label key={item.name} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 has-checked:border-orange has-checked:bg-orange/5 has-focus-visible:outline-2 has-focus-visible:outline-orange">
                <input type="radio" name="package" value={item.name} checked={selected === item.name} onChange={() => setSelected(item.name)} className="mt-1 accent-orange" />
                <span><span className="block font-medium">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.pages}</span><span className="mt-3 block font-display text-xl">{item.price}</span><span className="mt-1 block text-xs text-muted-foreground">{item.priceNote}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="rounded-xl border border-border p-5" aria-live="polite">
          <h2 className="font-medium">Included with {pkg.name}</h2>
          <ul className="mt-4 space-y-3">{pkg.includes.map((item) => <li key={item} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />{item}</li>)}</ul>
        </div>
        <details className="rounded-xl border border-border p-5">
          <summary className="cursor-pointer text-sm font-medium">Optional add-ons{extras.length ? ` (${extras.length} selected)` : ""}</summary>
          <div className="mt-5 space-y-4">{ADD_ONS.map((item) => (
            <label key={item.name} className="flex cursor-pointer items-start gap-3 text-sm">
              <input type="checkbox" checked={extras.includes(item.name)} onChange={(event) => setExtras((current) => event.target.checked ? [...current, item.name] : current.filter((name) => name !== item.name))} className="mt-1 accent-orange" />
              <span><span className="block">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.price} · {item.description}</span></span>
            </label>
          ))}</div>
        </details>
        <p className="text-sm leading-relaxed text-muted-foreground">This is a project request. No payment is collected here. We’ll agree on the final scope and price before the 50% deposit at signing.</p>
      </div>
      <div>
        <h2 className="mb-4 font-display text-xl">02 / Tell us about the project</h2>
        <ContactForm selectionSummary={selectionSummary} />
      </div>
    </div>
  );
}
