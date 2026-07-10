import type { MetadataRoute } from "next";
import { absoluteUrl, languageAlternates, localePaths, supportedSeoLocales } from "@/lib/seo";

const lastModified = new Date("2026-07-02");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: languageAlternates(),
      },
    },
    ...supportedSeoLocales.map((locale) => ({
      url: absoluteUrl(localePaths[locale]),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: locale === "es" ? 0.95 : 0.85,
      alternates: {
        languages: languageAlternates(),
      },
    })),
    {
      url: absoluteUrl("/manuales"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/soporte"),
      lastModified: new Date("2026-07-10"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/ventas"),
      lastModified: new Date("2026-07-10"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/climax"),
      lastModified: new Date("2026-07-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/climax/productos"),
      lastModified: new Date("2026-07-10"),
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];
}
