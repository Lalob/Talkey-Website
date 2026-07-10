import type { Metadata } from "next";
import { CommercialHome } from "@/components/commercial-home";
import { getPageMetadata, localePaths } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = getPageMetadata("it", localePaths.it);

export default function ItalianHomePage() {
  return (
    <CommercialHome
      initialLocale="it"
      currentYear={new Date().getUTCFullYear()}
      detectClientLocale={false}
    />
  );
}
