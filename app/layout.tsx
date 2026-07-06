import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { absoluteUrl, defaultSeoMetadata, languageAlternates, seoByLocale, seoKeywords, siteUrl } from "@/lib/seo";
import "./globals.css";

const title = seoByLocale.es.title;
const description = seoByLocale.es.description;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Talkey",
  ...defaultSeoMetadata,
  title: {
    default: title,
    template: "%s | Talkey",
  },
  description,
  keywords: seoKeywords,
  authors: [{ name: "Talkey", url: siteUrl }],
  creator: "Talkey",
  publisher: "Talkey",
  category: "Software",
  alternates: {
    canonical: absoluteUrl("/"),
    languages: languageAlternates(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Talkey",
    title,
    description,
    locale: "es_CL",
    alternateLocale: ["en_US", "it_IT"],
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
    title,
    description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/brand/talkey-key.svg",
    shortcut: "/brand/talkey-key.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#070707",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Talkey",
      url: siteUrl,
      logo: `${siteUrl}/brand/talkey-key.svg`,
      email: "contact@talkeyco.com",
      foundingLocation: {
        "@type": "Country",
        name: "Chile",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "contact@talkeyco.com",
        availableLanguage: ["Spanish", "English", "Italian"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Talkey",
      url: siteUrl,
      inLanguage: ["es-CL", "en", "it"],
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Talkey",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "AI sales and technical support platform",
      operatingSystem: "Web",
      url: siteUrl,
      description,
      keywords: seoKeywords.join(", "),
      featureList: [
        "CRM de ventas con IA",
        "Asistente comercial para pipeline, scoring y seguimiento",
        "Asistente virtual para soporte técnico",
        "Diagnóstico guiado de problemas técnicos",
        "Base de conocimiento con manuales y procedimientos",
        "Derivación a especialistas humanos con contexto",
        "Consola de soporte, tickets e historial de clientes",
        "Talkey Editor para conocimiento, flujos y criterios",
        "Soporte por chat y opción de voz",
        "Reconocimiento de producto por foto de etiqueta, QR o número de serie",
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Gerentes de ventas, postventa, soporte técnico y operaciones",
      },
      availableLanguage: ["es", "en", "it"],
      offers: {
        "@type": "Offer",
        priceCurrency: "CLP",
        availability: "https://schema.org/InStock",
      },
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "Talkey AI sales and technical support platform",
      serviceType: "Plataforma IA para ventas y soporte técnico",
      url: siteUrl,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      audience: [
        {
          "@type": "Audience",
          audienceType: "Gerentes de soporte",
        },
        {
          "@type": "Audience",
          audienceType: "Gerentes de ventas, dueños de empresa, operaciones y postventa",
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Chile",
      },
      serviceOutput: [
        "Respuestas consistentes para soporte técnico",
        "Pipeline comercial, scoring y seguimiento",
        "Diagnósticos guiados",
        "Derivación a especialistas humanos con contexto",
        "Soporte técnico 24/7",
      ],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: siteUrl,
        availableLanguage: ["Spanish", "English", "Italian"],
      },
      description,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué hace Talkey?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Talkey transforma conocimiento técnico disperso en respuestas consistentes, diagnósticos guiados y derivación humana cuando corresponde.",
          },
        },
        {
          "@type": "Question",
          name: "¿Talkey reemplaza a un software de tickets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Talkey se enfoca en resolver problemas técnicos usando conocimiento estructurado; puede convivir con un software de tickets que ordena conversaciones, prioridades y estados.",
          },
        },
        {
          "@type": "Question",
          name: "¿Talkey sirve si la documentación técnica está incompleta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Talkey puede ayudar a estructurar manuales, procedimientos y troubleshootings durante la implementación.",
          },
        },
        {
          "@type": "Question",
          name: "¿Talkey reemplaza a mis agentes humanos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No necesariamente. Talkey ayuda a que los agentes humanos trabajen mejor, con menos carga repetitiva y más contexto para casos complejos.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="talkey-google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
        <script
          id="talkey-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
