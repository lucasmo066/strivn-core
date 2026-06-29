import { MonoLabel } from "@/components/shared/mono-label";
import { EDIT_SIZES, PRICING_COPY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TAG_STYLES = {
  small: "bg-emerald-50 text-emerald-800",
  medium: "bg-amber-50 text-amber-800",
  large: "bg-rose-50 text-rose-800",
} as const;

export function EditSizesTable() {
  return (
    <div className="space-y-6">
      <div>
        <MonoLabel>03 — Scope</MonoLabel>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
          Edit size classifications
        </h3>
        <p className="mt-2 max-w-2xl font-ui text-sm text-muted-foreground">
          {PRICING_COPY.editSub}
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] border-collapse font-ui text-sm">
          <thead>
            <tr className="void">
              <th className="px-4 py-3 text-left font-pixel text-[10px] font-medium tracking-wider text-white uppercase">
                Size
              </th>
              <th className="px-4 py-3 text-left font-pixel text-[10px] font-medium tracking-wider text-white uppercase">
                Definition
              </th>
              <th className="px-4 py-3 text-left font-pixel text-[10px] font-medium tracking-wider text-white uppercase">
                Time
              </th>
              <th className="px-4 py-3 text-left font-pixel text-[10px] font-medium tracking-wider text-white uppercase">
                Billing
              </th>
            </tr>
          </thead>
          <tbody>
            {EDIT_SIZES.map((size, index) => (
              <tr
                key={size.name}
                className={cn(
                  "border-t border-border",
                  index % 2 === 1 && "bg-muted/30"
                )}
              >
                <td className="px-4 py-3 align-top">
                  <span
                    className={cn(
                      "inline-block rounded px-2 py-0.5 font-pixel text-[10px] font-medium tracking-wider uppercase",
                      TAG_STYLES[size.tag]
                    )}
                  >
                    {size.name}
                  </span>
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">
                  {size.definition}
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">
                  {size.time}
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">
                  {size.billing}
                  {"billingNote" in size && size.billingNote ? (
                    <>
                      <br />
                      <span className="text-xs text-muted-foreground/70">
                        {size.billingNote}
                      </span>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
