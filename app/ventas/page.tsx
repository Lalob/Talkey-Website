import type { Metadata } from "next";
import { SalesPage } from "@/components/platform-site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Solución para ventas",
  description:
    "La solución para ventas de Talkey convierte conversaciones en pipeline, scoring, cotizaciones, seguimiento y handoff hacia soporte técnico.",
};

export default function VentasPage() {
  return <SalesPage />;
}
