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

export const rootSeo = {
  title: "Talkey Chile | IA para ventas y soporte técnico",
  description:
    "Talkey une CRM con IA, automatización de ventas y soporte técnico inteligente para calificar leads, guiar diagnósticos y mantener cada caso con contexto.",
};

export const seoByLocale: Record<MarketingLocale, SeoLocaleConfig> = {
  es: {
    title: "Software de soporte técnico con IA para empresas | Talkey",
    description:
      "Talkey convierte manuales e historial en soporte técnico con IA: respuestas consistentes, diagnóstico guiado y derivación con contexto para postventa.",
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

export const salesSeoKeywords = [
  "CRM con inteligencia artificial",
  "CRM con IA Chile",
  "automatización de ventas con IA",
  "agente IA para ventas",
  "asistente virtual de ventas",
  "seguimiento automático de leads",
  "calificación automática de leads",
  "lead scoring con IA",
  "pipeline de ventas automatizado",
  "CRM para WhatsApp con IA",
  "automatización de WhatsApp con IA",
  "software de seguimiento comercial",
  "IA para cotizaciones y seguimiento comercial",
  "automatización comercial Chile",
];

export const supportSeoKeywords = [
  "software de soporte técnico con IA",
  "asistente virtual de soporte técnico",
  "automatización de soporte técnico",
  "IA para soporte técnico",
  "IA para postventa",
  "software de postventa",
  "software de servicio técnico",
  "base de conocimiento con IA",
  "gestión de conocimiento técnico",
  "diagnóstico técnico guiado con IA",
  "chatbot de soporte técnico",
  "soporte técnico 24/7",
  "IA para soporte técnico de fabricantes y distribuidores",
  "asistente virtual para postventa Chile",
  "automatizar soporte técnico de productos",
  "IA para manuales y troubleshooting",
];

export const seoKeywords = [
  "Talkey",
  "plataforma IA para empresas",
  "plataforma IA para ventas y soporte técnico",
  ...salesSeoKeywords,
  ...supportSeoKeywords,
  "AI technical support assistant",
  "technical support automation",
  "AI customer support for technical products",
  "post-sale support AI",
];

export const localePaths: Record<MarketingLocale, string> = {
  es: "/soporte",
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
    "x-default": absoluteUrl(localePaths.es),
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
    keywords: supportSeoKeywords,
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
          alt: "Talkey - software de soporte técnico con inteligencia artificial",
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

export const defaultSeoMetadata: Metadata = {
  title: {
    absolute: rootSeo.title,
  },
  description: rootSeo.description,
  keywords: seoKeywords,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: "Talkey",
    title: rootSeo.title,
    description: rootSeo.description,
    locale: "es_CL",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Talkey - plataforma IA para ventas y soporte técnico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: rootSeo.title,
    description: rootSeo.description,
    images: ["/opengraph-image"],
  },
};
