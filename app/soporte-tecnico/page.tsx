import { CommercialHome } from "@/components/commercial-home";
import { absoluteUrl, getPageMetadata, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = getPageMetadata("es", "/soporte");

const supportFaq = [
  {
    question: "¿Cuánto demora una implementación?",
    answer:
      "Depende del volumen de productos, documentos, canales y validación técnica. Lo correcto es revisarlo en una evaluación.",
  },
  {
    question: "¿Cuánto cuesta Talkey?",
    answer:
      "El precio depende del volumen, canales, documentación, integraciones y nivel de acompañamiento requerido. Talkey ofrece paquetes referenciales que luego se ajustan en una evaluación.",
  },
  {
    question: "¿Talkey ayuda también al equipo interno?",
    answer:
      "Sí. Además de asistir al cliente, Talkey puede actuar como copiloto operativo para agentes: resume tickets, sugiere prioridad, responsable, próximos pasos y respuestas iniciales.",
  },
];

const supportStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${absoluteUrl("/soporte")}#service`,
      name: "Talkey Soporte Técnico",
      serviceType: "Software de soporte técnico con inteligencia artificial",
      url: absoluteUrl("/soporte"),
      description:
        "Asistente virtual para soporte técnico y postventa que usa manuales, procedimientos e historial para guiar diagnósticos y derivar casos con contexto.",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: {
        "@type": "Country",
        name: "Chile",
      },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Gerentes de soporte, postventa y operaciones técnicas",
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
      "@id": `${absoluteUrl("/soporte")}#software`,
      name: "Talkey Soporte Técnico",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Software de soporte técnico con IA",
      operatingSystem: "Web",
      url: absoluteUrl("/soporte"),
      description:
        "Automatización de soporte técnico con base de conocimiento, diagnóstico guiado, ticket inteligente e historial por cliente.",
      featureList: [
        "Asistente virtual de soporte técnico",
        "Base de conocimiento con IA",
        "Diagnóstico técnico guiado",
        "Identificación de producto por foto de etiqueta, QR o número de serie",
        "Resumen, prioridad y respuesta sugerida para tickets",
        "Derivación a especialistas humanos con contexto",
        "Soporte por chat, imágenes y opción de voz",
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
      "@type": "FAQPage",
      mainEntity: supportFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
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
          name: "Talkey Soporte Técnico",
          item: absoluteUrl("/soporte"),
        },
      ],
    },
  ],
};

export default function SoporteTecnicoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(supportStructuredData).replace(/</g, "\\u003c") }}
      />
      <CommercialHome
        initialLocale="es"
        currentYear={new Date().getUTCFullYear()}
        detectClientLocale={false}
        aiDemo
        platformHomeHref="/"
      />
    </>
  );
}
