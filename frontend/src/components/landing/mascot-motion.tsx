"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function MascotMotion({
  children,
  pauseLabel,
  resumeLabel,
}: {
  children: ReactNode;
  pauseLabel: string;
  resumeLabel: string;
}) {
  const [paused, setPaused] = useState(false);
  // Without JavaScript the illustration stays still; the pause control appears with motion.
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const label = paused ? resumeLabel : pauseLabel;

  return (
    <div
      className="hero-art mascot-motion"
      data-motion={ready ? "running" : "idle"}
      data-paused={paused}
    >
      {children}
      {ready && (
        <button
          type="button"
          className="mascot-motion-toggle"
          aria-label={label}
          title={label}
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
            <Play size={16} aria-hidden="true" />
          ) : (
            <Pause size={16} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
