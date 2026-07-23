import Link from "next/link";

import { StrivnButton } from "@/components/shared/strivn-button";
import {
  SoftCard,
  SoftCardContent,
  SoftCardHeader,
  SoftCardTitle,
} from "@/components/surfaces/soft-card";
import { BUILD_PACKAGES, EXTRA_PAGE_PRICE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function BuildPackages() {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl font-semibold tracking-tight">
        Website builds
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {BUILD_PACKAGES.map((pkg) => {
          const featured = "featured" in pkg && pkg.featured;

          return (
            <SoftCard
              key={pkg.name}
              accent={featured}
              className={cn("relative", featured && "ring-1 ring-orange/40")}
            >
              {"badge" in pkg && pkg.badge ? (
                <span className="absolute top-0 right-4 rounded-b-lg bg-orange px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-white uppercase">
                  {pkg.badge}
                </span>
              ) : null}
              <SoftCardHeader className="space-y-3">
                <div>
                  <SoftCardTitle className="font-display text-base">
                    {pkg.name}
                  </SoftCardTitle>
                  <p className="text-xs text-muted-foreground">{pkg.pages}</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold tracking-tight tabular-nums">
                    {pkg.price}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {pkg.priceNote}
                  </p>
                </div>
                <hr className="border-border" />
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-orange">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </SoftCardHeader>
              <SoftCardContent>
                <StrivnButton
                  variant={featured ? "primary" : "outline"}
                  className="w-full"
                  arrow={featured}
                  asChild
                >
                  <Link href="#contact">Get started</Link>
                </StrivnButton>
              </SoftCardContent>
            </SoftCard>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Extra pages: {EXTRA_PAGE_PRICE} each. 50% deposit, 50% at launch.
      </p>
    </div>
  );
}
