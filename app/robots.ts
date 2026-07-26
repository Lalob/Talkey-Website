import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/centro",
        "/agentesoportebio",
        "/soportebio",
        "/ventasbio",
        "/agenteventasbio",
        "/asistentebio",
        "/adminbio",
        "/manualesbiohertz",
        "/agentesoportetalkey",
        "/soportetalkey",
        "/ventastalkey",
        "/agenteventastalkey",
        "/asistentetalkey",
        "/admintalkey",
        "/manualestalkey",
      ],
    },
    sitemap: "https://www.talkeyco.com/sitemap.xml",
    host: "www.talkeyco.com",
  };
}
