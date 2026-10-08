import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Compact adaptation of Aceternity's free Macbook Scroll device construction.
// Source and usage terms: docs/device-mockups.md. Decorative keyboard only.
const keyboardRows = [
  ["esc", "☼", "☀", "▦", "⌕", "◉", "☾", "◀", "▶", "▶", "◁", "▷", "◉"],
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "−", "=", "⌫"],
  ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "return"],
  ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "shift"],
  ["fn", "⌃", "⌥", "⌘", "space", "⌘", "⌥", "◀", "▲", "▼", "▶"],
];

export function Macbook({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("device-macbook", className)}>
      <div className="device-macbook-body">
        <div className="device-macbook-lid">
          <div className="device-macbook-camera" aria-hidden="true" />
          <div className="device-macbook-screen">{children}</div>
        </div>
        <div className="device-macbook-deck" aria-hidden="true">
          <div className="device-macbook-speaker device-macbook-speaker-left" />
          <div className="device-macbook-keys">
            {keyboardRows.map((row, index) => (
              <div className="device-macbook-key-row" key={index}>
                {row.map((key, column) => <span key={column} className={cn(key === "space" && "device-macbook-space", key.length > 2 && key !== "space" && "device-macbook-wide-key")}>{key === "space" ? "" : key}</span>)}
              </div>
            ))}
          </div>
          <div className="device-macbook-speaker device-macbook-speaker-right" />
          <div className="device-macbook-trackpad" />
          <div className="device-macbook-notch" />
        </div>
      </div>
    </div>
  );
}
