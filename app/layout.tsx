import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/google-analytics";
import { defaultSeoMetadata, rootSeo, seoKeywords, siteUrl } from "@/lib/seo";
import "./globals.css";

const title = rootSeo.title;
const description = rootSeo.description;

const scrollRevealScript = String.raw`
(() => {
  const rootSelector = ".mk-sales-page, .mk-support-page";
  const groups = [
    {
      direction: "left",
      selectors: [
        ".mk-sales-hero-copy",
        ".mk-sales-page .mk-section-heading",
        ".mk-sales-flow-section > .mk-container > .mk-section-label",
        ".mk-sales-flow-section > .mk-container > h2",
        ".mk-sales-flow-note",
        ".mk-sales-editor-grid > div:first-child",
        ".mk-sales-final-card > div:first-child",
        ".mk-support-page .mk-hero-copy",
        ".mk-support-page .mk-section-heading",
        ".mk-support-page .mk-contact-copy"
      ]
    },
    {
      direction: "right",
      selectors: [
        ".mk-sales-page .mk-package-grid article:nth-child(1)",
        ".mk-support-page .mk-support-package-pricing .mk-package-grid article:nth-child(1)"
      ]
    },
    {
      direction: "left",
      selectors: [
        ".mk-sales-page .mk-package-grid article:nth-child(3)",
        ".mk-support-page .mk-support-package-pricing .mk-package-grid article:nth-child(3)"
      ]
    },
    {
      direction: "up",
      selectors: [
        ".mk-sales-hero-aside",
        ".mk-sales-problem-table",
        ".mk-sales-page .mk-sales-list-toggle",
        ".mk-sales-flow",
        ".mk-sales-editor-card",
        ".mk-sales-page .mk-comparison-showcase",
        ".mk-sales-page .mk-package-grid article:nth-child(2)",
        ".mk-sales-final-card > .mk-diagnosis-cta",
        ".mk-support-page .mk-hero-visual",
        ".mk-support-page .mk-problem-pairs",
        ".mk-support-page .mk-list-toggle",
        ".mk-support-page .mk-manager-grid",
        ".mk-support-page .mk-comparison-showcase",
        ".mk-support-page .mk-privacy-grid",
        ".mk-support-page .mk-privacy-data-note",
        ".mk-support-page .mk-integration-grid",
        ".mk-support-page .mk-faq-grid",
        ".mk-support-page .mk-support-package-pricing .mk-package-grid article:nth-child(2)",
        ".mk-support-page .mk-contact-grid > :not(.mk-contact-copy)"
      ]
    }
  ];

  let observer;
  let mutationObserver;
  let initialized = false;
  const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealImmediately(element) {
    element.classList.add("is-visible");
  }

  function markElement(element, direction) {
    if (!(element instanceof HTMLElement)) return;
    if (element.dataset.mkRevealReady === "true") return;
    if (element.closest(".mk-header, .mk-footer")) return;

    element.dataset.mkReveal = direction;
    element.dataset.mkRevealReady = "true";
    element.classList.add("mk-scroll-reveal");

    if (reduceMotion() || !observer) {
      revealImmediately(element);
      return;
    }

    observer.observe(element);
  }

  function scan() {
    document.querySelectorAll(rootSelector).forEach((root) => {
      groups.forEach(({ direction, selectors }) => {
        root.querySelectorAll(selectors.join(",")).forEach((element) => markElement(element, direction));
      });
    });
  }

  function init() {
    if (initialized) {
      scan();
      return;
    }
    initialized = true;

    if ("IntersectionObserver" in window && !reduceMotion()) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -10% 0px" });
    }

    scan();

    mutationObserver = new MutationObserver(() => scan());
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  window.addEventListener("pageshow", scan);
})();
`;

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


const frontendCopyProtectionScript = String.raw`
(() => {
  function isEditableTarget(target) {
    return Boolean(target?.closest?.("input, textarea, select, [contenteditable='true'], [data-allow-copy]"));
  }

  function blockWhenProtected(event) {
    if (!document.body.classList.contains("copy-protected")) return;
    if (!isEditableTarget(event.target)) event.preventDefault();
  }

  document.body.classList.add("copy-protected");
  document.addEventListener("contextmenu", blockWhenProtected);
  document.addEventListener("copy", blockWhenProtected);
  document.addEventListener("cut", blockWhenProtected);
  document.addEventListener("dragstart", blockWhenProtected);
  document.addEventListener("selectstart", blockWhenProtected);
  document.addEventListener("keydown", (event) => {
    if (!document.body.classList.contains("copy-protected")) return;
    if (isEditableTarget(event.target)) return;
    const key = event.key.toLowerCase();
    if ((event.metaKey || event.ctrlKey) && ["a", "c", "p", "s", "u", "x"].includes(key)) event.preventDefault();
  });
})();
`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Talkey",
      alternateName: "Talkey Chile",
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
        "@type": "AggregateOffer",
        priceCurrency: "CLP",
        lowPrice: 590000,
        highPrice: 2900000,
        offerCount: 3,
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
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="copy-protected" suppressHydrationWarning>
        <GoogleAnalytics />
        <script
          id="talkey-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <Script id="talkey-scroll-reveal" strategy="afterInteractive">
          {scrollRevealScript}
        </Script>
        <Script id="talkey-copy-protection" strategy="afterInteractive">
          {frontendCopyProtectionScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
