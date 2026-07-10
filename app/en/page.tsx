import type { Metadata } from "next";
import { CommercialHome } from "@/components/commercial-home";
import { getPageMetadata, localePaths } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = getPageMetadata("en", localePaths.en);

export default function EnglishHomePage() {
  return (
    <CommercialHome
      initialLocale="en"
      currentYear={new Date().getUTCFullYear()}
      detectClientLocale={false}
    />
  );
}
