import Script from "next/script";
import { SITE } from "@/config/site";

/** GA4 loader. Renders nothing until NEXT_PUBLIC_GA_ID is set. */
export default function Analytics() {
  if (!SITE.gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
