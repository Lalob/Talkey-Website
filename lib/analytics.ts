type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-T8XPWZJ67G";
export const ANALYTICS_CONSENT_STORAGE_KEY = "talkey-analytics-consent";
export const ANALYTICS_PREFERENCES_EVENT = "talkey:cookie-preferences";

export type AnalyticsConsent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // Fall back to the first-party preference cookie below.
  }

  const cookieValue = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${ANALYTICS_CONSENT_STORAGE_KEY}=`))
    ?.split("=")[1];

  return cookieValue === "granted" || cookieValue === "denied" ? cookieValue : null;
}

export function saveAnalyticsConsent(value: AnalyticsConsent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
  } catch {
    // The first-party preference cookie below remains available as a fallback.
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ANALYTICS_CONSENT_STORAGE_KEY}=${value}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  if (getAnalyticsConsent() !== "granted" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}
