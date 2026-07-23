import { EDIT_SIZES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TAG_STYLES = {
  small: "bg-emerald-50 text-emerald-800",
  medium: "bg-amber-50 text-amber-800",
  large: "bg-rose-50 text-rose-800",
} as const;

export function EditSizesTable() {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl font-semibold tracking-tight">
        What counts as an edit
      </h3>

      <div className="overflow-x-auto rounded-2xl bg-card shadow-soft">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="void">
              {["Size", "Definition", "Time", "Billing"].map((label) => (
                <th
                  key={label}
                  className="px-4 py-3 text-left font-mono text-[10px] font-semibold tracking-wider text-white uppercase"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EDIT_SIZES.map((size, index) => (
              <tr
                key={size.name}
                className={cn(
                  "border-t border-border",
                  index % 2 === 1 && "bg-muted/40"
                )}
              >
                <td className="px-4 py-3 align-top">
                  <span
                    className={cn(
                      "inline-block rounded-lg px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase",
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
