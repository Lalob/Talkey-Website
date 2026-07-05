import { CommercialHome } from "@/components/commercial-home";

export const dynamic = "force-dynamic";

export default function TalkeyIaPage() {
  return <CommercialHome initialLocale="es" currentYear={new Date().getUTCFullYear()} aiDemo />;
}
