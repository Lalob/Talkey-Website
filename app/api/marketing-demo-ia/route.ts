import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { marketingCopy } from "@/lib/marketing-copy";
import { talkeyTroubleshootingFlows } from "@/lib/talkey-troubleshooting-flows";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-5.5";
const DEFAULT_CF_MODEL = "@cf/openai/gpt-oss-20b";
const forbiddenDemoIntroPhrases = [
  "Puedo explicarte qué problema resuelve Talkey, cómo se diferencia de otras herramientas, cómo se implementa o mostrarte un caso simulado de soporte técnico. ¿Qué quieres saber?",
  "Hola, soy Talkey. Puedo explicarte qué problema resuelve Talkey, cómo se diferencia de otras herramientas, cómo se implementa o mostrarte un caso simulado de soporte técnico. ¿Qué quieres saber?",
  "Puedo mostrarte cómo califico leads, priorizo oportunidades, preparo próximos pasos, coordino reuniones y conecto ventas con soporte técnico. ¿Qué quieres probar?",
  "Hola, soy Talkey Ventas. Puedo mostrarte cómo califico leads, priorizo oportunidades, preparo próximos pasos, coordino reuniones y conecto ventas con soporte técnico. ¿Qué quieres probar?",
];

type WorkersAiBinding = {
  run: (model: string, input: unknown) => Promise<{ response?: string }>;
};

type WorkersAiEnv = {
  AI?: WorkersAiBinding;
  CF_AI_MODEL?: string;
};

type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
  model?: string;
  error?: { message?: string };
};

function extractCloudflareAiText(result: unknown) {
  if (typeof result === "string") return result.trim();
  if (!result || typeof result !== "object") return "";
  const payload = result as {
    response?: unknown;
    output_text?: unknown;
    text?: unknown;
    result?: { response?: unknown };
    choices?: Array<{ message?: { content?: unknown }; text?: unknown }>;
    output?: Array<{ content?: Array<{ text?: unknown; content?: unknown }> }>;
  };
  if (typeof payload.response === "string") return payload.response.trim();
  if (typeof payload.output_text === "string") return payload.output_text.trim();
  if (typeof payload.text === "string") return payload.text.trim();
  if (typeof payload.result?.response === "string") return payload.result.response.trim();
  if (typeof payload.choices?.[0]?.message?.content === "string") return payload.choices[0].message.content.trim();
  if (typeof payload.choices?.[0]?.text === "string") return payload.choices[0].text.trim();
  return (payload.output || [])
    .flatMap((item) => item.content || [])
    .map((part) => String(part.text || part.content || ""))
    .join("\n")
    .trim();
}

function trimText(value: unknown, maxLength: number) {
  return String(value || "").slice(0, maxLength);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripForbiddenDemoIntro(text: string) {
  let sanitized = text;

  for (const phrase of forbiddenDemoIntroPhrases) {
    const flexiblePhrase = phrase.trim().split(/\s+/).map(escapeRegExp).join("\\s+");
    sanitized = sanitized.replace(new RegExp(flexiblePhrase, "gi"), "");
  }

  sanitized = sanitized
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/(^|\n)\s*[.,;:!?]\s*/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return sanitized || "Para responderte bien, necesito un poco más de contexto sobre lo que quieres revisar.";
}

function extractOutputText(payload: OpenAIResponsePayload) {
  if (typeof payload.output_text === "string") return payload.output_text.trim();
  return (payload.output || [])
    .flatMap((item) => item.content || [])
    .filter((part) => part.type === "output_text")
    .map((part) => part.text || "")
    .join("\n")
    .trim();
}

async function getWorkersAiEnv() {
  try {
    const context = await getCloudflareContext({ async: true });
    return context.env as WorkersAiEnv;
  } catch {
    return {} as WorkersAiEnv;
  }
}

async function runWorkersAi(env: WorkersAiEnv, instructions: string, input: string) {
  if (!env.AI) return null;
  const model = env.CF_AI_MODEL || DEFAULT_CF_MODEL;
  const result = await env.AI.run(model, {
    messages: [
      { role: "system", content: instructions },
      { role: "user", content: input }
    ],
    temperature: 0.2,
    max_tokens: 650
  });
  const reply = extractCloudflareAiText(result);
  return reply ? { reply, model, provider: "cloudflare-workers-ai" } : null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = trimText(body.message, 1600);
  const localReply = trimText(body.localReply, 2500);
  const history = trimText(JSON.stringify(body.history || []), 4000);
  const variant = body.variant === "sales" ? "sales" : "support";

  if (!message) return NextResponse.json({ error: "Falta el mensaje." }, { status: 400 });
  const copy = marketingCopy.es.chat;
  const supportKnowledge = {
    product: "Talkey Soporte",
    positioning: "Sistema de soporte técnico con IA para transformar manuales, procedimientos y experiencia técnica en respuestas trazables, diagnósticos guiados y derivación humana cuando corresponde.",
    capabilities: [
      "responder desde conocimiento técnico aprobado",
      "guiar diagnósticos paso a paso",
      "usar historial por cliente cuando está disponible",
      "identificar productos por foto de etiqueta, QR o número de serie",
      "resumir tickets y sugerir prioridad, responsable, ETA y respuesta inicial",
      "derivar a un especialista humano con contexto cuando corresponde"
    ],
    responses: copy.responses,
    troubleshootingFlows: talkeyTroubleshootingFlows.map((flow) => ({
      title: flow.title,
      shortDescription: flow.shortDescription,
      derivationRules: flow.derivationRules
    }))
  };
  const salesKnowledge = {
    product: "Talkey Ventas",
    positioning: "Suite de ventas con IA para convertir conversaciones entrantes en oportunidades priorizadas, seguimiento comercial y próximos pasos claros.",
    capabilities: [
      "calificar leads según intención, urgencia, fit, presupuesto y potencial",
      "crear y ordenar oportunidades en pipeline",
      "detectar leads repetidos o recurrentes",
      "preparar próximos pasos comerciales",
      "sugerir correos de seguimiento, agenda, llamada, cotización o propuesta",
      "detectar riesgo por falta de seguimiento",
      "integrarse con CRM o usar el CRM de Talkey",
      "coordinar reuniones con Google Calendar u otro sistema de agendamiento",
      "pasar contexto hacia Talkey Soporte cuando una venta requiere instalación, garantía o postventa"
    ],
    nextStepLogic: [
      "lee la intención de la conversación",
      "identifica etapa comercial y datos faltantes",
      "evalúa urgencia, riesgo y prioridad",
      "propone una acción concreta y responsable sugerido",
      "deja el contexto listo en el pipeline para que el ejecutivo avance"
    ]
  };
  const knowledge = variant === "sales" ? salesKnowledge : supportKnowledge;

  const instructions = variant === "sales"
    ? [
        "Eres el demo IA de Talkey Ventas en el sitio web.",
        "Responde en español, con tono claro, directo, sobrio y comercialmente útil.",
        "Contesta la pregunta concreta primero. No repitas el mensaje de bienvenida ni una lista genérica de temas.",
        "Nunca escribas esta frase ni una variación literal: 'Puedo mostrarte cómo califico leads, priorizo oportunidades, preparo próximos pasos, coordino reuniones y conecto ventas con soporte técnico. ¿Qué quieres probar?'",
        "Si la respuesta local de respaldo suena como menú o fallback, úsala solo como contexto y no la copies.",
        "Explica Talkey Ventas como una suite para convertir conversaciones en pipeline, prioridad, seguimiento, próximos pasos y continuidad con soporte.",
        "No inventes precios, integraciones cerradas, garantías ni compromisos técnicos no indicados.",
        "Cuando corresponda, termina con una invitación sobria a solicitar una evaluación para verlo aplicado a la operación del visitante.",
        "Mantén respuestas breves: 1 a 3 párrafos o bullets cortos."
      ].join("\n")
    : [
        "Eres el demo IA de Talkey Soporte en el sitio web.",
        "Responde en español, con tono claro, directo, sobrio y útil para gerentes de soporte, postventa y operaciones.",
        "Contesta la pregunta concreta primero. No repitas el mensaje de bienvenida ni una lista genérica de temas.",
        "Nunca escribas esta frase ni una variación literal: 'Puedo explicarte qué problema resuelve Talkey, cómo se diferencia de otras herramientas, cómo se implementa o mostrarte un caso simulado de soporte técnico. ¿Qué quieres saber?'",
        "Si la respuesta local de respaldo suena como menú o fallback, úsala solo como contexto y no la copies.",
        "Explica Talkey Soporte como un sistema basado en conocimiento aprobado, trazabilidad, diagnóstico guiado, copiloto para agentes humanos y derivación con contexto.",
        "No inventes precios, integraciones cerradas, garantías ni compromisos técnicos no indicados.",
        "Si la pregunta requiere evaluación comercial o técnica, invita a solicitar una evaluación sin prometer montos exactos.",
        "Mantén respuestas breves: 1 a 3 párrafos o bullets cortos."
      ].join("\n");

  const input = [
    "Pregunta del visitante: " + message,
    "",
    "Historial reciente:",
    history,
    "",
    "Variante del demo:",
    variant,
    "",
    "Conocimiento del sitio:",
    JSON.stringify(knowledge).slice(0, 18000),
    "",
    "Respuesta local de respaldo:",
    localReply
  ].join("\n");

  const workersAiEnv = await getWorkersAiEnv();
  const workersAiResult = await runWorkersAi(workersAiEnv, instructions, input).catch(() => null);
  if (workersAiResult) {
    return NextResponse.json({ ...workersAiResult, reply: stripForbiddenDemoIntro(workersAiResult.reply) });
  }

  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY no configurada." }, { status: 503 });

  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions,
      input,
      max_output_tokens: 650,
      store: false
    })
  });

  const payload = await response.json().catch(() => ({} as OpenAIResponsePayload)) as OpenAIResponsePayload;
  if (!response.ok) {
    return NextResponse.json({ error: payload.error?.message || "No se pudo generar la respuesta IA." }, { status: response.status });
  }

  const reply = stripForbiddenDemoIntro(extractOutputText(payload));
  if (!reply) return NextResponse.json({ error: "La IA no devolvió texto." }, { status: 502 });

  return NextResponse.json({ reply, model: payload.model || model, provider: "openai-responses" });
}
