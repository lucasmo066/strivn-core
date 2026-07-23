import { OVERAGE_RATE, PRICING_QUICK_REF } from "@/lib/constants";

export function OverageAndQuickRef() {
  return (
    <div className="space-y-8">
      <div className="void flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-8">
        <p className="font-display text-4xl tracking-wide text-orange tabular-nums">
          {OVERAGE_RATE}
        </p>
        <div>
          <p className="font-semibold text-white">Out-of-scope work</p>
          <p className="mt-1 text-sm text-white/60">
            Quoted and approved before we start. No surprise invoices.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-soft">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:flex lg:flex-wrap lg:gap-8">
          {PRICING_QUICK_REF.map((item) => (
            <div key={item.label} className="min-w-0 lg:min-w-28">
              <p className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {item.label}
              </p>
              <p className="mt-1 font-display text-base tabular-nums">
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
