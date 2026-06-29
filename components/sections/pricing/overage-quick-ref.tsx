import { MonoLabel } from "@/components/shared/mono-label";
import {
  OVERAGE_COPY,
  OVERAGE_RATE,
  PRICING_COPY,
  PRICING_QUICK_REF,
} from "@/lib/constants";

export function OverageAndQuickRef() {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div>
          <MonoLabel>05 — Overage</MonoLabel>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
            Out-of-scope work
          </h3>
          <p className="mt-2 max-w-2xl font-ui text-sm text-muted-foreground">
            {PRICING_COPY.overageSub}
          </p>
        </div>

        <div className="void flex flex-col gap-5 rounded-lg p-6 sm:flex-row sm:items-center">
          <p className="font-display text-4xl font-bold tracking-tight text-orange tabular-nums">
            {OVERAGE_RATE}
          </p>
          <p className="font-ui text-sm leading-relaxed text-white/60">
            <span className="font-semibold text-white">Standard overage rate.</span>
            <br />
            {OVERAGE_COPY}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <MonoLabel>Quick reference</MonoLabel>
        <h3 className="font-display text-xl font-semibold tracking-tight">
          At a glance
        </h3>
        <div className="flex flex-wrap gap-6 rounded-lg border border-border bg-card p-5 sm:gap-8">
          {PRICING_QUICK_REF.map((item) => (
            <div key={item.label}>
              <p className="font-pixel text-[9px] font-medium tracking-wider text-muted-foreground uppercase">
                {item.label}
              </p>
              <p className="mt-1 font-display text-base font-bold tabular-nums">
                {item.value}
                {item.suffix ? (
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    {item.suffix}
                  </span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
