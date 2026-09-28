"use client";

import styles from "./pricing.module.css";

type PlanSelectorProps = {
  kind: "build" | "care";
  label: string;
  names: readonly string[];
  selected: string;
  onChange: (name: string) => void;
};

/** Mobile plan selection; larger screens show the complete comparison. */
export function PlanSelector({ kind, label, names, selected, onChange }: PlanSelectorProps) {
  return (
    <div className={styles.planSelector} data-kind={kind} role="group" aria-label={label}>
      {names.map((name) => (
        <button
          key={name}
          type="button"
          aria-pressed={selected === name}
          aria-controls={kind + "-plan-" + name.toLowerCase()}
          onClick={() => onChange(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
