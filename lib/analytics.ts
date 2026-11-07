// Tracks taps on the contact buttons (WhatsApp / call / email).
// These taps are the site's only conversions, so they feed both:
//  - GA4 directly via gtag (event "contact_click"), visible in GA without any GTM setup
//  - GTM via dataLayer (event "contact_click"), for a Google Ads conversion tag

export type ContactMethod = "whatsapp" | "call" | "email";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function trackContactClick(params: {
  method: ContactMethod;
  placement: string; // e.g. "hero", "footer", "sticky"
  city?: string; // set on /[city] pages
  lang: string;
}) {
  if (typeof window === "undefined") return;

  const data = {
    contact_method: params.method,
    contact_placement: params.placement,
    page_city: params.city ?? "odisha",
    page_lang: params.lang,
  };

  try {
    window.gtag?.("event", "contact_click", { ...data, transport_type: "beacon" });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "contact_click", ...data });
  } catch {
    // Analytics must never break the button.
  }
}
