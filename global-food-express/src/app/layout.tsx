import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, frauncesItalic, interTight } from "./fonts";
import { SITE } from "@/config/site";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import MobileBar from "@/components/layout/MobileBar";
import Analytics from "@/components/layout/Analytics";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import JsonLd from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Halal Grocery Rosenberg & Sugar Land TX`, template: `%s | ${SITE.name}` },
  description: SITE.tagline,
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#07100C",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${frauncesItalic.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <div className="grain" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}
