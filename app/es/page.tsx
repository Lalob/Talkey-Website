import type { Metadata } from "next";
import { CommercialHome } from "@/components/commercial-home";
import { getPageMetadata, localePaths } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = getPageMetadata("es", localePaths.es);

export default function SpanishHomePage() {
  return (
    <CommercialHome
      initialLocale="es"
      currentYear={new Date().getUTCFullYear()}
      detectClientLocale={false}
    />
  );
}
