import type { Metadata } from "next";
import { SalesPage } from "@/components/platform-site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Suite Ventas",
  description:
    "Talkey Suite Ventas convierte conversaciones en pipeline, scoring, cotizaciones, seguimiento y handoff hacia soporte técnico.",
};

export default function VentasPage() {
  return <SalesPage />;
}
