import { OVERAGE_RATE, PRICING_QUICK_REF } from "@/lib/constants";

export function OverageAndQuickRef() {
  return (
    <div className="space-y-8">
      <div className="void flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-8">
        <p className="font-display text-4xl font-bold tracking-tight text-orange tabular-nums">
          {OVERAGE_RATE}
        </p>
        <div>
          <p className="font-semibold text-white">Out-of-scope work</p>
          <p className="mt-1 text-sm text-white/60">
            Quoted and approved before we start. No surprise invoices.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 rounded-2xl bg-card p-6 shadow-soft sm:gap-8">
        {PRICING_QUICK_REF.map((item) => (
          <div key={item.label}>
            <p className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
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
  );
}
