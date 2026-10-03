import JsonLd from "./JsonLd";
import { faqSchema } from "@/lib/schema";
import type { FAQ as FAQItem } from "@/config/products";

/** Accessible disclosure list with FAQPage schema (TODO answers are excluded from schema). */
export default function FAQ({ items, title = "Questions people ask", eyebrow = "FAQ" }: { items: FAQItem[]; title?: string; eyebrow?: string }) {
  return (
    <section aria-labelledby="faq-title" className="section-tight">
      <JsonLd data={faqSchema(items)} />
      <div className="container grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="faq-title" className="mt-4 text-[length:var(--step-3)]">{title}</h2>
        </div>
        <div className="table-rows">
          {items.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[length:var(--step-1)] font-display leading-tight tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span aria-hidden="true" className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-base transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-[60ch] text-cream-2">{f.a.replace(/\s*TODO_CLIENT:.*$/, "")}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
