"use client";

import { useEffect, useRef, useState } from "react";
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  ANALYTICS_PREFERENCES_EVENT,
  GA_MEASUREMENT_ID,
  getAnalyticsConsent,
  saveAnalyticsConsent,
  trackEvent,
  type AnalyticsConsent,
} from "@/lib/analytics";

const GOOGLE_TAG_SCRIPT_ID = "talkey-google-analytics-script";

function removeAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.talkeyco.com; SameSite=Lax`;
  }
}

function initializeGoogleAnalytics() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // Google requires the native arguments object in its standard gtag queue.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  if (document.getElementById(GOOGLE_TAG_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = GOOGLE_TAG_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function getClickSource(anchor: HTMLAnchorElement) {
  if (anchor.closest("header")) return "header";
  if (anchor.closest("footer")) return "footer";
  if (anchor.closest(".mk-chat-wrap")) return "demo";
  if (anchor.closest("[class*='pricing'], [id*='precios']")) return "pricing";
  if (anchor.closest(".mk-platform-hero, .mk-hero")) return "hero";
  return "content";
}

export function GoogleAnalytics() {
  const consentDialogRef = useRef<HTMLElement>(null);
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedConsent = getAnalyticsConsent();
    setConsent(savedConsent);
    setPreferencesOpen(savedConsent === null);
    setReady(true);

    if (savedConsent === "granted") {
      initializeGoogleAnalytics();
    }

    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    function trackConversionClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      const source = getClickSource(anchor);

      if (url.hostname === "calendar.app.google") {
        trackEvent("schedule_diagnostic_click", {
          source,
          page_path: window.location.pathname,
        });
        return;
      }

      if (url.origin === window.location.origin && ["/ventas", "/soporte"].includes(url.pathname)) {
        trackEvent("solution_page_click", {
          source,
          solution: url.pathname === "/ventas" ? "sales" : "support",
        });
        return;
      }

      if (url.origin === window.location.origin && url.hash === "#precios") {
        trackEvent("pricing_section_click", {
          source,
          page_path: window.location.pathname,
        });
      }
    }

    document.addEventListener("click", trackConversionClick, true);
    return () => document.removeEventListener("click", trackConversionClick, true);
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;

    function closePreferences() {
      if (consent === null) {
        saveAnalyticsConsent("denied");
        setConsent("denied");
        removeAnalyticsCookies();
      }
      setPreferencesOpen(false);
    }

    function closeOutsideDialog(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node) || consentDialogRef.current?.contains(target)) return;
      closePreferences();
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closePreferences();
    }

    document.addEventListener("pointerdown", closeOutsideDialog, true);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutsideDialog, true);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [consent, preferencesOpen]);

  function updateConsent(value: AnalyticsConsent) {
    saveAnalyticsConsent(value);
    setConsent(value);
    setPreferencesOpen(false);

    if (value === "granted") {
      initializeGoogleAnalytics();
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      return;
    }

    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    removeAnalyticsCookies();
  }

  if (!ready) return null;

  return (
    <>
      {preferencesOpen ? (
        <aside
          ref={consentDialogRef}
          className="mk-cookie-consent"
          role="dialog"
          aria-modal="false"
          aria-labelledby="mk-cookie-consent-title"
          aria-describedby="mk-cookie-consent-description"
        >
          <div>
            <strong id="mk-cookie-consent-title">Tu privacidad importa</strong>
            <p id="mk-cookie-consent-description">
              Usamos cookies necesarias para el sitio y, solo con tu permiso, analítica para entender
              visitas y mejorar la experiencia. No usamos estos datos para publicidad personalizada.
            </p>
          </div>
          <div className="mk-cookie-consent-actions">
            <button type="button" className="is-secondary" onClick={() => updateConsent("denied")}>
              Solo necesarias
            </button>
            <button type="button" className="is-primary" onClick={() => updateConsent("granted")}>
              Aceptar analítica
            </button>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          className="mk-cookie-settings"
          onClick={() => setPreferencesOpen(true)}
          aria-label="Cambiar preferencias de cookies"
        >
          Cookies
        </button>
      )}
      <span hidden data-analytics-consent={consent ?? "unset"} data-storage-key={ANALYTICS_CONSENT_STORAGE_KEY} />
    </>
  );
}
