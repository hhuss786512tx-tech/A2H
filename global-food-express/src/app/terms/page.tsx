import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use | Global Food Express",
  description: "Terms for using the Global Food Express website, including pre-order requests, pricing and content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" crumbs={[{ name: "Terms", href: "/terms" }]} lines={["Terms of use"]} intro="Plain terms for a plain website." />
      <div className="container prose pb-24">
        <p>Last updated: October 3, 2026. {/* TODO_CLIENT: have a lawyer review before launch. */}</p>
        <h2>Pre-orders</h2>
        <p>A pre-order sent through this site is a request, not a confirmed sale. We confirm availability, weight and price by phone. Payment is made in store at pickup. Unclaimed orders may be returned to stock.</p>
        <h2>Prices and specials</h2>
        <p>Prices and weekly specials shown on this site are for information and may change without notice. The price on the shelf or at the counter is the final price. Specials are while supplies last.</p>
        <h2>Halal statements</h2>
        <p>Statements about zabiha halal sourcing describe our purchasing standard. If you need documentation for a specific product, ask at the counter and we will show you what we have.</p>
        <h2>Content</h2>
        <p>Text, photographs and design on this site belong to Global Food Express. Guides are general information, not medical or religious rulings.</p>
        <h2>Liability</h2>
        <p>The site is provided as is. We are not liable for indirect losses from its use. Nothing here limits rights you have under Texas or United States law.</p>
      </div>
    </>
  );
}
