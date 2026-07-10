import type { Metadata } from "next";
import { CommercialHome } from "@/components/commercial-home";
import { absoluteUrl, seoKeywords } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Talkey Soporte | Asistente técnico con IA",
  },
  description:
    "Página de soporte Talkey para probar una experiencia de asistencia técnica con IA, diagnóstico guiado y derivación con contexto.",
  keywords: [
    ...seoKeywords,
    "Talkey soporte",
    "soporte técnico Talkey",
    "asistente soporte Talkey",
    "demo soporte técnico IA",
  ],
  alternates: {
    canonical: absoluteUrl("/soporte"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/soporte"),
    siteName: "Talkey",
    title: "Talkey Soporte | Asistente técnico con IA",
    description:
      "Prueba una experiencia de asistencia técnica con IA, diagnóstico guiado y derivación con contexto.",
    locale: "es_CL",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Talkey - soporte técnico con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talkey Soporte | Asistente técnico con IA",
    description:
      "Prueba una experiencia de asistencia técnica con IA, diagnóstico guiado y derivación con contexto.",
    images: ["/opengraph-image"],
  },
};

export default function SoportePage() {
  return <CommercialHome initialLocale="es" currentYear={new Date().getUTCFullYear()} detectClientLocale={false} aiDemo />;
}
