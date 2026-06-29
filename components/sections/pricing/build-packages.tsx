import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import {
  HairlineCard,
  HairlineCardContent,
  HairlineCardHeader,
  HairlineCardTitle,
} from "@/components/surfaces/hairline-card";
import { BUILD_PACKAGES, EXTRA_PAGE_PRICE, PRICING_COPY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function BuildPackages() {
  return (
    <div className="space-y-6">
      <div>
        <MonoLabel>01 — Build</MonoLabel>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
          Website build packages
        </h3>
        <p className="mt-2 max-w-2xl font-ui text-sm text-muted-foreground">
          {PRICING_COPY.buildSub}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {BUILD_PACKAGES.map((pkg) => (
          <HairlineCard
            key={pkg.name}
            className={cn(
              "relative transition-hairline hover:border-orange/40",
              "featured" in pkg &&
                pkg.featured &&
                "border-orange bg-[#fff2eb]"
            )}
          >
            {"badge" in pkg && pkg.badge ? (
              <span className="absolute top-0 right-3 rounded-b-md bg-orange px-2 py-0.5 font-pixel text-[9px] font-medium tracking-wider text-white uppercase">
                {pkg.badge}
              </span>
            ) : null}
            <HairlineCardHeader className="space-y-3">
              <div>
                <HairlineCardTitle className="font-display text-base">
                  {pkg.name}
                </HairlineCardTitle>
                <p className="font-ui text-xs text-muted-foreground">
                  {pkg.pages}
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold tracking-tight tabular-nums">
                  {pkg.price}
                </p>
                <p className="font-ui text-[10px] text-muted-foreground">
                  {pkg.priceNote}
                </p>
              </div>
              <hr className="border-border" />
              <ul className="space-y-1.5 font-ui text-xs text-muted-foreground">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-muted-foreground/60">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </HairlineCardHeader>
            <HairlineCardContent>
              <StrivnButton
                variant={"featured" in pkg && pkg.featured ? "primary" : "outline"}
                className="w-full"
                arrow={"featured" in pkg && pkg.featured}
              >
                Get started
              </StrivnButton>
            </HairlineCardContent>
          </HairlineCard>
        ))}
      </div>

      <p className="border-l-2 border-orange pl-3 font-ui text-xs text-muted-foreground">
        Extra pages beyond package scope → {EXTRA_PAGE_PRICE} each
      </p>
    </div>
  );
}
