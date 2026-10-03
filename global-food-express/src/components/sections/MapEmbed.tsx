"use client";
import { useEffect, useRef, useState } from "react";
import { mapEmbedUrl, type Store } from "@/config/locations";

/**
 * Lazy Google Maps embed with a dark treatment. The iframe only mounts once the
 * block scrolls near the viewport, so the third-party weight never hits first paint.
 */
export default function MapEmbed({ store, className = "" }: { store: Store; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[var(--radius)] border border-line bg-base-2 ${className}`} style={{ aspectRatio: "4 / 3" }}>
      {load ? (
        <iframe
          title={`Map of ${store.name}`}
          src={mapEmbedUrl(store)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen={false}
          className="absolute inset-0 h-full w-full border-0 [filter:invert(92%)_hue-rotate(160deg)_saturate(0.55)_brightness(0.9)_contrast(0.95)]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-cream-3">
          <span>Map loads as you scroll.</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--line),inset_0_0_80px_rgb(7_16_12/0.55)]" />
    </div>
  );
}
