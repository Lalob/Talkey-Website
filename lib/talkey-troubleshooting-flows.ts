export type SeverityLevel = "Baja" | "Media" | "Alta";

export type TroubleshootingQuestion = {
  text: string;
  options: string[];
};

export type TroubleshootingFlow = {
  id: "slow-response" | "incomplete-answers" | "bad-derivation" | "messy-knowledge";
  title: string;
  shortDescription: string;
  introMessage: string;
  questions: TroubleshootingQuestion[];
  diagnosisRules: string[];
  solutionRules: string[];
  severityRules: string[];
  derivationRules: string[];
};

export type TroubleshootingResult = {
  diagnosis: string;
  solution: string;
  severity: SeverityLevel;
  nextStep: string;
};

export const talkeyTroubleshootingFlows: TroubleshootingFlow[] = [
  {
    id: "slow-response",
    title: "El asistente no responde o tarda demasiado",
    shortDescription: "Simula un caso donde el asistente demora mucho o no entrega respuesta.",
    introMessage: "Vamos a revisar un caso simulado de lentitud o falta de respuesta.",
    questions: [
      {
        text: "¿El problema ocurre siempre o solo a veces?",
        options: ["Siempre", "Solo a veces", "No estoy seguro"],
      },
      {
        text: "¿Ocurre en un canal específico?",
        options: ["Web", "WhatsApp", "Email", "Voz telefónica", "No sé"],
      },
      {
        text: "¿La consulta incluye muchos datos, imágenes, documentos o una explicación larga?",
        options: ["Sí", "No", "A veces"],
      },
    ],
    diagnosisRules: [
      "Si ocurre siempre, puede existir un problema de configuración, disponibilidad o integración.",
      "Si ocurre solo en un canal, el origen probable está en ese canal.",
      "Si ocurre con consultas largas, conviene optimizar flujo, contexto o base de conocimiento.",
    ],
    solutionRules: [
      "Revisar canal afectado, tipo de consulta, tiempos de respuesta y reglas de fallback.",
      "Registrar el caso, identificar el patrón y derivar si la atención queda detenida.",
    ],
    severityRules: [
      "Baja si ocurre ocasionalmente.",
      "Media si afecta un canal específico.",
      "Alta si ocurre siempre o afecta clientes reales.",
    ],
    derivationRules: ["Derivar si afecta clientes reales, un canal productivo o disponibilidad del servicio."],
  },
  {
    id: "incomplete-answers",
    title: "Las respuestas son incompletas o poco precisas",
    shortDescription: "Simula un caso donde la información existe, pero la respuesta no es suficientemente útil.",
    introMessage: "Vamos a revisar un caso simulado donde el asistente responde, pero la respuesta no es suficientemente útil.",
    questions: [
      {
        text: "¿La información correcta existe en los manuales o documentos?",
        options: ["Sí", "No", "Parcialmente", "No estoy seguro"],
      },
      {
        text: "¿La respuesta incorrecta ocurre con un producto específico o con varios?",
        options: ["Un producto específico", "Varios productos", "No sé"],
      },
      {
        text: "¿El problema es falta de precisión, falta de pasos o información desactualizada?",
        options: ["Falta de precisión", "Faltan pasos", "Información desactualizada", "No sé"],
      },
    ],
    diagnosisRules: [
      "Si la información no existe, falta documentación.",
      "Si existe parcialmente, falta estructurar conocimiento.",
      "Si faltan pasos, se debe mejorar o crear troubleshooting.",
    ],
    solutionRules: [
      "Ordenar documentación, validar manuales, crear troubleshootings y definir respuestas esperadas.",
      "Priorizar productos frecuentes y respuestas donde un error pueda afectar seguridad o garantía.",
    ],
    severityRules: [
      "Baja si afecta una respuesta puntual.",
      "Media si afecta varios productos.",
      "Alta si puede inducir errores técnicos, garantía, seguridad o mala manipulación.",
    ],
    derivationRules: ["Derivar si la respuesta puede provocar riesgo técnico, garantía o seguridad."],
  },
  {
    id: "bad-derivation",
    title: "El asistente no sabe cuándo derivar a un humano",
    shortDescription: "Simula un caso donde Talkey debería derivar un caso complejo o sensible.",
    introMessage: "Vamos a revisar un caso simulado donde el asistente debería saber cuándo derivar a una persona.",
    questions: [
      {
        text: "¿El caso involucra riesgo, garantía, reclamo o cliente molesto?",
        options: ["Sí", "No", "No sé"],
      },
      {
        text: "¿Existe un protocolo claro de cuándo derivar a una persona?",
        options: ["Sí", "No", "Parcialmente"],
      },
      {
        text: "¿El asistente debería pedir más datos antes de derivar?",
        options: ["Sí", "No", "Depende"],
      },
    ],
    diagnosisRules: [
      "Si no hay protocolo, faltan reglas de derivación.",
      "Si hay riesgo, garantía o reclamo, se debe derivar con prioridad.",
      "Si falta información, Talkey debe pedir datos mínimos antes de derivar.",
    ],
    solutionRules: [
      "Definir cuándo resolver, cuándo pedir más datos y cuándo derivar a humano.",
      "Entregar al agente humano un resumen del caso, datos recogidos y motivo de derivación.",
    ],
    severityRules: [
      "Media por defecto.",
      "Alta si hay riesgo, garantía, reclamo, seguridad, cliente molesto o canal productivo.",
    ],
    derivationRules: ["Derivar si hay riesgo, garantía, reclamo, seguridad o cliente molesto."],
  },
  {
    id: "messy-knowledge",
    title: "La base de conocimiento está desordenada o incompleta",
    shortDescription: "Simula un caso donde los manuales, protocolos o troubleshootings no están bien preparados.",
    introMessage: "Vamos a revisar un caso simulado donde la información técnica existe, pero está desordenada o incompleta.",
    questions: [
      {
        text: "¿La empresa tiene manuales, fichas técnicas o documentos?",
        options: ["Sí", "No", "Algunos"],
      },
      {
        text: "¿Los documentos están actualizados?",
        options: ["Sí", "No", "No estoy seguro"],
      },
      {
        text: "¿Existen troubleshootings o procedimientos paso a paso?",
        options: ["Sí", "No", "Parcialmente"],
      },
    ],
    diagnosisRules: [
      "Si hay documentos pero no están ordenados, requiere limpieza documental.",
      "Si no están actualizados, requiere validación técnica.",
      "Si no hay troubleshootings, hay que construir flujos de diagnóstico.",
    ],
    solutionRules: [
      "Preparar la base de conocimiento antes o durante la implementación.",
      "Ordenar manuales, estructurar procedimientos y convertir conocimiento disperso en respuestas útiles.",
    ],
    severityRules: [
      "Baja si hay pocos documentos y productos.",
      "Media si hay muchos productos o documentación parcial.",
      "Alta si el soporte depende de información crítica, seguridad, garantía o productos técnicos complejos.",
    ],
    derivationRules: ["Derivar si la información crítica afecta seguridad, garantía o productos técnicos complejos."],
  },
];

function normalize(value: string) {
  return value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function includesAny(value: string, terms: string[]) {
  const normalized = normalize(value);
  return terms.some((term) => normalized.includes(normalize(term)));
}

export function findTroubleshootingFlow(message: string) {
  return talkeyTroubleshootingFlows.find((flow) => normalize(flow.title) === normalize(message));
}

export function inferTroubleshootingFlow(message: string) {
  if (includesAny(message, ["no responde", "tarda", "lento", "demora", "latencia", "clientes"])) return talkeyTroubleshootingFlows[0];
  if (includesAny(message, ["responde mal", "incompleta", "imprecisa", "faltan pasos", "desactualizada"])) return talkeyTroubleshootingFlows[1];
  if (includesAny(message, ["escalar", "derivar", "derivacion", "humano", "garantia", "reclamo", "cliente molesto", "riesgo"])) return talkeyTroubleshootingFlows[2];
  if (includesAny(message, ["manuales", "documentos", "base de conocimiento", "desordenada", "no tengo manuales", "troubleshooting"])) return talkeyTroubleshootingFlows[3];
  return undefined;
}

export function isHighRiskResponse(message: string) {
  return includesAny(message, [
    "clientes reales",
    "datos sensibles",
    "muchos usuarios",
    "canal productivo",
    "produccion",
    "seguridad",
    "garantia",
    "reclamo",
    "cliente molesto",
    "siempre",
    "voz telefonica",
  ]);
}

export function buildTroubleshootingResult(flow: TroubleshootingFlow, answers: string[]): TroubleshootingResult {
  const combined = answers.join(" ");
  const highRisk = isHighRiskResponse(combined);
  let diagnosis = "";
  let solution = "";
  let severity: SeverityLevel = "Media";
  let nextStep = "Seguir probando otro caso simulado o agendar una demo para revisar cómo se aplicaría en tu operación.";

  if (flow.id === "slow-response") {
    const always = includesAny(combined, ["siempre"]);
    const sometimes = includesAny(combined, ["solo a veces", "a veces"]);
    const channel = includesAny(combined, ["web", "whatsapp", "email", "voz telefonica"]);
    const longQuery = includesAny(combined, ["si", "muchos datos", "imagenes", "documentos", "explicacion larga"]);
    diagnosis = always
      ? "Posible problema de configuración, disponibilidad o integración que deja el flujo detenido."
      : channel
        ? "Posible problema específico del canal afectado."
        : longQuery
          ? "Posible necesidad de optimizar el flujo, la base de conocimiento o el manejo de contexto."
          : "Posible lentitud ocasional o falta de regla de fallback ante una consulta poco clara.";
    solution = "Revisar el canal afectado, tipo de consulta, tiempos de respuesta y reglas de fallback. En una implementación real, Talkey debería registrar el patrón y derivar si la atención queda detenida.";
    severity = always || highRisk ? "Alta" : channel ? "Media" : sometimes ? "Baja" : "Media";
  }

  if (flow.id === "incomplete-answers") {
    const missingDocs = includesAny(combined, ["no", "no estoy seguro"]);
    const partialDocs = includesAny(combined, ["parcialmente"]);
    const manyProducts = includesAny(combined, ["varios productos"]);
    const outdated = includesAny(combined, ["desactualizada"]);
    const missingSteps = includesAny(combined, ["faltan pasos"]);
    diagnosis = missingDocs
      ? "La información correcta probablemente no está disponible o no está validada en la documentación."
      : partialDocs
        ? "La información existe, pero falta estructurarla para que Talkey pueda convertirla en una respuesta útil."
        : manyProducts
          ? "El problema parece estar en el criterio general de respuesta para más de un producto."
          : missingSteps
            ? "Falta convertir la información técnica en un troubleshooting paso a paso."
            : outdated
              ? "La base de conocimiento requiere actualización y validación técnica."
              : "La respuesta necesita mayor precisión o mejor contexto para el caso consultado.";
    solution = "Ordenar documentación, validar manuales, crear troubleshootings y definir respuestas esperadas para casos frecuentes. Talkey funciona mejor cuando el conocimiento técnico está claro y validado.";
    severity = highRisk || outdated ? "Alta" : manyProducts || partialDocs || missingSteps ? "Media" : "Baja";
  }

  if (flow.id === "bad-derivation") {
    const noProtocol = includesAny(combined, ["no", "parcialmente"]);
    const risk = includesAny(combined, ["si", "riesgo", "garantia", "reclamo", "cliente molesto"]);
    diagnosis = noProtocol
      ? "Faltan reglas claras para decidir cuándo resolver, cuándo pedir más datos y cuándo derivar a una persona."
      : risk
        ? "El caso debería derivarse con prioridad por riesgo, garantía, reclamo o sensibilidad del cliente."
        : "El flujo necesita criterios más explícitos para decidir si corresponde resolver o derivar.";
    solution = "Definir reglas de derivación y pedir datos mínimos antes de derivar. Talkey debe entregar al agente humano un resumen del caso, datos recogidos y motivo de derivación.";
    severity = highRisk || risk || noProtocol ? "Alta" : "Media";
  }

  if (flow.id === "messy-knowledge") {
    const noDocs = includesAny(combined, ["no"]);
    const partial = includesAny(combined, ["algunos", "parcialmente", "no estoy seguro"]);
    const outdated = includesAny(combined, ["no", "no estoy seguro"]);
    diagnosis = noDocs
      ? "La base de conocimiento todavía no tiene suficiente material técnico para responder con calidad."
      : outdated
        ? "La documentación requiere validación técnica antes de usarse como fuente confiable."
        : partial
          ? "Existe información útil, pero está incompleta o dispersa."
          : "La base parece disponible, pero debe estructurarse para soportar diagnóstico paso a paso.";
    solution = "Preparar la base de conocimiento antes o durante la implementación. Talkey puede ayudar a ordenar manuales, estructurar procedimientos y convertir conocimiento disperso en respuestas útiles para soporte técnico.";
    severity = highRisk || noDocs ? "Alta" : partial || outdated ? "Media" : "Baja";
  }

  if (severity === "Alta") {
    nextStep = "Agendar una revisión con Talkey para entender el caso y definir criterios de derivación o preparación técnica.";
  }

  return { diagnosis, solution, severity, nextStep };
}
