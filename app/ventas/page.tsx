import type { Metadata } from "next";
import { CommercialHome } from "@/components/commercial-home";
import { absoluteUrl, seoKeywords } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: {
    absolute: "Talkey Ventas | Evaluación comercial",
  },
  description:
    "Conoce Talkey y solicita una evaluación comercial para implementar asistentes de IA en soporte técnico, postventa y operación.",
  keywords: [
    ...seoKeywords,
    "Talkey ventas",
    "evaluación comercial Talkey",
    "demo Talkey",
    "IA para ventas y soporte",
  ],
  alternates: {
    canonical: absoluteUrl("/ventas"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/ventas"),
    siteName: "Talkey",
    title: "Talkey Ventas | Evaluación comercial",
    description:
      "Conoce Talkey y solicita una evaluación comercial para implementar asistentes de IA en soporte técnico, postventa y operación.",
    locale: "es_CL",
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
    title: "Talkey Ventas | Evaluación comercial",
    description:
      "Conoce Talkey y solicita una evaluación comercial para implementar asistentes de IA en soporte técnico, postventa y operación.",
    images: ["/opengraph-image"],
  },
};

export default function VentasPage() {
  return <CommercialHome initialLocale="es" currentYear={new Date().getUTCFullYear()} detectClientLocale={false} />;
}
