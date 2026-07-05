"use client";

import { ArrowUpRight } from "lucide-react";
import type { MarketingCopy } from "@/lib/marketing-copy";
import { trackEvent } from "@/lib/analytics";

const SALES_EMAIL = "contact@talkeyco.com";
const BOOKING_URL = process.env.NEXT_PUBLIC_TALKEY_BOOKING_URL?.trim();
const ALLOWED_BOOKING_HOSTS = new Set(["calendar.app.google"]);

function getSafeBookingUrl(fallbackUrl: string) {
  if (!BOOKING_URL) return fallbackUrl;

  try {
    const url = new URL(BOOKING_URL);
    return url.protocol === "https:" && ALLOWED_BOOKING_HOSTS.has(url.hostname) ? url.toString() : fallbackUrl;
  } catch {
    return fallbackUrl;
  }
}

export function MarketingScheduler({ copy }: { copy: MarketingCopy["scheduler"] }) {
  const fallbackUrl = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(copy.details)}`;
  const bookingUrl = getSafeBookingUrl(fallbackUrl);

  return (
    <div className="mk-scheduler-shell">
      <div className="mk-booking-card">
        <h3>{copy.submit}</h3>
        <p>{copy.note}</p>
        <a className="mk-scheduler-submit mk-booking-button" href={bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("agenda_click", { source: "scheduler" })}>
          {copy.submit}<ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
}
