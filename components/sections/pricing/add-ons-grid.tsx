import { ADD_ONS } from "@/lib/constants";

export function AddOnsGrid() {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl font-semibold tracking-tight">
        Add-ons
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {ADD_ONS.map((addon) => (
          <div
            key={addon.name}
            className="flex items-center justify-between gap-4 rounded-2xl bg-card px-5 py-4 shadow-soft transition-lift hover:-translate-y-0.5 hover:shadow-soft-hover"
          >
            <span className="text-sm text-muted-foreground">{addon.name}</span>
            <span className="shrink-0 text-sm font-semibold tabular-nums">
              {addon.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
