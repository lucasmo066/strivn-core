"use client";

import { Children, useSyncExternalStore, type ReactNode } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { StripedPattern } from "@/components/ui/striped-pattern";
import styles from "./industries.module.css";

type IndustryOption = { slug: string; name: string };

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function getHash() {
  return window.location.hash.slice(1);
}

function getServerHash() {
  return "";
}

export function IndustryExplorer({ industries, children }: {
  industries: IndustryOption[];
  children: ReactNode;
}) {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const selected = industries.find((industry) => industry.slug === hash) ?? industries[0];
  const panels = Children.toArray(children);

  return (
    <div className={styles.explorer}>
      {/* Persistent targets keep homepage links and direct fragment URLs usable. */}
      {industries.map((industry) => (
        <span
          key={industry.slug}
          id={industry.slug}
          className={styles.anchor}
          role="group"
          aria-label={`${industry.name}: website approach`}
          aria-hidden={industry.slug !== selected.slug}
          tabIndex={-1}
        />
      ))}

      <div className={styles.mobilePicker}>
        <label htmlFor="industry-choice" className={styles.eyebrow}>Your industry</label>
        <div className={styles.selectWrap}>
          <select id="industry-choice" value={selected.slug} onChange={(event) => { window.location.hash = event.target.value; }}>
            {industries.map((industry) => <option key={industry.slug} value={industry.slug}>{industry.name}</option>)}
          </select>
          <ChevronDown size={18} aria-hidden="true" />
        </div>
      </div>

      <nav className={styles.industryNav} aria-label="Explore your industry">
        <p className={styles.eyebrow}>Find your business</p>
        {industries.map((industry, index) => (
          <a key={industry.slug} href={`#${industry.slug}`}
            aria-current={industry.slug === selected.slug ? "true" : undefined}
            data-revealed={industry.slug === selected.slug ? "true" : undefined}
            aria-controls={`panel-${industry.slug}`} className={styles.industryLink}>
            {industry.slug === selected.slug && <StripedPattern className="reveal-stripes opacity-0" />}
            <span className={styles.navNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span>{industry.name}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
        <p className={styles.navNote}>Don’t see your industry?<br /><a href="/book">Let’s talk about your business.</a></p>
      </nav>

      <div className={styles.panels}>
        {industries.map((industry, index) => (
          <div key={industry.slug} id={`panel-${industry.slug}`} hidden={industry.slug !== selected.slug} className={styles.panel}>
            {panels[index]}
          </div>
        ))}
      </div>
    </div>
  );
}
