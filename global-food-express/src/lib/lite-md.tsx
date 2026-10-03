import Link from "next/link";
import type { ReactNode } from "react";

function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = key;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={i++}>{m[1]}</strong>);
    else if (m[2]) {
      const href = m[3];
      out.push(href.startsWith("/") ? <Link key={i++} href={href}>{m[2]}</Link> : <a key={i++} href={href} rel="noopener">{m[2]}</a>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Renders the lite-markdown used by blog posts and long-form pages. */
export function renderLite(body: string): ReactNode[] {
  const blocks = body.trim().split(/\n\s*\n/);
  return blocks.map((b, i) => {
    const lines = b.split("\n");
    if (b.startsWith("## ")) return <h2 key={i}>{inline(b.slice(3))}</h2>;
    if (b.startsWith("### ")) return <h3 key={i}>{inline(b.slice(4))}</h3>;
    if (b.startsWith("> ")) return <p key={i} className="answer">{inline(b.slice(2))}</p>;
    if (lines.every((l) => l.startsWith("- ")))
      return (
        <ul key={i}>
          {lines.map((l, j) => (
            <li key={j}>{inline(l.slice(2))}</li>
          ))}
        </ul>
      );
    return <p key={i}>{inline(b)}</p>;
  });
}

export const wordCount = (s: string) => s.replace(/[#*>\-\[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
