"use client";

import Image from "next/image";
import { Expand } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { ProjectCapture } from "@/lib/sahara";

interface ProjectGalleryProps {
  captures: readonly ProjectCapture[];
}

export function ProjectGallery({ captures }: ProjectGalleryProps) {
  if (!captures.length) return null;
  return (
    <section className="border-t border-border py-16 sm:py-24" aria-labelledby="project-screens">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <h2 id="project-screens" className="font-display text-[var(--text-h2)]">A closer look.</h2>
        <p className="text-sm text-muted-foreground">Select a page to explore the full design.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {captures.map((capture, index) => (
          <figure key={capture.src} className={index === 0 ? "md:col-span-2" : undefined}>
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-muted text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange" aria-label={`View ${capture.title} full size`}>
                  <Image src={capture.src} alt={capture.alt} width={capture.width} height={capture.height} sizes={index === 0 ? "(min-width: 1280px) 1152px, 90vw" : "(min-width: 768px) 45vw, 90vw"} className="h-full w-full object-cover object-top transition-opacity group-hover:opacity-90" />
                  <span className="absolute right-4 bottom-4 rounded-full border border-border bg-background p-3"><Expand className="size-4" aria-hidden /></span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-5xl">
                <DialogTitle className="pr-10">{capture.title}</DialogTitle>
                <DialogDescription>{capture.caption}</DialogDescription>
                <Image src={capture.src} alt={capture.alt} width={capture.width} height={capture.height} sizes="90vw" className="h-auto w-full rounded-lg" />
              </DialogContent>
            </Dialog>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-medium">{capture.title}</span>
              <span className="text-sm text-muted-foreground">{capture.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
