import type { Metadata } from "next";
import type { MarketingLocale } from "@/lib/marketing-copy";

export const siteUrl = "https://www.talkeyco.com";
export const supportedSeoLocales = ["es", "en", "it"] as const satisfies readonly MarketingLocale[];

type SeoLocaleConfig = {
  title: string;
  description: string;
  openGraphLocale: string;
  languageName: string;
};

export const seoByLocale: Record<MarketingLocale, SeoLocaleConfig> = {
  es: {
    title: "Talkey | Asistente virtual de soporte técnico con IA",
    description:
      "Talkey es un asistente virtual de soporte técnico con IA para postventa. Resuelve hasta el 75% de casos frecuentes, atiende 24/7, guía diagnósticos y deriva a especialistas humanos con contexto.",
    openGraphLocale: "es_CL",
    languageName: "Spanish",
  },
  en: {
    title: "Talkey | AI technical support assistant for post-sale teams",
    description:
      "Talkey is an AI technical support assistant for post-sale teams. It resolves frequent cases, guides diagnostics, supports 24/7 service and hands off to human specialists with context.",
    openGraphLocale: "en_US",
    languageName: "English",
  },
  it: {
    title: "Talkey | Assistente virtuale IA per supporto tecnico",
    description:
      "Talkey è un assistente virtuale IA per il supporto tecnico postvendita. Risolve casi frequenti, guida diagnosi, supporta il servizio 24/7 e passa i casi agli specialisti umani con contesto.",
    openGraphLocale: "it_IT",
    languageName: "Italian",
  },
};

export const seoKeywords = [
  "Talkey",
  "asistente virtual soporte técnico",
  "asistente virtual postventa",
  "asistente virtual servicio técnico",
  "asistente virtual para postventa Chile",
  "IA para soporte técnico",
  "soporte técnico con inteligencia artificial",
  "agente de soporte técnico IA",
  "automatización soporte técnico",
  "automatización postventa",
  "diagnóstico técnico remoto",
  "software postventa",
  "software servicio técnico",
  "soporte técnico 24/7",
  "base de conocimiento soporte técnico",
  "software soporte técnico IA",
  "chatbot soporte técnico",
  "soporte técnico climatización",
  "soporte técnico electrodomesticos",
  "soporte técnico minería",
  "soporte técnico equipos médicos",
  "AI technical support assistant",
  "technical support automation",
  "AI customer support for technical products",
  "post-sale support AI",
];

export const localePaths: Record<MarketingLocale, string> = {
  es: "/es",
  en: "/en",
  it: "/it",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function languageAlternates() {
  return {
    "es-CL": absoluteUrl(localePaths.es),
    es: absoluteUrl(localePaths.es),
    en: absoluteUrl(localePaths.en),
    it: absoluteUrl(localePaths.it),
    "x-default": absoluteUrl("/"),
  };
}

export function getPageMetadata(locale: MarketingLocale, path = localePaths[locale]): Metadata {
  const seo = seoByLocale[locale];
  const alternateLocales = supportedSeoLocales
    .filter((item) => item !== locale)
    .map((item) => seoByLocale[item].openGraphLocale);

  return {
    title: {
      absolute: seo.title,
    },
    description: seo.description,
    keywords: seoKeywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      siteName: "Talkey",
      title: seo.title,
      description: seo.description,
      locale: seo.openGraphLocale,
      alternateLocale: alternateLocales,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Talkey - asistente virtual de soporte técnico para postventa",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/opengraph-image"],
    },
  };
}

export const defaultSeoMetadata = getPageMetadata("es", "/");
