"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

import type { WorkProject } from "@/lib/constants";

import { ProjectMedia } from "./project-media";
import styles from "./work-carousel.module.css";

type Direction = "previous" | "next" | "first" | "last";

function slidePositions(track: HTMLDivElement) {
  const max = Math.max(0, track.scrollWidth - track.clientWidth);
  const left = track.getBoundingClientRect().left;
  const inset = parseFloat(getComputedStyle(track).paddingLeft);

  return Array.from(track.children, (slide) =>
    Math.min(
      max,
      Math.max(0, slide.getBoundingClientRect().left - left + track.scrollLeft - inset)
    )
  );
}

export function WorkCarousel({
  projects,
  children,
}: {
  projects: readonly WorkProject[];
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [bounds, setBounds] = useState({ start: true, end: projects.length < 2 });
  const [announcement, setAnnouncement] = useState("");

  const updateBounds = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const start = track.scrollLeft <= 2;
    const end = track.scrollWidth - track.clientWidth - track.scrollLeft <= 2;
    setBounds((previous) =>
      previous.start === start && previous.end === end ? previous : { start, end }
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateBounds);
    observer.observe(track);
    Array.from(track.children).forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [projects.length, updateBounds]);

  function move(direction: Direction) {
    const track = trackRef.current;
    if (!track) return;
    const positions = slidePositions(track);
    let index = -1;

    if (direction === "first") index = 0;
    else if (direction === "last") index = positions.length - 1;
    else if (direction === "next") {
      index = positions.findIndex((position) => position > track.scrollLeft + 2);
    } else {
      for (let i = positions.length - 1; i >= 0; i--) {
        if (positions[i] < track.scrollLeft - 2) {
          index = i;
          break;
        }
      }
    }

    if (index < 0 || !projects[index]) return;
    track.scrollTo({ left: positions[index], behavior: reduceMotion ? "instant" : "smooth" });
    setAnnouncement(`${projects[index].title}. Project ${index + 1} of ${projects.length}.`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const directions: Record<string, Direction> = {
      ArrowLeft: "previous",
      ArrowRight: "next",
      Home: "first",
      End: "last",
    };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    move(direction);
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-labelledby="work-heading">
      <div className={styles.toolbar}>
        <div>{children}</div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label="Previous project"
            aria-controls="work-track"
            aria-disabled={bounds.start}
            onClick={() => !bounds.start && move("previous")}
          >
            <ArrowLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Next project"
            aria-controls="work-track"
            aria-disabled={bounds.end}
            onClick={() => !bounds.end && move("next")}
          >
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <p id="work-instructions" className="sr-only">
        Swipe to browse projects, use the previous and next buttons, or focus this
        gallery and use the arrow keys. Home goes to the first project and End to the last.
      </p>
      <div
        id="work-track"
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        role="group"
        aria-label="Portfolio projects"
        aria-describedby="work-instructions"
        onScroll={updateBounds}
        onKeyDown={handleKeyDown}
      >
        {projects.map((project, index) => {
          const content = (
            <>
              <ProjectMedia title={project.title} media={project.media} />
              <div className={styles.details}>
                {project.media?.isDemo && (
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Aceternity demo image
                  </p>
                )}
                <div className={styles.metadata}>
                  <p>
                    {project.category}{project.location ? ` / ${project.location}` : ""}
                  </p>
                  <span className={project.status === "Live" ? styles.live : styles.planned}>
                    {project.status}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl">{project.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <p className={styles.destination}>
                  {project.href ? (
                    <>View case study <ArrowUpRight className="size-4" aria-hidden /></>
                  ) : "Preview to come"}
                </p>
              </div>
            </>
          );

          return (
            <article
              key={project.id}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${project.title}, ${index + 1} of ${projects.length}`}
            >
              {project.href ? (
                <Link
                  href={project.href}
                  className={styles.cardLink}
                  aria-label={`View ${project.title} case study`}
                >
                  {content}
                </Link>
              ) : <div className={styles.card}>{content}</div>}
            </article>
          );
        })}
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
    </div>
  );
}
