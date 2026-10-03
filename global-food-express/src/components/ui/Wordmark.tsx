import Link from "next/link";

/** Refined typographic wordmark. No logo file exists in brand_assets, so type does the work. */
export default function Wordmark({ className = "", link = true }: { className?: string; link?: boolean }) {
  const inner = (
    <span className={`inline-flex items-baseline gap-[0.4em] whitespace-nowrap font-display leading-none tracking-[-0.03em] ${className}`}>
      <span className="text-[1.35em]">Global Food</span>{" "}
      <span className="italic-display text-[1.35em]">Express</span>
    </span>
  );
  return link ? (
    <Link href="/" className="inline-block">
      {inner}
    </Link>
  ) : (
    inner
  );
}
