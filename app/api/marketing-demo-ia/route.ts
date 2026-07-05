import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { marketingCopy } from "@/lib/marketing-copy";
import { talkeyTroubleshootingFlows } from "@/lib/talkey-troubleshooting-flows";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-5.5";
const DEFAULT_CF_MODEL = "@cf/openai/gpt-oss-20b";

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

  if (!message) return NextResponse.json({ error: "Falta el mensaje." }, { status: 400 });
  const copy = marketingCopy.es.chat;
  const knowledge = {
    product: "Talkey",
    positioning: "Sistema de soporte técnico con IA para transformar manuales, procedimientos y experiencia técnica en respuestas trazables, diagnósticos guiados y derivación humana cuando corresponde.",
    responses: copy.responses,
    troubleshootingFlows: talkeyTroubleshootingFlows.map((flow) => ({
      title: flow.title,
      shortDescription: flow.shortDescription,
      derivationRules: flow.derivationRules
    }))
  };

  const instructions = [
    "Eres el demo IA comercial de Talkey en el sitio web.",
    "Responde en español, con tono claro, directo y comercialmente útil.",
    "Usa solo el conocimiento entregado. No inventes precios, integraciones cerradas, garantías ni compromisos técnicos no indicados.",
    "Explica Talkey como un sistema para soporte técnico basado en conocimiento aprobado, trazabilidad y derivación humana.",
    "Si la pregunta requiere evaluación comercial, invita a agendar una revisión o usar el simulador de precios, sin prometer montos exactos.",
    "Mantén respuestas breves: 1 a 3 párrafos o bullets cortos."
  ].join("\n");

  const input = [
    "Pregunta del visitante: " + message,
    "",
    "Historial reciente:",
    history,
    "",
    "Conocimiento del sitio:",
    JSON.stringify(knowledge).slice(0, 18000),
    "",
    "Respuesta local de respaldo:",
    localReply
  ].join("\n");

  const workersAiEnv = await getWorkersAiEnv();
  const workersAiResult = await runWorkersAi(workersAiEnv, instructions, input).catch(() => null);
  if (workersAiResult) return NextResponse.json(workersAiResult);

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

  const reply = extractOutputText(payload);
  if (!reply) return NextResponse.json({ error: "La IA no devolvió texto." }, { status: 502 });

  return NextResponse.json({ reply, model: payload.model || model, provider: "openai-responses" });
}
