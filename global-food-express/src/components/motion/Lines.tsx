import type { CSSProperties, ReactNode } from "react";

const idx = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

/** Wraps each line in a mask so CSS can rise it in. Lines are explicit to keep CLS at zero. */
export function Lines({ lines, className }: { lines: ReactNode[]; className?: string }) {
  return (
    <>
      {lines.map((l, i) => (
        <span className={`mask-line ${className ?? ""}`} key={i} style={idx(i)}>
          <span>{l}</span>
        </span>
      ))}
    </>
  );
}

/** Word-level mask for the hero headline. */
export function Words({ text, accent }: { text: string; accent?: string[] }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span className="mask-line !inline-block align-top mr-[0.22em]" key={i} style={idx(i)}>
          <span>{accent?.includes(w) ? <em className="accent">{w}</em> : w}</span>
        </span>
      ))}
    </>
  );
}
