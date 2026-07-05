import { CommercialHome } from "@/components/commercial-home";

export const dynamic = "force-static";

export default function HomePage() {
  return <CommercialHome initialLocale="es" currentYear={new Date().getUTCFullYear()} />;
}
