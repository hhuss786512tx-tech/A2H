import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import { SITE } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Global Food Express",
  description: "How Global Food Express handles the information you share through this website: pre-order forms, analytics and WhatsApp links.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" crumbs={[{ name: "Privacy", href: "/privacy" }]} lines={["Privacy policy"]} intro="Short, because we collect very little." />
      <div className="container prose pb-24">
        <p>Last updated: October 3, 2026. {/* TODO_CLIENT: have a lawyer review before launch. */}</p>
        <h2>What we collect</h2>
        <p>When you send a pre-order or a message through this site we receive the name, phone number, optional email, store choice and message you type. It is emailed to the store so we can call you back. We do not store it in a database on this website.</p>
        <h2>Analytics</h2>
        <p>We use Google Analytics 4 to count visits and to see which buttons (call, directions, WhatsApp, forms) are used, with IP anonymization enabled. No advertising cookies are set by this site. You can block analytics with a browser extension or by enabling “Do Not Track”.</p>
        <h2>Third parties</h2>
        <p>Maps are embedded from Google Maps and load only when you scroll to them. WhatsApp links open WhatsApp, which has its own privacy policy. Phone links use your device&rsquo;s dialer.</p>
        <h2>Children</h2>
        <p>This site is not directed at children under 13 and we do not knowingly collect their information.</p>
        <h2>Contact</h2>
        <p>Questions about this policy: {SITE.email ?? "call either store (numbers in the footer)"}.</p>
      </div>
    </>
  );
}
