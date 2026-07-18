import type { Metadata } from "next";
import { preload } from "react-dom";
import { ClimaxExperience } from "@/sites/climax/ClimaxExperience";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Climax | Clima al punto exacto",
  description:
    "Climax, marca del grupo Davaterm para climatización, confort térmico y control eficiente de espacios.",
  alternates: {
    canonical: "https://www.talkeyco.com/climax",
  },
  openGraph: {
    title: "Climax | Clima al punto exacto",
    description:
      "Sistemas térmicos para edificios, locales y hogares que necesitan frío, calor y control estable.",
    url: "https://www.talkeyco.com/climax",
    siteName: "Climax",
    images: [
      {
        url: "/climax/climax-thermal-system.jpg",
        width: 1717,
        height: 916,
        alt: "Render conceptual de equipos de climatización Climax",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
};

export default function ClimaxPage() {
  preload("/climax/climax-thermal-system.jpg", { as: "image" });
  return <ClimaxExperience />;
}
