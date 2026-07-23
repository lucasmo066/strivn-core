import { ADD_ONS } from "@/lib/constants";

function pixelizeNumbers(text: string) {
  return text.split(/(\d+)/).map((part, i) =>
    /^\d+$/.test(part) ? (
      <span key={i} className="font-display tracking-wide tabular-nums">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function AddOnsGrid() {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl tracking-wide">
        Add-ons
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {ADD_ONS.map((addon) => (
          <div
            key={addon.name}
            className="flex items-start justify-between gap-3 rounded-2xl bg-card px-4 py-4 shadow-soft transition-lift hover:-translate-y-0.5 hover:shadow-soft-hover sm:items-center sm:gap-4 sm:px-5"
          >
            <span className="min-w-0 text-sm leading-snug text-muted-foreground">
              {pixelizeNumbers(addon.name)}
            </span>
            <span className="shrink-0 font-display text-sm tracking-wide tabular-nums">
              {addon.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
