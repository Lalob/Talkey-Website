export type ClimaxProduct = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  applications: string[];
  diagnostics: string[];
  keywords: string[];
  support: string;
};

export const climaxProducts: ClimaxProduct[] = [
  {
    slug: "agua-caliente-sanitaria-acs",
    name: "Agua Caliente Sanitaria (ACS)",
    category: "ACS",
    summary:
      "Equipos Climax orientados a producción y servicio de agua caliente sanitaria para viviendas, edificios y puntos de consumo que requieren temperatura estable.",
    applications: ["Duchas y baños", "Cocinas y lavaderos", "Vivienda colectiva", "Reposición técnica"],
    diagnostics: [
      "Modelo o foto de etiqueta",
      "Síntoma exacto y momento en que ocurre",
      "Puntos de agua afectados",
      "Código de error o estado visible",
    ],
    keywords: ["acs", "agua caliente", "sanitaria", "ducha", "temperatura", "caudal", "calentador", "termo"],
    support:
      "Para ACS se revisa modelo o foto de etiqueta, síntoma exacto, puntos de agua afectados y código de error si existe. No manipules gas, electricidad ni seguridad interna del equipo.",
  },
  {
    slug: "calefaccion",
    name: "Calefacción",
    category: "Confort térmico",
    summary:
      "Equipos Climax para calefacción y confort térmico, enfocados en entrega de calor, estabilidad de uso y soporte para diagnóstico técnico.",
    applications: ["Casas y departamentos", "Oficinas", "Retail pequeño", "Proyectos de reposición"],
    diagnostics: [
      "Demanda del termostato",
      "Alimentación y estado visible",
      "Zona o circuito afectado",
      "Código de error, presión o alerta",
    ],
    keywords: ["calefaccion", "calefacción", "calor", "radiador", "termostato", "frio", "frío", "no calienta"],
    support:
      "Para calefacción se revisa demanda del termostato, alimentación, presión o estado visible indicado por el equipo, zonas afectadas y código de error si existe. Si hay olor a gas, humo, chispas o fuga de agua, detén el uso y solicita soporte técnico autorizado.",
  },
];
