"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { Expand, Monitor, Smartphone, Tablet } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProjectDeviceFrame } from "@/components/sections/work/project-device-frame";
import { cn } from "@/lib/utils";
import type { SaharaCapture, SaharaDevice, SaharaPage } from "@/lib/sahara";

const devices = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
] as const;

function subscribeToScreenSize(onChange: () => void) {
  const queries = [window.matchMedia("(min-width: 640px)"), window.matchMedia("(min-width: 1024px)")];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function screenSize(): SaharaDevice {
  if (window.matchMedia("(min-width: 1024px)").matches) return "desktop";
  return window.matchMedia("(min-width: 640px)").matches ? "tablet" : "mobile";
}

const serverScreenSize = (): SaharaDevice => "desktop";

export function ProjectGallery({ captures }: { captures: readonly SaharaCapture[] }) {
  const screen = useSyncExternalStore(subscribeToScreenSize, screenSize, serverScreenSize);
  const [chosenDevice, setDevice] = useState<SaharaDevice | null>(null);
  const device = chosenDevice ?? screen;
  const [page, setPage] = useState<SaharaPage>("menu");
  const capture = captures.find((item) => item.device === device && item.page === page);
  if (!capture) return null;

  return (
    <div className="sahara-gallery">
      <div className="flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div role="group" aria-label="Page to preview" className="flex gap-1">
          {([['home', 'Homepage'], ['menu', 'Menu']] as const).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={page === id} aria-controls="sahara-screen-preview" onClick={() => setPage(id)} className={cn("sahara-preview-button px-4", page === id && "sahara-preview-button-active")}>
              {label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Screen size to preview" className="grid grid-cols-3 gap-1 sm:flex">
          {devices.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" aria-pressed={device === id} aria-controls="sahara-screen-preview" onClick={() => setDevice(id)} className={cn("sahara-preview-button gap-2 px-3", device === id && "sahara-preview-button-active")}>
              <Icon className="hidden size-4 sm:block" aria-hidden /><span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <figure id="sahara-screen-preview">
        <Dialog>
          <div className="sahara-preview-stage" data-device={device}>
            <DialogTrigger asChild>
              <button type="button" className="sahara-preview-image group" aria-label={`Enlarge ${capture.title.toLowerCase()}`}>
                <ProjectDeviceFrame device={device} url={`thesaharagrill.com${page === "menu" ? "/menu" : ""}`}>
                  <Image key={capture.src} src={capture.src} alt={capture.alt} width={capture.width} height={capture.height} sizes={device === "desktop" ? "(min-width: 1536px) 1360px, 94vw" : device === "tablet" ? "(min-width: 768px) 640px, 90vw" : "(min-width: 640px) 390px, 86vw"} className="h-auto w-full" />
                </ProjectDeviceFrame>
                <span className="sahara-preview-expand"><Expand className="size-4" aria-hidden />View full size</span>
              </button>
            </DialogTrigger>
          </div>
          <DialogContent className="max-h-[94dvh] overflow-y-auto bg-background p-4 sm:max-w-[min(96vw,90rem)] sm:p-6">
            <DialogTitle className="pr-10 text-xl">{capture.title}</DialogTitle>
            <DialogDescription>{capture.caption}</DialogDescription>
            <Image src={capture.src} alt={capture.alt} width={capture.width} height={capture.height} sizes={device === "mobile" ? "(min-width: 640px) 390px, 90vw" : device === "tablet" ? "(min-width: 1024px) 834px, 90vw" : "(min-width: 1536px) 1390px, 92vw"} className={cn("mx-auto h-auto w-full rounded-lg", device === "mobile" && "max-w-[390px]", device === "tablet" && "max-w-[834px]")} />
          </DialogContent>
        </Dialog>
        <figcaption className="flex min-h-24 flex-col justify-center gap-2 border-t border-border p-4 sm:min-h-20 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6" aria-live="polite" aria-atomic="true">
          <span className="shrink-0 text-sm font-medium">{capture.title}</span>
          <span className="max-w-lg text-sm leading-relaxed text-muted-foreground">{capture.caption}</span>
        </figcaption>
      </figure>
    </div>
  );
}
