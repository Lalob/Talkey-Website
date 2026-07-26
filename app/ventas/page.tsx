import type { Metadata } from "next";
import { SalesPage } from "@/components/platform-site";
import { absoluteUrl, salesSeoKeywords, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "CRM con IA y automatización de ventas",
  description:
    "Talkey convierte conversaciones en oportunidades: califica leads, prioriza el pipeline y guía el seguimiento comercial con próximos pasos automatizados.",
  keywords: salesSeoKeywords,
  alternates: {
    canonical: absoluteUrl("/ventas"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/ventas"),
    siteName: "Talkey",
    title: "Talkey Ventas | CRM con IA y automatización comercial",
    description:
      "Califica leads, prioriza oportunidades y guía a cada vendedor con próximos pasos automatizados sin perder el contexto después del cierre.",
    locale: "es_CL",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Talkey Ventas - CRM con inteligencia artificial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talkey Ventas | CRM con IA",
    description:
      "Califica leads, prioriza oportunidades y automatiza el seguimiento comercial con próximos pasos claros.",
    images: ["/opengraph-image"],
  },
};

const salesStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${absoluteUrl("/ventas")}#service`,
      name: "Talkey Ventas",
      serviceType: "CRM con inteligencia artificial y automatización de ventas",
      url: absoluteUrl("/ventas"),
      description:
        "CRM con IA para calificar leads, priorizar oportunidades, automatizar seguimiento y guiar a los vendedores con próximos pasos.",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: {
        "@type": "Country",
        name: "Chile",
      },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Gerentes de ventas, dueños de empresa y equipos comerciales",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "CLP",
        lowPrice: 590000,
        highPrice: 2900000,
        offerCount: 3,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${absoluteUrl("/ventas")}#software`,
      name: "Talkey Ventas",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "CRM con inteligencia artificial",
      operatingSystem: "Web",
      url: absoluteUrl("/ventas"),
      description:
        "Automatización comercial para calificación de leads, scoring, pipeline, seguimiento y continuidad entre ventas y soporte.",
      featureList: [
        "Calificación automática de leads",
        "Lead scoring por intención, urgencia y fit",
        "Pipeline de ventas automatizado",
        "Seguimiento comercial y próximos pasos",
        "Detección de leads duplicados",
        "Integración con CRM y WhatsApp",
        "Continuidad entre ventas, postventa y soporte técnico",
      ],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "CLP",
        lowPrice: 590000,
        highPrice: 2900000,
        offerCount: 3,
      },
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Talkey Ventas",
          item: absoluteUrl("/ventas"),
        },
      ],
    },
  ],
};

export default function VentasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(salesStructuredData).replace(/</g, "\\u003c") }}
      />
      <SalesPage />
    </>
  );
}
