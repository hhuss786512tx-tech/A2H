/** GA4 event helpers. No-ops when NEXT_PUBLIC_GA_ID is unset. */
export type GfeEvent = "phone_click" | "directions_click" | "whatsapp_click" | "form_submit" | "preorder_submit";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: GfeEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[ga4]", event, params);
  }
}
