"use client";
import { useEffect, useState } from "react";
import type { WeekHours } from "@/config/hours";
import { openState, type OpenState } from "@/lib/hours";

/** Live badge: Open now / Closes at X / Opens at Y. "Hours not published" when the config is empty. */
export default function OpenNow({ hours, className = "" }: { hours: WeekHours | null; className?: string }) {
  const [state, setState] = useState<OpenState>(() => (hours ? { kind: "unknown" } : { kind: "unknown" }));
  useEffect(() => {
    if (!hours) return;
    const tick = () => setState(openState(hours));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [hours]);

  if (!hours) {
    return (
      <span className={`inline-flex items-center gap-2 text-sm text-cream-3 ${className}`}>
        <span className="dot-live dot-unknown" aria-hidden="true" /> Hours: call to confirm
      </span>
    );
  }
  if (state.kind === "unknown") {
    return (
      <span className={`inline-flex items-center gap-2 text-sm text-cream-3 ${className}`}>
        <span className="dot-live dot-unknown" aria-hidden="true" /> Checking hours
      </span>
    );
  }
  if (state.kind === "open") {
    return (
      <span className={`inline-flex items-center gap-2 text-sm ${className}`} role="status">
        <span className="dot-live" aria-hidden="true" />
        <span className="font-semibold text-pistachio">Open now</span>
        <span className="text-cream-2">· {state.closingSoon ? "Closing soon, " : ""}closes {state.closesAt}</span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`} role="status">
      <span className="dot-live dot-closed" aria-hidden="true" />
      <span className="font-semibold text-cream">Closed</span>
      <span className="text-cream-2">· {state.opensLabel}</span>
    </span>
  );
}
