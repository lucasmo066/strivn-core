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
  const [showTiming, setShowTiming] = useState(true);

  const result = calculateWebsiteReturn({
    investment: number(investment) ?? NaN,
    customerContribution: number(contribution) ?? NaN,
    closeRatePercent: showTiming ? number(closeRate) : undefined,
    monthlyLeads: showTiming ? number(monthlyLeads) : undefined,
    careCost,
  });
  const invalidAmount = (value: string) => value !== "" && (!Number.isFinite(Number(value)) || Number(value) <= 0);
  const invalidRate = closeRate !== "" && (!Number.isFinite(Number(closeRate)) || Number(closeRate) < 0 || Number(closeRate) > 100);
  const invalidMonthly = (value: string) => value !== "" && (!Number.isFinite(Number(value)) || Number(value) < 0);

  return (
    <section id="website-value" aria-labelledby="website-value-heading" className="border-t border-border p-5 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-xs text-orange">Beyond the price tag</p>
          <h3 id="website-value-heading" className="font-display text-xl sm:text-2xl">What could a few more customers mean for your business?</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Fast pages, clear design, and a foundation for search help people find you, trust your work, and get in touch.
            Care keeps your site hosted, monitored, and up to date. Estimate what new customers could contribute each month after care, and how quickly that could cover your website build.
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
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Monthly pricing includes hosting, monitoring, security updates, and content edits. The selected plan is included in your ongoing costs.</p>
            </div>
            <details open={showTiming} onToggle={(event) => setShowTiming(event.currentTarget.open)} className="border-t border-border pt-2">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-orange [&::-webkit-details-marker]:hidden">
                Your lead estimates & timing
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
              </div>
            </details>
          </div>

          <div className="flex h-fit min-w-0 flex-col rounded-[var(--radius-button)] border border-orange/25 bg-orange/5 p-5 sm:p-6">
            <div role="status" aria-live="polite" aria-atomic="true" className="space-y-5">
              <p className="font-mono text-xs text-muted-foreground">Your website’s potential</p>
              <dl className="space-y-2 border-b border-border pb-4 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">One-time build</dt><dd>{invalidAmount(investment) || !investment.trim() ? "—" : money.format(Number(investment))}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Care / month</dt><dd>{money.format(careCost)}</dd></div>
              </dl>
              {result ? (
                <>
                  {result.monthlyNet !== null ? (
                    <div>
                      <p className="text-orange-gradient font-display text-4xl tabular-nums break-words">{money.format(result.monthlyNet)}<span className="text-base text-muted-foreground"> /month</span></p>
                      <p className="mt-2 font-medium">{result.monthlyNet > 0 ? "could remain after monthly care" : result.monthlyNet === 0 ? "remaining after monthly care" : "monthly shortfall after care"}</p>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Based on {monthlyLeads} new leads/month × {closeRate}% becoming customers × {money.format(Number(contribution))} kept per customer, minus {money.format(careCost)}/month for care.</p>
                      {result.monthsToRecover !== null ? (
                        <div className="mt-4 border-t border-border pt-4">
                          <p className="font-display text-xl text-orange-gradient">{paybackLabel(result.monthsToRecover)}</p>
                          <p className="mt-1 text-sm text-muted-foreground">to recover the {money.format(Number(investment))} build. After that, the monthly amount could go toward your business.</p>
                        </div>
                      ) : <p className="mt-4 text-sm leading-relaxed text-muted-foreground">These estimates don’t leave an amount to recover the build. Try a different lead estimate, close rate, or customer value.</p>}
                    </div>
                  ) : (
                    <div>
                      <p className="font-display text-xl">See what could remain each month.</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Enter your monthly leads and close rate to estimate the amount after care and your build recovery time.</p>
                    </div>
                  )}
                  <div className="space-y-2 border-t border-border pt-4 text-sm leading-relaxed">
                    <p><span className="font-semibold">{whole.format(result.customersNeeded)} new {result.customersNeeded === 1 ? "customer" : "customers"}</span> to cover the build alone, before monthly care.</p>
                    {careCost > 0 && result.monthlyCustomersNeeded !== null && <p className="text-muted-foreground"><span className="font-semibold text-foreground">{whole.format(result.monthlyCustomersNeeded)} additional {result.monthlyCustomersNeeded === 1 ? "customer" : "customers"}/month</span> to cover your care plan.</p>}
                  </div>
                </>
              ) : (
                <div>
                  <p className="font-display text-xl">What is a new customer worth to you?</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Enter the amount you keep per customer, your monthly leads, and your close rate. We’ll show the estimated monthly amount after care and the time to recover your build.</p>
                </div>
              )}
            </div>
            <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              Estimates use your numbers, not industry averages or guaranteed results. The monthly amount is after care, before recovering the build. Timing starts when the assumed leads arrive. Only website build and care costs are included.
            </p>
            {result && !showTiming && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Add lead estimates to see how much could remain each month and how long it could take to recover the build.</p>}
            <a href="https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-orange">
              How break-even is calculated <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
