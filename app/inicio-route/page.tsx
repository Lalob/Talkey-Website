import { CommercialHome } from "@/components/commercial-home";
import { defaultSeoMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = defaultSeoMetadata;

export default function InicioRoutePage() {
  return <CommercialHome initialLocale="es" currentYear={new Date().getUTCFullYear()} />;
}
