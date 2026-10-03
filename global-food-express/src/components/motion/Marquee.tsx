interface Props {
  items: string[];
  reverse?: boolean;
  speed?: number; // seconds per loop
  className?: string;
  separator?: string;
}

/** CSS-driven marquee; duplicated track for a seamless loop. Stops under reduced motion. */
export default function Marquee({ items, reverse, speed = 40, className = "", separator = "·" }: Props) {
  const track = [...items, ...items];
  return (
    <div className={`marquee ${className}`} data-reverse={reverse ? "true" : "false"} style={{ ["--marquee-dur" as string]: `${speed}s` }} aria-hidden="true">
      <div className="marquee-track">
        {track.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            <span>{t}</span>
            <span className="text-saffron/70">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
