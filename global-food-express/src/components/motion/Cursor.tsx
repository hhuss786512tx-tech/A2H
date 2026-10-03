"use client";
import { useRef, useState } from "react";
import { isFinePointer, useMotion } from "@/lib/motion";

const LABELS: Record<string, string> = { view: "View", call: "Call", directions: "Go", whatsapp: "Chat", drag: "Drag" };

/** Context-aware custom cursor. Reads `data-cursor` from the hovered element or its ancestors. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState("default");
  useMotion(
    ({ gsap }) => {
      const el = ref.current;
      if (!el) return;
      document.documentElement.classList.add("has-cursor");
      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "expo.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "expo.out" });
      const onMove = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const onOver = (e: PointerEvent) => {
        const t = e.target as HTMLElement;
        const tagged = t.closest<HTMLElement>("[data-cursor]");
        if (tagged) return setState(tagged.dataset.cursor || "default");
        if (t.closest("a, button, [role=button], input, textarea, select, label")) return setState("link");
        setState("default");
      };
      const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
      const onEnter = () => gsap.to(el, { opacity: 1, duration: 0.2 });
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.documentElement.addEventListener("pointerenter", onEnter);
      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        document.documentElement.removeEventListener("pointerenter", onEnter);
      };
    },
    [],
    isFinePointer(),
  );
  return (
    <div ref={ref} className="cursor" data-state={state} aria-hidden="true">
      <span className="cursor-label">{LABELS[state] ?? ""}</span>
    </div>
  );
}
