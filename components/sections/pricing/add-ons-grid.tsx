import { ADD_ONS, PRICING_COPY } from "@/lib/constants";

const addOnGroups = Object.entries(
  ADD_ONS.reduce<Record<string, Array<(typeof ADD_ONS)[number]>>>(
    (groups, addOn) => {
      groups[addOn.category] ??= [];
      groups[addOn.category].push(addOn);
      return groups;
    },
    {}
  )
);

export function AddOnsGrid() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h3 className="font-display text-xl tracking-wide">Add-ons</h3>
        <p className="max-w-xl text-sm text-muted-foreground">
          {PRICING_COPY.addonSub}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {addOnGroups.map(([category, addOns]) => (
          <section
            key={category}
            className="rounded-[var(--radius-md)] border border-border px-4 py-4 sm:px-5"
          >
            <h4 className="font-mono text-[10px] font-semibold tracking-[0.12em] text-orange uppercase">
              {category}
            </h4>
            <ul className="mt-3 divide-y divide-border">
              {addOns.map((addon) => (
                <li
                  key={addon.name}
                  className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm leading-snug text-foreground">
                      {addon.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {addon.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-pixel text-sm tracking-wide text-orange tabular-nums">
                    {addon.price}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
