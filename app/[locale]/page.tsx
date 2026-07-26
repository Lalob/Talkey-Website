import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialHome } from "@/components/commercial-home";
import { getPageMetadata, localePaths, supportedSeoLocales } from "@/lib/seo";
import type { MarketingLocale } from "@/lib/marketing-copy";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

function isMarketingLocale(locale: string): locale is MarketingLocale {
  return supportedSeoLocales.includes(locale as MarketingLocale);
}

export function generateStaticParams() {
  return supportedSeoLocales
    .filter((locale) => locale !== "es")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isMarketingLocale(locale)) return {};

  return getPageMetadata(locale, localePaths[locale]);
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isMarketingLocale(locale)) notFound();

  return (
    <CommercialHome
      initialLocale={locale}
      currentYear={new Date().getUTCFullYear()}
      detectClientLocale={false}
    />
  );
}
