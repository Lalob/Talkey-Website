import type { Metadata } from "next";
import { CommercialHome } from "@/components/commercial-home";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Solución para soporte",
  description:
    "La solución para soporte de Talkey combina asistente, consola humana, tickets, historial, KB, diagnóstico guiado y métricas de postventa.",
};

export default function SoporteTecnicoPage() {
  return (
    <CommercialHome
      initialLocale="es"
      currentYear={new Date().getUTCFullYear()}
      detectClientLocale={false}
      aiDemo
      platformHomeHref="/"
    />
  );
}
