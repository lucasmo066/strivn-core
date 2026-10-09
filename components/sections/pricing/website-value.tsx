"use client";

import { useState } from "react";
import { Calculator, ChevronDown, ArrowUpRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { BUILD_PACKAGES, RETAINER_PLANS } from "@/lib/constants";
import { calculateWebsiteReturn } from "@/lib/website-return";

const packages = BUILD_PACKAGES.map((plan) => ({
  name: plan.name,
  amount: Number(plan.price.replace(/[^\d.]/g, "")),
  label: `${plan.name} · ${plan.price}${plan.name === "Shopify" ? "+" : ""}`,
}));
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 });
const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const number = (value: string) => value.trim() === "" ? undefined : Number(value);

function paybackLabel(months: number) {
  if (months < 1) return "Under 1 month";
  // Round up so the displayed estimate never suggests an earlier payoff.
  const rounded = Math.ceil(months * 10) / 10;
  return `About ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(rounded)} ${rounded === 1 ? "month" : "months"}`;
}

export function WebsiteValue() {
  const [expanded, setExpanded] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Starter");
  const [investment, setInvestment] = useState(String(packages[0].amount));
  const [contribution, setContribution] = useState("");
  const [closeRate, setCloseRate] = useState("");
  const [monthlyLeads, setMonthlyLeads] = useState("");
  const [carePlan, setCarePlan] = useState("None");
  const careCost = RETAINER_PLANS.find((plan) => plan.name === carePlan)?.monthly ?? 0;
  const [monthlyCosts, setMonthlyCosts] = useState("0");
  const [showTiming, setShowTiming] = useState(false);

  const result = calculateWebsiteReturn({
    investment: number(investment) ?? NaN,
    customerContribution: number(contribution) ?? NaN,
    closeRatePercent: showTiming ? number(closeRate) : undefined,
    monthlyLeads: showTiming ? number(monthlyLeads) : undefined,
    monthlyCosts: (number(monthlyCosts) ?? 0) + careCost,
  });
  const invalidAmount = (value: string) => value !== "" && (!Number.isFinite(Number(value)) || Number(value) <= 0);
  const invalidRate = closeRate !== "" && (!Number.isFinite(Number(closeRate)) || Number(closeRate) < 0 || Number(closeRate) > 100);
  const invalidMonthly = (value: string) => value !== "" && (!Number.isFinite(Number(value)) || Number(value) < 0);

  return (
    <section id="website-value" aria-labelledby="website-value-heading" className="border-t border-border p-5 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-xs text-orange">Beyond the price tag</p>
          <h3 id="website-value-heading" className="font-display text-xl sm:text-2xl">What could your website earn back?</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Fast pages, clear design, and a foundation for search help people find you, trust your work, and get in touch.
            Monthly care keeps that foundation improving. Explore the build and ongoing costs using your own numbers.
          </p>
          {!expanded && <p className="mt-3 text-sm leading-relaxed"><span className="text-muted-foreground">For example:</span> <span className="font-medium">2 new customers</span> at {money.format(packages[0].amount / 2)} kept each would cover a {money.format(packages[0].amount)} build.</p>}
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="website-value-calculator"
          onClick={() => setExpanded(!expanded)}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-[var(--radius-button)] border border-orange/40 px-4 py-3 text-sm font-medium hover:bg-orange/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          <Calculator className="size-4 text-orange" aria-hidden />
          {expanded ? "Close calculator" : "Calculate your return"}
          <ChevronDown className={`size-4 ${expanded ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </div>

      <div id="website-value-calculator" hidden={!expanded} className="mt-6 border-t border-border pt-6">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="min-w-0 space-y-5">
            <div>
              <label htmlFor="return-package" className="block text-sm font-medium">Start with a package</label>
              <select
                id="return-package"
                value={selectedPackage}
                onChange={(event) => {
                  const name = event.target.value;
                  setSelectedPackage(name);
                  const plan = packages.find((item) => item.name === name);
                  if (plan) setInvestment(String(plan.amount));
                }}
                className="mt-2 min-h-11 w-full rounded-lg border border-input bg-background px-3 text-base focus-visible:outline-2 focus-visible:outline-orange"
              >
                {packages.map((plan) => <option key={plan.name} value={plan.name}>{plan.label}</option>)}
                <option value="custom">My total / custom amount</option>
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="return-investment" className="block text-sm font-medium">Website cost ($)</label>
                <Input id="return-investment" type="number" inputMode="decimal" min="0.01" step="0.01" value={investment}
                  onChange={(event) => { setInvestment(event.target.value); setSelectedPackage("custom"); }}
                  aria-invalid={invalidAmount(investment)} aria-describedby="return-investment-help" className="mt-2 h-11 text-base md:text-base" />
                <p id="return-investment-help" className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {invalidAmount(investment) ? "Enter a cost greater than zero." : "Use the full build price, including any add-ons."}
                </p>
              </div>
              <div>
                <label htmlFor="return-contribution" className="block text-sm font-medium">Amount kept per customer ($)</label>
                <Input id="return-contribution" type="number" inputMode="decimal" min="0.01" step="0.01" placeholder="Enter your amount" value={contribution}
                  onChange={(event) => setContribution(event.target.value)} aria-invalid={invalidAmount(contribution)}
                  aria-describedby="return-contribution-help" className="mt-2 h-11 text-base md:text-base" />
                <p id="return-contribution-help" className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {invalidAmount(contribution) ? "Enter an amount greater than zero." : "Revenue from one sale, minus the costs to deliver it."}
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="return-care" className="block text-sm font-medium">Include a monthly care plan</label>
              <select id="return-care" value={carePlan} onChange={(event) => setCarePlan(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-input bg-background px-3 text-base focus-visible:outline-2 focus-visible:outline-orange">
                <option value="None">Build only · no care plan</option>
                {RETAINER_PLANS.map((plan) => <option key={plan.name} value={plan.name}>{plan.name} · {money.format(plan.monthly)}/month</option>)}
              </select>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Monthly billing shown. Add lead estimates below to see recovery time after care and other running costs.</p>
            </div>
            <details onToggle={(event) => setShowTiming(event.currentTarget.open)} className="border-t border-border pt-2">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-orange [&::-webkit-details-marker]:hidden">
                Add lead estimates & timing
                <ChevronDown className={`size-4 shrink-0 ${showTiming ? "rotate-180" : ""}`} aria-hidden />
              </summary>
              <div className="space-y-4 pt-3">
                <p className="text-xs leading-relaxed text-muted-foreground">Count additional enquiries the website could bring in, beyond the business you already receive.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="return-close-rate" className="block text-sm font-medium">Leads that become customers (%)</label>
                    <Input id="return-close-rate" type="number" inputMode="decimal" min="0" max="100" step="0.1" placeholder="Your close rate" value={closeRate}
                      onChange={(event) => setCloseRate(event.target.value)} aria-invalid={invalidRate}
                      aria-describedby="return-rate-help" className="mt-2 h-11 text-base md:text-base" />
                    <p id="return-rate-help" className="mt-2 text-xs text-muted-foreground">{invalidRate ? "Enter a percentage from 0 to 100." : "For example, 1 in 4 enquiries = 25%."}</p>
                  </div>
                  <div>
                    <label htmlFor="return-leads" className="block text-sm font-medium">New leads per month</label>
                    <Input id="return-leads" type="number" inputMode="numeric" min="0" step="1" placeholder="Your estimate" value={monthlyLeads}
                      onChange={(event) => setMonthlyLeads(event.target.value)} aria-invalid={invalidMonthly(monthlyLeads)}
                      aria-describedby="return-leads-help" className="mt-2 h-11 text-base md:text-base" />
                    <p id="return-leads-help" className="mt-2 text-xs text-muted-foreground">{invalidMonthly(monthlyLeads) ? "Enter zero or a positive number." : "Your assumption, not a traffic forecast."}</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="return-monthly-costs" className="block text-sm font-medium">Extra monthly costs ($)</label>
                  <Input id="return-monthly-costs" type="number" inputMode="decimal" min="0" step="0.01" value={monthlyCosts}
                    onChange={(event) => setMonthlyCosts(event.target.value)} aria-invalid={invalidMonthly(monthlyCosts)}
                    aria-describedby="return-costs-help" className="mt-2 h-11 text-base md:text-base" />
                  <p id="return-costs-help" className="mt-2 text-xs leading-relaxed text-muted-foreground">{invalidMonthly(monthlyCosts) ? "Enter zero or a positive amount." : "Include ads and other running costs. Your selected care plan is added separately."}</p>
                </div>
              </div>
            </details>
          </div>

          <div className="flex min-w-0 flex-col rounded-[var(--radius-button)] border border-orange/25 bg-orange/5 p-5 sm:p-6">
            <div role="status" aria-live="polite" aria-atomic="true" className="space-y-5">
              <p className="font-mono text-xs text-muted-foreground">Your break-even estimate</p>
              <p className="text-sm text-muted-foreground">Build: {money.format(Number(investment) || 0)} · Care: {money.format(careCost)}/month</p>
              {result ? (
                <>
                  <div>
                    <p className="text-orange-gradient font-display text-4xl tabular-nums break-words">{whole.format(result.customersNeeded)}</p>
                    <p className="mt-2 font-medium">new {result.customersNeeded === 1 ? "customer" : "customers"} to cover the build</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{money.format(Number(investment))} ÷ {money.format(Number(contribution))} kept per customer, rounded up.</p>
                  </div>
                  {showTiming && result.valuePerLead !== null && (
                    <div className="space-y-2 border-t border-border pt-4 text-sm leading-relaxed">
                      <p><span className="font-semibold">{money.format(result.valuePerLead)}</span> estimated value per lead at your {closeRate}% close rate.</p>
                      {result.leadsNeeded !== null && <p className="text-muted-foreground">About {whole.format(result.leadsNeeded)} leads to win {whole.format(result.customersNeeded)} new {result.customersNeeded === 1 ? "customer" : "customers"} at that rate.</p>}
                      {result.monthlyNet !== null && (
                        result.monthsToRecover !== null ? (
                          <div className="pt-2">
                            <p className="font-display text-xl text-orange-gradient">{paybackLabel(result.monthsToRecover)}</p>
                            <p className="mt-1 text-muted-foreground">to recover the build cost at {money.format(result.monthlyNet)}/month after the costs entered.</p>
                          </div>
                        ) : <p className="font-medium">These inputs don’t cover the build cost over time. New business needs to exceed the monthly costs.</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <p className="font-display text-xl">What is a new customer worth to you?</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Enter your build cost and the amount you keep from one customer to see how many new customers could cover the investment.</p>
                </div>
              )}
            </div>
            <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              Estimates use your numbers, not industry averages or guaranteed results. Timing starts when the assumed leads arrive and excludes taxes or costs you haven’t entered.
            </p>
            <a href="https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-orange">
              How break-even is calculated <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
