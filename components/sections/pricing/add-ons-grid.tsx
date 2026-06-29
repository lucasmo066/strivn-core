import { MonoLabel } from "@/components/shared/mono-label";
import { ADD_ONS, PRICING_COPY } from "@/lib/constants";

export function AddOnsGrid() {
  return (
    <div className="space-y-6">
      <div>
        <MonoLabel>04 — Add-ons</MonoLabel>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
          One-time add-ons
        </h3>
        <p className="mt-2 max-w-2xl font-ui text-sm text-muted-foreground">
          {PRICING_COPY.addonSub}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {ADD_ONS.map((addon) => (
          <div
            key={addon.name}
            className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-4 py-3 transition-hairline hover:border-orange/40"
          >
            <span className="font-ui text-sm text-muted-foreground">
              {addon.name}
            </span>
            <span className="shrink-0 font-ui text-xs font-bold tabular-nums">
              {addon.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
