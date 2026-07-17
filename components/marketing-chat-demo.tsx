"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowUp, ArrowUpRight, MessageCircleMore, Minus } from "lucide-react";
import { talkeyBookingUrl } from "@/lib/booking";
import type { MarketingCopy } from "@/lib/marketing-copy";
import { trackEvent } from "@/lib/analytics";
import {
  buildTroubleshootingResult,
  findTroubleshootingFlow,
  inferTroubleshootingFlow,
  talkeyTroubleshootingFlows,
  type TroubleshootingFlow,
} from "@/lib/talkey-troubleshooting-flows";

type DemoMode = "idle" | "choosingFlow" | "inFlow" | "completedFlow";

type DemoAction = {
  label: string;
  href?: string;
  prompt?: string;
};

type DemoMessage = {
  id: string;
  sender: "assistant" | "visitor";
  text: string;
  danger?: boolean;
  actions?: DemoAction[];
};

type AssistantReply = Omit<DemoMessage, "id" | "sender">;

type ReplyPlan = {
  replies: AssistantReply[];
  mode?: DemoMode;
  activeFlowId?: TroubleshootingFlow["id"] | null;
  answers?: string[];
  questionIndex?: number;
  implementationAsked?: boolean;
};

const supportEvaluationAction: DemoAction = {
  label: "Agendar diagnóstico de 30 min",
  href: talkeyBookingUrl,
};

const forbiddenDemoIntroPhrases = [
  "Puedo explicarte qué problema resuelve Talkey, cómo se diferencia de otras herramientas, cómo se implementa o mostrarte un caso simulado de soporte técnico. ¿Qué quieres saber?",
  "Hola, soy Talkey. Puedo explicarte qué problema resuelve Talkey, cómo se diferencia de otras herramientas, cómo se implementa o mostrarte un caso simulado de soporte técnico. ¿Qué quieres saber?",
  "Puedo mostrarte cómo califico leads, priorizo oportunidades, preparo próximos pasos, coordino reuniones y conecto ventas con soporte técnico. ¿Qué quieres probar?",
  "Puedo mostrarte cómo califico leads, priorizo oportunidades, preparo próximos pasos, coordino reuniones y conecto ventas con soporte técnico. ¿Qué quieres saber?",
  "Hola, soy Talkey Ventas. Puedo mostrarte cómo califico leads, priorizo oportunidades, preparo próximos pasos, coordino reuniones y conecto ventas con soporte técnico. ¿Qué quieres saber?",
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeCommand(value: string) {
  return value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function boundedPromptOptions(options: string[]) {
  return options.length > 0 && options.length <= 3 ? options : [];
}

function cleanCalendarSnippet(value: string | undefined, fallback = "") {
  const snippet = value?.replace(/\s+/g, " ").trim() || fallback;
  return snippet.length > 64 ? `${snippet.slice(0, 61).trim()}...` : snippet;
}

function buildTalkeyCalendarTitle(messages: DemoMessage[], variant: "support" | "sales") {
  const visitorMessages = messages.filter((message) => message.sender === "visitor" && message.text.trim());
  const latestMessage = visitorMessages[visitorMessages.length - 1]?.text;
  const topic = cleanCalendarSnippet(latestMessage, "diagnóstico de 30 min");
  const prefix = variant === "sales" ? "Talkey Ventas" : "Talkey Soporte";
  return `${prefix}: ${topic}`;
}

function buildTalkeyCalendarDetails(messages: DemoMessage[], variant: "support" | "sales") {
  const visitorMessages = messages
    .filter((message) => message.sender === "visitor" && message.text.trim())
    .slice(-5)
    .map((message, index) => `${index + 1}. ${message.text.trim()}`);

  return [
    `Solicitud generada desde el demo de ${variant === "sales" ? "Talkey Ventas" : "Talkey Soporte"}.`,
    "",
    "Información entregada por el usuario:",
    visitorMessages.length > 0 ? visitorMessages.join("\n") : "Por definir durante la reunión.",
    "",
    "Fecha y hora: completar directamente en Google Calendar.",
  ].join("\n");
}

function buildTalkeyCalendarUrl(messages: DemoMessage[], variant: "support" | "sales") {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: buildTalkeyCalendarTitle(messages, variant),
    details: buildTalkeyCalendarDetails(messages, variant),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function stripForbiddenDemoIntro(text: string) {
  let sanitized = text;

  for (const phrase of forbiddenDemoIntroPhrases) {
    const flexiblePhrase = phrase.trim().split(/\s+/).map(escapeRegExp).join("\\s+");
    sanitized = sanitized.replace(new RegExp(flexiblePhrase, "gi"), "");
  }

  sanitized = sanitized
    .replace(/\*\*/g, "")
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/(^|\n)\s*[.,;:!?]\s*/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return sanitized || "Puedo orientarte con lo esencial y, si quieres verlo aplicado a tu operación, puedes solicitar una evaluación.";
}

const householdAppliancePattern =
  /(calef[oó]n|calefont|termo|caldera|estufa|calefactor|aire acondicionado|split|refrigerador|nevera|congelador|freezer|lavadora|secadora|lavavajillas|lavaplatos|horno|microondas|cocina|encimera|campana|extractor|aspiradora|televisor|tv|router|wifi|impresora|notebook|computador|pc|monitor|cafetera|hervidor|batidora|licuadora|tostadora|freidora|ventilador|purificador|aparato|electrodom[eé]stico|equipo)/i;

const householdSymptomPattern =
  /(no enciende|no prende|no funciona|no responde|no enfr[ií]a|no calienta|no carga|no centrifuga|no lava|no seca|no congela|gotea|pierde agua|pierde gas|huele a gas|hace ruido|vibra|se apaga|se reinicia|marca error|c[oó]digo|falla|problema|bloqueado|atascado|sale humo|chispa|quemado|baja presi[oó]n|sin se[nñ]al|lento|no conecta|no imprime)/i;

function looksLikeHouseholdApplianceIssue(message: string) {
  const normalized = normalizeCommand(message);
  if (/(talkey|precio|costo|implement|integr|zendesk|intercom|elevenlabs|chatgpt|vambe|crm|software|empresa|soporte tecnico de mi empresa)/i.test(normalized)) return false;
  return householdAppliancePattern.test(message) || (
    householdSymptomPattern.test(message) &&
    /(^|\b)(mi|el|la|un|una|este|esta|aparato|equipo|electrodomestico|electrodom[eé]stico)(\b|$)/i.test(message)
  );
}

function extractApplianceName(message: string) {
  const explicitMatch = message.match(householdAppliancePattern);
  if (explicitMatch?.[0]) return explicitMatch[0].toLocaleLowerCase();

  const genericMatch = message.match(/\b(?:mi|el|la|un|una|este|esta)\s+([a-záéíóúñ][a-záéíóúñ\s-]{2,36}?)(?:\s+(?:no|est[aá]|tiene|hace|gotea|pierde|marca|enciende|funciona|prende)|[,.]|$)/i);
  return genericMatch?.[1]?.trim().toLocaleLowerCase() || "aparato";
}

function buildHouseholdAppliancePlan(message: string): ReplyPlan {
  const appliance = extractApplianceName(message);
  const risky = /(olor a gas|huele a gas|gas|humo|chispa|chispas|quemado|incendio|fuga|agua.*electric|electricidad.*agua|descarga|corto circuito|cortocircuito|sobrecalienta|muy caliente)/i.test(message);

  if (risky) {
    return {
      replies: [{
        danger: true,
        text: `Trabajemos con el ${appliance}. Primero va seguridad: si hay olor a gas, humo, chispas, fuga de agua cerca de electricidad, olor a quemado o calentamiento anormal, no sigas manipulándolo. Apágalo, desconéctalo si es seguro hacerlo, corta el suministro correspondiente y contacta a un técnico autorizado.\n\nSi no hay riesgo inmediato, dime modelo o envía una foto de la etiqueta/QR/número de serie y describe el síntoma exacto. Con eso puedo guiar el siguiente paso de diagnóstico.`,
      }],
      mode: "idle",
    };
  }

  return {
    replies: [{
      text: `Perfecto, trabajemos con el ${appliance}. Como demo, Talkey partiría levantando contexto y seguridad antes de recomendar una acción.\n\n1. Confirma si hay código de error, luz parpadeando, ruido, olor, fuga o cambio reciente.\n2. Si puedes, identifica el modelo con una foto de la etiqueta, QR o número de serie.\n3. Revisa lo básico sin abrir el equipo: alimentación eléctrica, enchufe, interruptor, configuración/modo, filtros visibles, ventilación y bloqueos externos.\n\nAhora dime qué síntoma exacto ves y desde cuándo ocurre. Con eso sigo el diagnóstico paso a paso y, si aparece riesgo o baja certeza, lo derivaría con contexto a un técnico.`,
    }],
    mode: "idle",
  };
}

export function MarketingChatDemo({ copy, aiMode = false, variant = "support" }: { copy: MarketingCopy["chat"]; aiMode?: boolean; variant?: "support" | "sales" }) {
  const [messages, setMessages] = useState<DemoMessage[]>([
    { id: "welcome", sender: "assistant", text: copy.welcome },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<DemoMode>("idle");
  const [activeFlowId, setActiveFlowId] = useState<TroubleshootingFlow["id"] | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [implementationAsked, setImplementationAsked] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dockOpen, setDockOpen] = useState(false);
  const [nearPricing, setNearPricing] = useState(false);
  const [persistentAvailable, setPersistentAvailable] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);
  const dockConversationRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageIdRef = useRef<string | null>(null);

  useEffect(() => {
    setMessages([{ id: "welcome", sender: "assistant", text: copy.welcome }]);
    setInput("");
    setTyping(false);
    setMode("idle");
    setActiveFlowId(null);
    setAnswers([]);
    setQuestionIndex(0);
    setImplementationAsked(false);
    setHasInteracted(false);
  }, [copy]);

  useEffect(() => {
    const targetMessageId = lastAssistantMessageIdRef.current;
    if (!targetMessageId) return;

    for (const container of [conversationRef.current, dockConversationRef.current]) {
      if (!container) continue;
      const target = container.querySelector<HTMLElement>(`[data-message-id="${targetMessageId}"]`);
      if (!target) continue;
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      container.scrollTo({ top: container.scrollTop + targetRect.top - containerRect.top, behavior: "smooth" });
    }
  }, [messages, typing]);

  useEffect(() => {
    const updateFloatingPosition = () => {
      const heroElement = document.getElementById("top");
      const heroRect = heroElement?.getBoundingClientRect();
      const nextPersistentAvailable = heroRect ? heroRect.bottom <= 0 : true;
      const pricingElement = document.getElementById("precios");
      const pricingRect = pricingElement?.getBoundingClientRect();
      const nextNearPricing = variant !== "sales" && !!pricingRect && pricingRect.top < window.innerHeight && pricingRect.bottom > 0;
      setPersistentAvailable(nextPersistentAvailable);
      setNearPricing(nextNearPricing);
      if (!nextPersistentAvailable) setDockOpen(false);
    };
    updateFloatingPosition();
    window.addEventListener("scroll", updateFloatingPosition, { passive: true });
    window.addEventListener("resize", updateFloatingPosition);
    return () => {
      window.removeEventListener("scroll", updateFloatingPosition);
      window.removeEventListener("resize", updateFloatingPosition);
    };
  }, [variant]);

  function getFlowPickerPlan(): ReplyPlan {
    return {
      replies: [{ text: copy.responses.troubleshootingPicker }],
      mode: "choosingFlow",
      activeFlowId: null,
      answers: [],
      questionIndex: 0,
    };
  }

  function normalizeEvaluationActions(actions: DemoAction[] = []) {
    let hasBookingAction = false;
    const normalizedActions = actions.map((action) => {
      if (action.href !== talkeyBookingUrl) return action;
      hasBookingAction = true;
      return { ...action, label: supportEvaluationAction.label };
    });

    return hasBookingAction ? normalizedActions : [...normalizedActions, supportEvaluationAction];
  }

  function shouldOfferSupportEvaluation(message: string, plan: ReplyPlan) {
    if (variant !== "support") return false;
    if (plan.mode === "choosingFlow" || plan.mode === "inFlow") return false;

    const commandValue = normalizeCommand(message);
    const responseText = normalizeCommand(plan.replies.map((reply) => reply.text).join(" "));

    return (
      /(precio|costo|cuanto|valor|pagar|presupuesto|cotizacion|caro|costoso|pricing|price|cost|budget)/i.test(commandValue) ||
      /(implement|instalar|puesta|partir|comenzar|onboard|setup|configur|calza|sirve.*empresa|aplicar.*operacion)/i.test(commandValue) ||
      /(integr|sitio|web|portal|api|qr|whatsapp|email|correo|canal|crm|calendar|calendario|agendamiento)/i.test(commandValue) ||
      /(segur|privac|dato|datos|trazab|confianz|security|privacy|data)/i.test(commandValue) ||
      /(metric|indicador|kpi|satisfaccion|primer contacto|tiempo promedio|costo por caso|derivacion|handoff)/i.test(commandValue) ||
      /(manuales|troubleshooting|procedimiento|protocolo|documentacion|base de conocimiento|knowledge)/i.test(commandValue) ||
      /(reemplaza|reemplazar|humanos|humano|personas|agentes|equipo)/i.test(commandValue) ||
      /(industria|rubro|sector|fit|clinic|mineria|fabricante|distribuidor|servicio)/i.test(commandValue) ||
      /(75|garanti|promesa|equivoc|error|alucina|hallucinat|wrong answer)/i.test(commandValue) ||
      /(chatgpt|zendesk|intercom|freshdesk|hubspot|salesforce|competidor|competencia|alternativa)/i.test(commandValue) ||
      /(evaluacion|evaluar|implementacion|integracion|configuracion|depende de|validar|revisar como|revisar si|operacion|precio final|evaluacion tecnica|evaluacion comercial)/i.test(responseText)
    );
  }

  function addSupportEvaluationAction(plan: ReplyPlan, message: string): ReplyPlan {
    if (!shouldOfferSupportEvaluation(message, plan)) return plan;

    return {
      ...plan,
      replies: plan.replies.map((reply, index) => {
        if (index !== plan.replies.length - 1) return reply;
        return {
          ...reply,
          actions: normalizeEvaluationActions(reply.actions),
        };
      }),
    };
  }

  function startFlow(flow: TroubleshootingFlow): ReplyPlan {
    return {
      replies: [{ text: `${flow.introMessage}\n\n${flow.questions[0].text}` }],
      mode: "inFlow",
      activeFlowId: flow.id,
      answers: [],
      questionIndex: 0,
    };
  }

  function formatResult(flow: TroubleshootingFlow, nextAnswers: string[]): AssistantReply {
    const result = buildTroubleshootingResult(flow, nextAnswers);
    const isHighSeverity = result.severity === "Alta";
    const actions: DemoAction[] = isHighSeverity
      ? [supportEvaluationAction]
      : [
          { label: copy.actions.tryAnotherCase, prompt: copy.actions.tryAnotherCase },
          supportEvaluationAction,
        ];

    return {
      text: [
        `Diagnóstico probable:\n${result.diagnosis}`,
        `Solución recomendada:\n${result.solution}`,
        `Severidad:\n${result.severity}`,
        `Próximo paso:\n${result.nextStep}`,
        "¿Puedo ayudarte con algo más?",
      ].join("\n\n"),
      danger: isHighSeverity,
      actions,
    };
  }

  function continueFlow(message: string, flow: TroubleshootingFlow): ReplyPlan {
    const nextAnswers = [...answers, message];
    const nextQuestionIndex = questionIndex + 1;

    if (nextQuestionIndex < flow.questions.length) {
      return {
        replies: [{ text: `Entendido. ${flow.questions[nextQuestionIndex].text}` }],
        answers: nextAnswers,
        questionIndex: nextQuestionIndex,
        mode: "inFlow",
      };
    }

    return {
      replies: [formatResult(flow, nextAnswers)],
      answers: nextAnswers,
      questionIndex: nextQuestionIndex,
      mode: "completedFlow",
    };
  }

  function resolveReply(message: string): ReplyPlan {
    const value = message.toLocaleLowerCase();
    const commandValue = normalizeCommand(message);
    if (/(^|\b)(volver al inicio|volver a inicio|ir al inicio|menu inicial|empezar de nuevo|comenzar de nuevo|partir de nuevo|volver a empezar|reiniciar|reset|start over|restart|back to start|iniziare da capo|ricominciare)(\b|$)/i.test(commandValue)) {
      return {
        replies: [{ text: variant === "sales" ? "Listo. Volvemos al inicio. ¿Qué quieres probar ahora?" : "Listo. Volvemos al inicio. ¿Qué quieres revisar ahora?" }],
        mode: "idle",
        activeFlowId: null,
        answers: [],
        questionIndex: 0,
        implementationAsked: false,
      };
    }

    if (/(puentear|anular|desactivar.*(alarma|seguridad|sensor)|bypass|disable.*(alarm|safety|sensor)|gas|fuga|explosion|incendio|corto\s*circuito|short circuit|perdita.*gas|disattivare.*sicurezza)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.unsafeTechnical, danger: true }] };
    }

    if (/(mentir|mienta|inventar|falsificar|ocultar|cerrar.*ticket|falsear|lie|fake|hide|close.*ticket|inventare|falsificare|nascondere|chiudere.*ticket)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.truthfulSupport }] };
    }

    if (/(estafa|mierda|humo|basura|no sirve|sucks|scam|bullshit|garbage|truffa|schifo|spazzatura|non serve)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.negativeChallenge }] };
    }

    if (/(ex|pareja|conquistar|amor|loteria|horoscopo|receta|cocina|chiste|meme|novia|novio|girlfriend|boyfriend|lottery|horoscope|recipe|joke|amore|lotteria|oroscopo|ricetta)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.absurd }] };
    }

    if (variant === "sales") return resolveSalesReply(value, commandValue);

    if (/(chatgpt|openai|gpt|ia general|general ai|directamente con ai|directly.*ai)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.directChatGpt }] };
    }

    if (/(caro|muy caro|costoso|demasiado|overpriced|expensive|too expensive|troppo caro|costoso)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.expensive, actions: [{ label: copy.actions.pricingSimulator, href: "#precios" }] }] };
    }

    if (/(75|setenta y cinco|garanti|promesa|asegura|garantiza|promise|guarantee|guaranteed|garanzia|garantire)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.guarantee75 }] };
    }

    if (/(equivoc|error.*respuesta|alucina|hallucinat|wrong answer|mistake|sbaglia|allucina|risposta sbagliata)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.wrongAnswers }] };
    }

    if (/(entren|train|training|modelo.*otro|otros clientes|cross.?training|manuales.*otros|dati.*clienti|addestr)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.dataTraining }] };
    }

    if (/(memoria|recuerda|historial|historico|hist[oó]rico|no parte de cero|partir de cero|start from zero|memory|history|remember|storico|memoria)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.customerMemory }] };
    }

    if (/(foto|fotografia|c[aá]mara|camara|etiqueta|qr|serie|serial|modelo.*foto|photo|camera|label|serial number|fotografia|etichetta)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.productPhotoRecognition }] };
    }

    if (/(whatsapp|wasap|wsp)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.whatsapp }] };
    }

    if (/(voz|llamada|tel[eé]fono|telefono|hablar|voice|phone|call|parlar|voce|telefono)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.voiceVersion }] };
    }

    if (/(industria|rubro|sector|clinica|cl[ií]nica|colegio|restaurante|mineria|minería|ascensor|abogado|servicio|restaurant|school|clinic|industry|sector|mining|elevator|legal|ristorante|scuola|clinica|industria)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.industryFit }] };
    }

    if (/(freshdesk|hubspot|salesforce|botpress|competidor|competencia|competitor|alternative|alternativa|concorrente)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.competitorComparison }] };
    }

    if (/(precio|costo|cu[aá]nto|valor|pagar|presupuesto|pricing|price|cost|budget|quanto|costa|prezzo)/i.test(value)) {
      return { replies: [{ text: copy.responses.pricing, actions: [{ label: copy.actions.pricingSimulator, href: "#precios" }] }] };
    }

    if (message === copy.actions.tryAnotherCase || /(probar otro caso|try another case|altro caso)/i.test(value)) {
      return getFlowPickerPlan();
    }

    const selectedFlow = findTroubleshootingFlow(message);
    if (selectedFlow) return startFlow(selectedFlow);

    if (mode === "inFlow" && activeFlowId) {
      const activeFlow = talkeyTroubleshootingFlows.find((flow) => flow.id === activeFlowId);
      if (activeFlow) return continueFlow(message, activeFlow);
    }

    if (/(implement|instalar|instala|puesta|partir|comenzar|onboard|setup|configur|implementar|avvia|iniziare)/i.test(value)) {
      return {
        replies: [{ text: implementationAsked ? copy.responses.implementationFollowUp : copy.responses.implementation }],
        implementationAsked: true,
      };
    }

    if (/(tengo un problema con talkey|problema con talkey|i have a talkey issue|talkey issue|ho un problema con talkey)/i.test(commandValue)) {
      return {
        replies: [{ text: copy.responses.technical }],
        mode: "choosingFlow",
        activeFlowId: null,
        answers: [],
        questionIndex: 0,
      };
    }

    if (looksLikeHouseholdApplianceIssue(message)) {
      return buildHouseholdAppliancePlan(message);
    }

    if (/(que problema resuelve|que resuelve talkey|para que sirve talkey|what problem does talkey solve|quale problema risolve talkey)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.problemSolved }] };
    }

    if (/(software de tickets|software ticket|ticketing|helpdesk|mesa de ayuda)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.ticketComparison }] };
    }

    if (/elevenlabs/i.test(value)) {
      return { replies: [{ text: copy.responses.elevenLabsComparison }] };
    }

    if (/zendesk/i.test(value)) {
      return { replies: [{ text: copy.responses.zendeskComparison }] };
    }

    if (/intercom/i.test(value)) {
      return { replies: [{ text: copy.responses.intercomComparison }] };
    }

    if (/(gerente de soporte|jefe de soporte|responsable support|responsable soporte|support leader|support manager|postventa|operaciones)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.supportLeader }] };
    }

    if (/(manuales o troubleshooting|manuales y troubleshooting|manuales o troubleshootings|manuales y troubleshootings|manuals or troubleshooting|manuals and troubleshooting|manuali o troubleshooting|manuali e troubleshooting)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.noManualsOrTroubleshootings }] };
    }

    if (/(no tengo manuales|sin manuales|manuales desordenados|manuales no estan ordenados|manuals|non ho manuali)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.noManuals }] };
    }

    if (/(no tengo troubleshooting|sin troubleshooting|no tengo troubleshootings|troubleshooting procedures|non ho troubleshooting)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.noTroubleshootings }] };
    }

    if (/(personas especificas|personas clave|depende de personas|depende de una persona|specific people|persone specifiche)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.peopleDependency }] };
    }

    if (/(metricas|indicadores|kpi|primer contacto|first contact|tempo medio|tiempo promedio|average handling|escalamiento|derivaci[oó]n|derivaciones|handoff|passaggio|costo por caso|satisfaccion|satisfaction|soddisfazione)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.supportMetrics }] };
    }

    if (/(reemplaza|reemplazar|humanos|humano|personas|replace|humans|umani|sostituire)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.humanRole }] };
    }

    const inferredFlow = inferTroubleshootingFlow(message);
    if (inferredFlow) return startFlow(inferredFlow);

    if (/(problema|falla|error|bug|no funciona|no responde|soporte|t[eé]cnico|issue|support|technical|log|guasto|errore|assistenza|tecnico)/i.test(value)) {
      return {
        replies: [{ text: copy.responses.technical }],
        mode: "choosingFlow",
        activeFlowId: null,
        answers: [],
        questionIndex: 0,
      };
    }
    if (/(integr|sitio|web|portal|api|qr|whatsapp|email|correo|website|canal|sito|integra)/i.test(value)) {
      return { replies: [{ text: copy.responses.integration }] };
    }
    if (/(segur|privac|dato|datos|trazab|confianz|security|privacy|data|sicurezza|dati)/i.test(value)) {
      return { replies: [{ text: copy.responses.security }] };
    }
    return { replies: [{ text: copy.responses.fallback }] };
  }

  function resolveSalesReply(value: string, commandValue: string): ReplyPlan {
    if (/(precio|costo|cu[aá]nto|valor|pagar|presupuesto|pricing|price|cost|budget|plan|paquete|mensual)/i.test(value)) {
      return { replies: [{ text: copy.responses.pricing, actions: [{ label: copy.actions.pricingSimulator, href: "#precios" }, { label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(vambe|hubspot|salesforce|manychat|salesloft|drift|competidor|competencia|competitor|alternative|alternativa|crm tradicional|comparar|comparaci[oó]n)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.competitorComparison, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(integr|crm|whatsapp|wasap|wsp|instagram|web|sitio|portal|api|canal|email|correo|hubspot|salesforce)/i.test(value)) {
      return { replies: [{ text: copy.responses.integration, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(implement|instalar|instala|partir|comenzar|onboard|setup|configur|implementar|avvia|iniziare)/i.test(value)) {
      return {
        replies: [{ text: implementationAsked ? copy.responses.implementationFollowUp : copy.responses.implementation }],
        implementationAsked: true,
      };
    }

    if (/(agenda|agendar|demo|reuni[oó]n|llamada|evaluaci[oó]n|calendar|meeting)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.implementation, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(cotiz|cotizar|propuesta|presupuesto|quote|proposal)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.ticketComparison, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(seguimiento|lead.*fr[ií]o|se enfr[ií]a|follow|priori|prioridad|scoring|pipeline|oportunidad|pr[oó]xim[oa]s?\s+pasos?|prepar.*(paso|agenda|email|correo|seguimiento)|siguiente acci[oó]n|next step)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.supportMetrics, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(duplic|repetid|historial|memoria|vuelve|otro canal|mismo cliente|history|memory)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.customerMemory, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(postventa|soporte|handoff|deriv|cliente ganado|instalaci[oó]n|garant[ií]a)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.technical, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(vendedor|ejecutivo|humano|humanos|equipo comercial|reemplaza|replace|sales rep)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.humanRole, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(voz|tel[eé]fono|telefono|hablar|voice|phone|call|llamada)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.voiceVersion, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    if (/(segur|privac|dato|datos|trazab|security|privacy|data)/i.test(value)) {
      return { replies: [{ text: copy.responses.security }] };
    }

    if (/(que problema resuelve|que resuelve talkey|para que sirve talkey|ventas|vender|leads|comercial|prospecto)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.problemSolved, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
    }

    return { replies: [{ text: copy.responses.fallback, actions: [{ label: copy.actions.bookDemo, href: talkeyBookingUrl }] }] };
  }

  async function resolveAiPlan(content: string, localPlan: ReplyPlan): Promise<ReplyPlan> {
    if (!aiMode || mode === "inFlow" || mode === "choosingFlow") return localPlan;

    const response = await fetch("/api/marketing-demo-ia", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: content,
        localReply: localPlan.replies.map((reply) => reply.text).join("\n\n"),
        variant,
        history: messages.slice(-8).map((message) => ({ sender: message.sender, text: message.text }))
      })
    });

    if (!response.ok) return localPlan;
    const data = await response.json();
    if (!data.reply) return localPlan;

    const localFirstReply = localPlan.replies[0];
    return {
      ...localPlan,
      replies: [{
        text: data.reply,
        danger: localPlan.replies.some((reply) => reply.danger),
        actions: localFirstReply?.actions
      }]
    };
  }

  function applyPlan(plan: ReplyPlan) {
    const assistantMessages = plan.replies.map((reply) => ({ id: crypto.randomUUID(), sender: "assistant" as const, ...reply, text: stripForbiddenDemoIntro(reply.text) }));
    lastAssistantMessageIdRef.current = assistantMessages[0]?.id ?? null;
    setMessages((current) => [
      ...current,
      ...assistantMessages,
    ]);
    if (plan.mode) setMode(plan.mode);
    if ("activeFlowId" in plan) setActiveFlowId(plan.activeFlowId ?? null);
    if (plan.answers) setAnswers(plan.answers);
    if (typeof plan.questionIndex === "number") setQuestionIndex(plan.questionIndex);
    if (typeof plan.implementationAsked === "boolean") setImplementationAsked(plan.implementationAsked);
    setTyping(false);
  }

  function send(message: string) {
    const content = message.trim();
    if (!content || typing) return;
    const visitorMessage: DemoMessage = { id: crypto.randomUUID(), sender: "visitor", text: content };
    lastAssistantMessageIdRef.current = null;
    setHasInteracted(true);
    setMessages((current) => [...current, visitorMessage]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const localPlan = addSupportEvaluationAction(resolveReply(content), content);
      resolveAiPlan(content, localPlan)
        .then(applyPlan)
        .catch(() => applyPlan(localPlan));
    }, 650);
  }

  function getPromptOptions() {
    if (mode === "choosingFlow") return boundedPromptOptions(talkeyTroubleshootingFlows.map((flow) => flow.title));

    if (mode === "inFlow" && activeFlowId) {
      const activeFlow = talkeyTroubleshootingFlows.find((flow) => flow.id === activeFlowId);
      return boundedPromptOptions(activeFlow?.questions[questionIndex]?.options ?? []);
    }

    if (mode === "completedFlow" || hasInteracted) return [];

    return copy.prompts;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(input);
  }

  function updateInput(value: string) {
    setInput(value);
    if (value.trim()) setHasInteracted(true);
  }

  function renderCard(mode: "hero" | "dock") {
    const promptOptions = getPromptOptions();

    return (
      <div className={`mk-chat-card ${mode === "dock" ? "is-docked" : ""}`}>
        <div className="mk-chat-topline">
          <span className="mk-live-dot" />
          {copy.live}
          <span className="mk-chat-signal"><i /><i /><i /></span>
          {mode === "dock" && <button className="mk-chat-minimize" type="button" onClick={() => setDockOpen(false)} aria-label={copy.minimize}><Minus size={18} /></button>}
        </div>
        <div ref={mode === "hero" ? conversationRef : dockConversationRef} className="mk-chat-conversation" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} data-message-id={message.id} className={`mk-demo-message ${message.sender === "visitor" ? "is-visitor" : "is-assistant"} ${message.danger ? "is-danger" : ""}`}>
              {message.danger && <span className="mk-danger-label"><AlertTriangle size={13} />{copy.danger}</span>}
              <p>{message.text}</p>
              {message.actions && (
                <div className="mk-demo-actions">
                  {message.actions.map((action) => {
                    const actionHref = action.href === talkeyBookingUrl
                      ? buildTalkeyCalendarUrl(messages, variant)
                      : action.href;
                    const isExternalAction = actionHref?.startsWith("http") ?? false;

                    return actionHref ? (
                      <a
                        key={action.label}
                        className="mk-demo-action"
                        href={actionHref}
                        target={isExternalAction ? "_blank" : undefined}
                        rel={isExternalAction ? "noopener noreferrer" : undefined}
                        onClick={() => trackEvent(action.href === "#precios" ? "hero_estimate_price_click" : "agenda_click", { source: "demo_action" })}
                      >
                        {action.label}<ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <button key={action.label} className="mk-demo-action" type="button" disabled={typing} onClick={() => send(action.prompt ?? action.label)}>
                        {action.label}<ArrowUpRight size={15} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="mk-chat-typing" aria-label={copy.typing}>
              <span /><span /><span />
              <small>{copy.typing}</small>
            </div>
          )}
        </div>
        {promptOptions.length > 0 && (
          <div className="mk-chat-prompts">
            {promptOptions.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={typing}
                onClick={() => {
                  trackEvent("demo_question_clicked", { question_label: prompt });
                  send(prompt);
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        <form className="mk-chat-form" onSubmit={submit}>
          <input
            data-testid="marketing-chat-input"
            className={input ? "has-value" : "is-empty"}
            value={input}
            onChange={(event) => updateInput(event.target.value)}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
          />
          <button type="submit" disabled={!input.trim() || typing} aria-label={copy.send}><ArrowUp size={18} /></button>
        </form>
      </div>
    );
  }

  return (
    <div className={`mk-chat-wrap ${variant === "sales" ? "is-sales-chat" : ""}`} aria-label={copy.live}>
      <div className="mk-chat-glow" />
      {renderCard("hero")}
      {persistentAvailable && (
        <aside className={`mk-chat-persistent ${dockOpen ? "is-open" : ""} ${nearPricing ? "is-near-pricing" : ""}`} data-testid="persistent-chat" aria-label={copy.live}>
          {dockOpen ? renderCard("dock") : (
            <button
              className="mk-chat-launcher"
              type="button"
              onClick={() => {
                trackEvent("demo_opened", { source: "floating_launcher" });
                setDockOpen(true);
              }}
              aria-label={copy.open}
            >
              <span><MessageCircleMore size={22} /></span>
              <strong>{copy.live}</strong>
            </button>
          )}
        </aside>
      )}
    </div>
  );
}
