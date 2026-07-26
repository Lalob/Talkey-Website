import type { MetadataRoute } from "next";
import { absoluteUrl, languageAlternates, localePaths } from "@/lib/seo";

const pageDates = {
  home: new Date("2026-07-23"),
  sales: new Date("2026-07-23"),
  support: new Date("2026-07-23"),
  manuals: new Date("2026-07-07"),
  translations: new Date("2026-07-07"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: pageDates.home,
    },
    {
      url: absoluteUrl("/ventas"),
      lastModified: pageDates.sales,
    },
    {
      url: absoluteUrl("/soporte"),
      lastModified: pageDates.support,
      alternates: {
        languages: languageAlternates(),
      },
    },
    {
      url: absoluteUrl(localePaths.en),
      lastModified: pageDates.translations,
      alternates: {
        languages: languageAlternates(),
      },
    },
    {
      url: absoluteUrl(localePaths.it),
      lastModified: pageDates.translations,
      alternates: {
        languages: languageAlternates(),
      },
    },
    {
      url: absoluteUrl("/manuales"),
      lastModified: pageDates.manuals,
    },
  ];
}
