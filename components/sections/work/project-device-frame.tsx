import type { ReactNode } from "react";

import { Iphone } from "@/registry/magicui/iphone";
import { Safari } from "@/registry/magicui/safari";
import type { SaharaDevice } from "@/lib/sahara";
import { cn } from "@/lib/utils";

export function ProjectDeviceFrame({ device, children, className, url = "thesaharagrill.com" }: {
  device: SaharaDevice;
  children: ReactNode;
  className?: string;
  url?: string;
}) {
  if (device === "desktop") return <Safari url={url} className={cn("project-device-safari", className)}>{children}</Safari>;
  if (device === "mobile") return <Iphone className={cn("project-device-iphone", className)}>{children}</Iphone>;

  return (
    <div className={cn("project-device-tablet", className)}>
      <span className="project-device-tablet-camera" aria-hidden="true" />
      <div className="project-device-tablet-screen">{children}</div>
    </div>
  );
}
