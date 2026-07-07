"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowUp, ArrowUpRight, MessageCircleMore, Minus } from "lucide-react";
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

function normalizeCommand(value: string) {
  return value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
  const [dockOpen, setDockOpen] = useState(false);
  const [nearPricing, setNearPricing] = useState(false);
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
      const pricingElement = document.getElementById("precios");
      const pricingRect = pricingElement?.getBoundingClientRect();
      const nextNearPricing = !!pricingRect && pricingRect.top < window.innerHeight && pricingRect.bottom > 0;
      setNearPricing(nextNearPricing);
    };
    updateFloatingPosition();
    window.addEventListener("scroll", updateFloatingPosition, { passive: true });
    window.addEventListener("resize", updateFloatingPosition);
    return () => {
      window.removeEventListener("scroll", updateFloatingPosition);
      window.removeEventListener("resize", updateFloatingPosition);
    };
  }, []);

  function getFlowPickerPlan(): ReplyPlan {
    return {
      replies: [{ text: copy.responses.troubleshootingPicker }],
      mode: "choosingFlow",
      activeFlowId: null,
      answers: [],
      questionIndex: 0,
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
      ? [{ label: copy.actions.bookReview, href: "#agenda" }]
      : [
          { label: copy.actions.tryAnotherCase, prompt: copy.actions.tryAnotherCase },
          { label: copy.actions.bookDemo, href: "#agenda" },
        ];

    return {
      text: [
        `Diagnóstico probable:\n${result.diagnosis}`,
        `Solución recomendada:\n${result.solution}`,
        `Severidad:\n${result.severity}`,
        `Próximo paso:\n${result.nextStep}`,
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
        replies: [{ text: copy.welcome }],
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
      return { replies: [{ text: copy.responses.pricing, actions: [{ label: copy.actions.pricingSimulator, href: "#precios" }, { label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(vambe|hubspot|salesforce|manychat|salesloft|drift|competidor|competencia|competitor|alternative|alternativa|crm tradicional|comparar|comparaci[oó]n)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.competitorComparison, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(integr|crm|whatsapp|wasap|wsp|instagram|web|sitio|portal|api|canal|email|correo|hubspot|salesforce)/i.test(value)) {
      return { replies: [{ text: copy.responses.integration, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(implement|instalar|instala|partir|comenzar|onboard|setup|configur|implementar|avvia|iniziare)/i.test(value)) {
      return {
        replies: [{ text: implementationAsked ? copy.responses.implementationFollowUp : copy.responses.implementation }],
        implementationAsked: true,
      };
    }

    if (/(agenda|agendar|demo|reuni[oó]n|llamada|evaluaci[oó]n|calendar|meeting)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.implementation, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(cotiz|cotizar|propuesta|presupuesto|quote|proposal)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.ticketComparison, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(seguimiento|lead.*fr[ií]o|se enfr[ií]a|follow|priori|prioridad|scoring|pipeline|oportunidad|pr[oó]ximo paso)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.supportMetrics, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(duplic|repetid|historial|memoria|vuelve|otro canal|mismo cliente|history|memory)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.customerMemory, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(postventa|soporte|handoff|deriv|cliente ganado|instalaci[oó]n|garant[ií]a)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.technical, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(vendedor|ejecutivo|humano|humanos|equipo comercial|reemplaza|replace|sales rep)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.humanRole, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(voz|tel[eé]fono|telefono|hablar|voice|phone|call|llamada)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.voiceVersion, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    if (/(segur|privac|dato|datos|trazab|security|privacy|data)/i.test(value)) {
      return { replies: [{ text: copy.responses.security }] };
    }

    if (/(que problema resuelve|que resuelve talkey|para que sirve talkey|ventas|vender|leads|comercial|prospecto)/i.test(commandValue)) {
      return { replies: [{ text: copy.responses.problemSolved, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
    }

    return { replies: [{ text: copy.responses.fallback, actions: [{ label: copy.actions.bookDemo, href: "#agenda" }] }] };
  }

  async function resolveAiPlan(content: string, localPlan: ReplyPlan): Promise<ReplyPlan> {
    if (!aiMode || mode === "inFlow" || mode === "choosingFlow") return localPlan;

    const response = await fetch("/api/marketing-demo-ia", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: content,
        localReply: localPlan.replies.map((reply) => reply.text).join("\n\n"),
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
    const assistantMessages = plan.replies.map((reply) => ({ id: crypto.randomUUID(), sender: "assistant" as const, ...reply }));
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
    setMessages((current) => [...current, visitorMessage]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const localPlan = resolveReply(content);
      resolveAiPlan(content, localPlan)
        .then(applyPlan)
        .catch(() => applyPlan(localPlan));
    }, 650);
  }

  function getPromptOptions() {
    if (mode === "choosingFlow") return talkeyTroubleshootingFlows.map((flow) => flow.title);

    if (mode === "inFlow" && activeFlowId) {
      const activeFlow = talkeyTroubleshootingFlows.find((flow) => flow.id === activeFlowId);
      return activeFlow?.questions[questionIndex]?.options ?? [];
    }

    if (mode === "completedFlow") return [copy.actions.tryAnotherCase, ...copy.prompts];

    return copy.prompts;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(input);
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
                  {message.actions.map((action) => (
                    action.href ? (
                      <a key={action.label} className="mk-demo-action" href={action.href} onClick={() => trackEvent(action.href === "#precios" ? "hero_estimate_price_click" : "agenda_click", { source: "demo_action" })}>
                        {action.label}<ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <button key={action.label} className="mk-demo-action" type="button" disabled={typing} onClick={() => send(action.prompt ?? action.label)}>
                        {action.label}<ArrowUpRight size={15} />
                      </button>
                    )
                  ))}
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
            onChange={(event) => setInput(event.target.value)}
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
    </div>
  );
}
