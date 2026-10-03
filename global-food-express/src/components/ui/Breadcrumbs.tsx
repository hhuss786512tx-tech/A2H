import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={`text-sm text-cream-3 ${className}`}>
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-cream-2">{c.name}</span>
              ) : (
                <Link href={c.href} className="link-underline hover:text-cream">{c.name}</Link>
              )}
              {!last && <span aria-hidden="true" className="text-cream-3/60">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
