"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CalendarCheck,
  Database,
  Globe2,
  Menu,
  MessageSquareText,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import { MarketingChatDemo } from "@/components/marketing-chat-demo";
import { MarketingScheduler } from "@/components/marketing-scheduler";
import { PricingSimulator } from "@/components/pricing-simulator";
import { trackEvent } from "@/lib/analytics";
import { detectMarketingLocale, marketingCopy, type MarketingLocale } from "@/lib/marketing-copy";

function VoiceHeadIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path
        d="M24 37C31 42.5 34.5 50.2 34.5 59C34.5 67.8 31 75.5 24 81"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      />
      <path
        d="M45 27C55 35 60 45.8 60 59C60 72.2 55 83 45 91"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      />
      <path
        d="M66 20C80 30 87 43 87 59C87 75 80 88 66 98"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      />
    </svg>
  );
}

function TalkeyKeyOutlineIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 345 158" aria-hidden="true" focusable="false">
      <path
        d="M8 69L12 54L17 44L26 34L26 32L30 30L30 28L32 28L42 19L52 14L75 8L100 9L114 13L126 19L146 36L146 38L151 43L156 55L332 55L337 60L336 69L312 92L312 94L299 107L290 107L277 93L270 92L255 107L249 108L246 107L233 93L226 92L211 107L208 108L154 108L147 121L134 134L117 144L95 150L74 150L60 147L47 142L32 132L20 119L12 104L8 90Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="18"
      />
      <circle cx="59" cy="58" r="11" fill="currentColor" />
      <circle cx="109" cy="58" r="11" fill="currentColor" />
      <path d="M44 87C54 108 75 119 99 108C111 103 120 94 124 86" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="12" />
    </svg>
  );
}

const comparisonIcons = [UserRound, Ticket, VoiceHeadIcon, TalkeyKeyOutlineIcon];
const integrationIcons = [Database, CalendarCheck, PlugZap];
const supportedLocales = new Set<MarketingLocale>(["es", "en", "it"]);

const navLineBreakLabels: Record<MarketingLocale, { cases: [string, string]; pricing: [string, string] }> = {
  es: { cases: ["Casos", "de uso"], pricing: ["Simulador", "de precios"] },
  en: { cases: ["Use", "cases"], pricing: ["Pricing", "simulator"] },
  it: { cases: ["Casi", "d'uso"], pricing: ["Simulatore", "prezzi"] },
};

const previewItemCount = 3;
type ExpandableListKey = "problems" | "useCases" | "faq";

const narrativeContent = {
  es: {
    controls: { showMoreProblems: "Ver más problemas...", showMoreIndustries: "Ver más industrias...", showMoreFaq: "Ver más preguntas frecuentes...", showLess: "Ver menos" },
    nav: { problem: "Problemas/Soluciones", solution: "Solución", cases: "Casos de uso", demo: "Demo", manuals: "Manuales", pricing: "Simulador de precios", comparison: "Comparación", quote: "Solicitar evaluación" },
    hero: {
      eyebrow: "",
      titleParts: [
        { text: "Soporte técnico consistente, incluso cuando el " },
        { text: "conocimiento está disperso", highlight: true },
        { text: "." },
      ],
      body: "Transforma manuales, procedimientos y experiencia técnica en respuestas claras, diagnósticos guiados y derivación a un especialista humano cuando corresponde. Pensado para fabricantes, distribuidores y equipos de postventa que necesitan resolver soporte técnico con mayor consistencia.",
      primary: "Solicitar evaluación",
      secondary: "Probar demo",
      tertiary: "Calcular precio estimado",
      proof: ["Soporte técnico de calidad", "Menos dependencia individual", "Diagnósticos repetibles"],
      visualTitle: "Asistente virtual Talkey",
    },
    problem: {
      kicker: "Problemas reales",
      title: "El verdadero problema no son las llamadas. Es el conocimiento.",
      body: "",
      signalsTitle: "Señales frecuentes",
      consequencesTitle: "Consecuencias operativas",
      bullets: ["Respuestas inconsistentes", "Información dispersa", "Diagnósticos distintos para el mismo problema", "Manuales difíciles de usar", "Derivaciones innecesarias", "Visitas técnicas evitables"],
      consequences: ["Aumenta el tiempo de resolución", "Sube el costo por caso", "Baja la satisfacción de clientes", "Crece la dependencia de agentes específicos"],
      customerImpact: {
        title: "Cuando el conocimiento está disperso, el cliente lo siente.",
        text: "Talkey convierte conocimiento disperso en una base aprobada de respuestas, criterios y procedimientos para que el cliente reciba una atención consistente desde el primer contacto.",
      },
      pairTitleProblem: "Problema",
      pairTitleSolution: "Cómo lo resuelve el asistente virtual Talkey",
      pairs: [
        { problem: "Clientes esperando a ser atendidos", solution: "Talkey está disponible 24/7 para iniciar la atención de inmediato por chat o por voz si el cliente llama por teléfono, con respuestas pacientes, consistentes y basadas en conocimiento aprobado." },
        { problem: "El cliente vuelve a consultar por un problema ya reportado", solution: "Talkey puede usar el historial individual de ese cliente, cuando está disponible, para que la atención no parta desde cero y continúe con más contexto." },
        { problem: "El cliente no sabe exactamente qué modelo o producto tiene", solution: "Talkey identifica el producto desde una foto de la etiqueta, QR o número de serie, guía el diagnóstico y resuelve o deriva el caso con contexto." },
        { problem: "Casos simples terminan derivados a especialistas", solution: "Talkey aplica criterios comunes, intenta resolver casos frecuentes y deriva solo cuando hay riesgo, baja certeza o complejidad real." },
        { problem: "Los manuales existen, pero nadie los usa durante una llamada", solution: "Talkey transforma documentación técnica en respuestas claras y acciones concretas, y puede guiar al agente humano durante llamadas telefónicas." },
        { problem: "Cada agente responde distinto", solution: "Talkey responde desde conocimiento aprobado y mantiene el mismo criterio para casos equivalentes." },
        { problem: "Los técnicos antiguos saben cosas que no están documentadas", solution: "Talkey convierte experiencia individual en conocimiento reutilizable para toda la operación." },
        { problem: "Se envían técnicos a terreno demasiado pronto", solution: "Talkey mejora el diagnóstico remoto antes de enviar a una persona a terreno." },
      ],
    },
    solution: {
      kicker: "Cómo lo resuelve Talkey",
      title: "Convierte conocimiento técnico en un sistema de soporte consistente.",
      body: "Talkey organiza el conocimiento que ya existe en tu empresa y lo transforma en respuestas, diagnósticos guiados y criterios de derivación.",
      items: [
        { title: "Centraliza conocimiento", text: "Manuales, fichas técnicas, procedimientos, troubleshootings y preguntas frecuentes en una base útil para soporte." },
        { title: "Estandariza respuestas", text: "El mismo problema debe producir la misma respuesta, independiente de quién atienda." },
        { title: "Detecta el modelo por foto", text: "Reconoce el modelo desde una foto tomada por el cliente con su celular." },
        { title: "Guía llamadas técnicas", text: "Durante una llamada, orienta al agente humano con pasos claros para resolver o derivar con criterio." },
        { title: "Atiende por chat o voz", text: "La versión con voz permite conversar con Talkey como con un agente senior: paciente, consistente y basado en el conocimiento aprobado de la empresa. Cuando corresponde, pasa el caso con contexto al especialista humano más preparado." },
      ],
    },
    managerConcerns: {
      kicker: "Para gerentes de soporte",
      title: "Lo que un gerente de soporte necesita controlar al crecer.",
      body: "",
      items: [
        { title: "Conocimiento crítico bajo control", text: "Convierte manuales, criterios técnicos y experiencia interna en una base reutilizable por toda la operación." },
        { title: "Derivación con contexto", text: "Ayuda a decidir qué casos puede resolver el asistente virtual y cuáles deben llegar a una persona, usando datos ya levantados." },
        { title: "Visibilidad y productividad operativa", text: "Ordena motivos de consulta, razones de derivación, tiempos y brechas de documentación para que el equipo humano se concentre en casos de mayor valor." },
      ],
    },
    integrations: {
      kicker: "Integraciones",
      title: "Se conecta a las herramientas que la empresa ya usa.",
      body: "Talkey no obliga a reemplazar el stack actual. Puede convivir con CRM, calendarios de agendamiento, portales de clientes y sistemas internos para recibir contexto y devolver tickets, eventos y trazabilidad.",
      items: [
        { title: "CRM e historial de clientes", text: "Usa datos existentes del cliente, producto, garantía e interacciones previas para que el soporte no parta desde cero." },
        { title: "Agenda de visitas técnicas", text: "Google Calendar es el primer conector para agendar visitas desde un caso diagnosticado; el flujo queda preparado para cualquier sistema de reservas." },
        { title: "API para tu operación", text: "Talkey puede integrarse con herramientas como HubSpot, Salesforce, Microsoft Bookings, Calendly o sistemas propios según el alcance del proyecto." },
      ],
    },
    useCases: {
      kicker: "Casos de uso",
      title: "Talkey puede aplicarse donde los productos y servicios dependen de documentación y diagnóstico.",
      body: "No se trata de una lista decorativa de industrias. Cada caso tiene una necesidad concreta de soporte técnico estructurado.",
      items: [
        { title: "Calefones y climatización", text: "Diagnóstico remoto antes de enviar un técnico." },
        { title: "Hornos eléctricos y electrodomésticos", text: "Guías de uso, instalación, fallas frecuentes y garantía." },
        { title: "Equipos industriales", text: "Procedimientos técnicos, seguridad operacional y derivación según criticidad." },
        { title: "Equipos médicos", text: "Respuestas consistentes y trazables para productos sensibles." },
        { title: "Minería", text: "Soporte técnico estructurado para equipos, procedimientos y operación en terreno." },
        { title: "Distribuidores e importadores", text: "Soporte uniforme aunque trabajen con múltiples marcas, modelos o versiones." },
        { title: "Fabricantes", text: "Conversión de conocimiento interno en soporte técnico preparado para crecer." },
      ],
    },
    demo: {
      kicker: "Demo",
      title: "Prueba cómo Talkey responde sobre Talkey.",
      body: "Este demo muestra cómo Talkey puede responder preguntas comerciales, técnicas y de implementación usando conocimiento estructurado. También puedes abrir el asistente flotante en cualquier parte del sitio.",
    },
    comparison: {
      kicker: "Comparación conceptual",
      title: "Por qué Talkey es diferente.",
      body: "Resuelve una categoría distinta: convertir conocimiento técnico en soporte operativo consistente.",
      items: [
        { title: "Humanos", text: "Aportan criterio, empatía y casos complejos. Por sí solos no resuelven variabilidad, disponibilidad limitada ni dependencia de memoria individual." },
        { title: "Zendesk / Intercom", text: "Son excelentes para tickets, conversaciones y operación de equipos. No resuelven por sí solos diagnóstico técnico ni estructuración profunda de conocimiento de producto." },
        { title: "ElevenLabs", text: "Son fuertes en experiencias conversacionales y voz. No gestionan por sí solas manuales, procedimientos, troubleshootings ni criterios de soporte técnico." },
        { title: "Talkey", text: "Organiza conocimiento técnico, guía diagnósticos y también puede operar por voz, con respuestas coherentes y consistentes basadas en los criterios de los mejores empleados de tu empresa." },
      ],
    },
    securityPrivacy: {
      kicker: "Seguridad y privacidad",
      title: "Control de seguridad para conocimiento técnico sensible.",
      body: "",
      items: [
        { title: "Separación por cliente", text: "Cada empresa trabaja con su propio conocimiento, sin mezclar bases ni criterios de soporte." },
        { title: "Sin entrenamiento cruzado", text: "Las conversaciones de una empresa no se usan para entrenar modelos o respuestas de otras empresas." },
        { title: "Permisos por alcance", text: "El acceso al conocimiento puede configurarse según roles, productos, canales y responsabilidades." },
        { title: "Revisión técnica y contractual", text: "Los datos sensibles se tratan según contrato, configuración y normativa aplicable." },
      ],
    },
    faq: {
      kicker: "Preguntas frecuentes",
      title: "Respuestas rápidas antes de una evaluación.",
      items: [
        { question: "¿Cuánto demora una implementación?", answer: "Depende del volumen de productos, documentos, canales y validación técnica. Lo correcto es revisarlo en una evaluación.", cta: "Solicitar evaluación", ctaHref: "#agenda" },
        { question: "¿Cuánto cuesta?", answer: "El precio depende de la operación. Usa el simulador de precios para una estimación referencial y luego solicita una evaluación.", cta: "Ir al simulador de precios" },
        { question: "¿Talkey es un chatbot?", answer: "No solamente. La interfaz puede parecer un chat, pero el valor está en organizar conocimiento técnico, aplicar procedimientos y mantener criterios de soporte." },
        { question: "¿Talkey reemplaza a mis agentes?", answer: "No necesariamente. Puede complementar a tus agentes; si tu objetivo es reducir dotación o evitar seguir ampliándola, Talkey puede absorber carga repetitiva y entregar más contexto para casos complejos." },
        { question: "¿Talkey puede mejorar la satisfacción de mis clientes?", answer: "Sí, puede ayudar. La satisfacción del cliente suele mejorar cuando recibe respuestas claras, consistentes y oportunas, y cuando los casos complejos se derivan con buen contexto. Talkey no promete eliminar todos los problemas de soporte, pero sí ayuda a reducir respuestas contradictorias, esperas innecesarias y derivaciones mal preparadas." },
        { question: "¿En qué canales puede funcionar?", answer: "Puede evaluarse para web, WhatsApp, email, voz y portales de clientes. También puede integrarse al CRM, calendario o sistema de agendamiento que ya use la empresa. Para visitas técnicas, Google Calendar es el primer conector previsto, con una arquitectura preparada para otros agendadores." },
      ],
    },
  },
  en: {
    controls: { showMoreProblems: "Show more problems...", showMoreIndustries: "Show more industries...", showMoreFaq: "Show more frequently asked questions...", showLess: "Show less" },
    nav: { problem: "Problems/Solutions", solution: "Solution", cases: "Use cases", demo: "Demo", manuals: "Manuals", pricing: "Pricing simulator", comparison: "Comparison", quote: "Request evaluation" },
    hero: {
      eyebrow: "",
      titleParts: [
        { text: "Consistent technical support, even when " },
        { text: "knowledge is scattered", highlight: true },
        { text: "." },
      ],
      body: "Turns manuals, procedures and technical expertise into clear answers, guided diagnostics and human handoff when needed. Built for manufacturers, distributors and post-sale teams that need more consistent technical support.",
      primary: "Request evaluation",
      secondary: "Try demo",
      tertiary: "Estimate price",
      proof: ["High-quality technical support", "Less individual dependency", "Repeatable diagnostics"],
      visualTitle: "Talkey virtual assistant",
    },
    problem: {
      kicker: "Real problems",
      title: "The real problem is not the calls. It is knowledge.",
      body: "",
      signalsTitle: "Frequent signs",
      consequencesTitle: "Operating consequences",
      bullets: ["Inconsistent answers", "Scattered information", "Different diagnostics for the same issue", "Hard-to-use manuals", "Unnecessary handoffs", "Avoidable technical visits"],
      consequences: ["Resolution time increases", "Cost per case rises", "Customer satisfaction drops", "Dependency on specific agents grows"],
      customerImpact: {
        title: "When knowledge is scattered, customers feel it.",
        text: "Talkey turns scattered knowledge into an approved base of answers, criteria and procedures so customers receive consistent support from the first interaction.",
      },
      pairTitleProblem: "Problem",
      pairTitleSolution: "How the Talkey virtual assistant solves it",
      pairs: [
        { problem: "Customers waiting to be served", solution: "Talkey is available 24/7 to start support immediately by chat or by voice if the customer calls by phone, with patient and consistent answers grounded in approved knowledge." },
        { problem: "A customer comes back with an issue already reported", solution: "Talkey can use that customer's individual support history, when available, so the interaction does not start from zero and continues with more context." },
        { problem: "The customer does not know exactly which model or product they have", solution: "Talkey identifies the product from a photo of the label, QR code or serial number, guides diagnosis and resolves or hands off the case with context." },
        { problem: "Simple cases end up handed off to specialists", solution: "Talkey applies shared criteria, resolves frequent cases first and hands off when risk, low confidence or real complexity appears." },
        { problem: "Manuals exist, but nobody uses them during calls", solution: "Talkey turns technical documentation into clear answers and concrete actions, and can guide human agents during phone calls." },
        { problem: "Every agent answers differently", solution: "Talkey answers from approved knowledge and keeps the same criteria for equivalent cases." },
        { problem: "Senior technicians know things that are not documented", solution: "Talkey turns individual expertise into reusable company knowledge." },
        { problem: "Technicians are sent on-site too early", solution: "Talkey improves remote diagnosis before sending a person on-site." },
      ],
    },
    solution: {
      kicker: "How Talkey solves it",
      title: "Turn technical knowledge into a consistent support system.",
      body: "Talkey organizes the knowledge your company already has and turns it into answers, guided diagnostics and handoff criteria.",
      items: [
        { title: "Centralizes knowledge", text: "Manuals, technical sheets, procedures, troubleshooting and FAQs in a support-ready knowledge base." },
        { title: "Standardizes answers", text: "The same problem should produce the same answer, regardless of who handles it." },
        { title: "Detects the model from a photo", text: "Recognizes the model from a photo taken by the customer on their phone." },
        { title: "Guides technical calls", text: "During a call, guides the human agent with clear steps to resolve or hand off with criteria." },
        { title: "Supports chat or voice", text: "The voice version lets customers speak with Talkey as if they were talking to a senior support agent: patient, consistent and grounded in approved company knowledge. When needed, it hands off with context to the right human expert." },
      ],
    },
    managerConcerns: {
      kicker: "For support leaders",
      title: "What support leaders need to control as they grow.",
      body: "",
      items: [
        { title: "Critical knowledge under control", text: "Turns manuals, technical criteria and internal expertise into a reusable base for the whole operation." },
        { title: "Handoff with context", text: "Helps decide which cases the virtual assistant can solve and which should reach a person, using data already collected." },
        { title: "Operational visibility and productivity", text: "Organizes inquiry reasons, handoff reasons, support times and documentation gaps so the human team can focus on higher-value cases." },
      ],
    },
    integrations: {
      kicker: "Integrations",
      title: "Connects to the tools your company already uses.",
      body: "Talkey does not force you to replace your current stack. It can work with CRMs, booking calendars, customer portals and internal systems to receive context and return tickets, events and traceability.",
      items: [
        { title: "CRM and customer history", text: "Uses existing customer, product, warranty and previous interaction data so support does not start from zero." },
        { title: "Technical visit scheduling", text: "Google Calendar is the first connector for booking on-site visits from a diagnosed case; the flow is ready for other scheduling systems." },
        { title: "API for your operation", text: "Talkey can integrate with tools like HubSpot, Salesforce, Microsoft Bookings, Calendly or internal systems depending on project scope." },
      ],
    },
    useCases: {
      kicker: "Use cases",
      title: "Talkey can apply wherever products and services depend on documentation and diagnosis.",
      body: "This is not a decorative industry list. Each case has a concrete need for structured technical support.",
      items: [
        { title: "Water heaters and HVAC", text: "Remote diagnosis before sending a technician." },
        { title: "Electric ovens and appliances", text: "Usage, installation, frequent failure and warranty guidance." },
        { title: "Industrial equipment", text: "Technical procedures, operational safety and criticality-based handoff." },
        { title: "Medical equipment", text: "Consistent and traceable answers for sensitive products." },
        { title: "Mining", text: "Structured technical support for equipment, procedures and field operations." },
        { title: "Distributors and importers", text: "Uniform support across multiple brands, models and versions." },
        { title: "Manufacturers", text: "Conversion of internal knowledge into growth-ready technical support." },
      ],
    },
    demo: {
      kicker: "Demo",
      title: "Try how Talkey answers questions about Talkey.",
      body: "This demo shows how Talkey can answer commercial, technical and implementation questions using structured knowledge. You can also open the floating assistant anywhere on the site.",
    },
    comparison: {
      kicker: "Conceptual comparison",
      title: "Why Talkey is different.",
      body: "It solves a different category: turning technical knowledge into consistent support operations.",
      items: [
        { title: "Humans", text: "Strong at judgment, empathy and complex cases. Alone, they do not solve variability, limited availability or dependency on individual memory." },
        { title: "Zendesk / Intercom", text: "Excellent for tickets, conversations and team operations. They do not by themselves solve technical diagnosis or deep product knowledge structuring." },
        { title: "ElevenLabs", text: "Strong at conversational and voice experiences. They do not by themselves manage manuals, procedures, troubleshooting flows or technical support criteria." },
        { title: "Talkey", text: "Organizes technical knowledge, guides diagnostics and can also operate by voice, with coherent and consistent answers based on the criteria of your company's best employees." },
      ],
    },
    securityPrivacy: {
      kicker: "Security and privacy",
      title: "Security control for sensitive technical knowledge.",
      body: "",
      items: [
        { title: "Customer-level separation", text: "Each company works with its own knowledge base, without mixing support criteria or content." },
        { title: "No cross-training", text: "One company's conversations are not used to train models or responses for other companies." },
        { title: "Scoped permissions", text: "Knowledge access can be configured by roles, products, channels and responsibilities." },
        { title: "Technical and contractual review", text: "Sensitive data is handled according to contract, configuration and applicable regulation." },
      ],
    },
    faq: {
      kicker: "FAQ",
      title: "Quick answers before an evaluation.",
      items: [
        { question: "How long does implementation take?", answer: "It depends on products, documents, channels and technical validation. The right next step is to review it in an evaluation.", cta: "Request evaluation", ctaHref: "#agenda" },
        { question: "How much does it cost?", answer: "Pricing depends on the operation. Use the pricing simulator for a reference estimate, then request an evaluation.", cta: "Go to pricing simulator" },
        { question: "Is Talkey a chatbot?", answer: "Not only. The interface can look like chat, but the value is in organizing technical knowledge, applying procedures and keeping support criteria consistent." },
        { question: "Does Talkey replace my agents?", answer: "Not necessarily. It can complement your agents; if your goal is to reduce headcount or avoid expanding it, Talkey can absorb repetitive load and provide more context for complex cases." },
        { question: "Can Talkey improve customer satisfaction?", answer: "Yes, it can help. Customer satisfaction often improves when people receive clear, consistent, and timely answers, and when complex cases are handed off with proper context. Talkey does not promise to eliminate every support problem, but it helps reduce contradictory answers, unnecessary waiting, and poorly prepared handoffs." },
        { question: "Which channels can it support?", answer: "It can be evaluated for web, WhatsApp, email, voice and customer portals. It can also integrate with the CRM, calendar or booking system the company already uses. For technical visits, Google Calendar is the first planned connector, with an architecture ready for other schedulers." },
      ],
    },
  },
  it: {
    controls: { showMoreProblems: "Vedi più problemi...", showMoreIndustries: "Vedi più settori...", showMoreFaq: "Vedi più domande frequenti...", showLess: "Mostra meno" },
    nav: { problem: "Problemi/Soluzioni", solution: "Soluzione", cases: "Casi d'uso", demo: "Demo", manuals: "Manuali", pricing: "Simulatore prezzi", comparison: "Confronto", quote: "Richiedi valutazione" },
    hero: {
      eyebrow: "",
      titleParts: [
        { text: "Supporto tecnico coerente, anche quando la " },
        { text: "conoscenza è dispersa", highlight: true },
        { text: "." },
      ],
      body: "Trasforma manuali, procedure ed esperienza tecnica in risposte chiare, diagnosi guidate e passaggio a un esperto umano quando serve. Pensato per produttori, distributori e team postvendita che hanno bisogno di supporto tecnico più coerente.",
      primary: "Richiedi valutazione",
      secondary: "Prova demo",
      tertiary: "Stima prezzo",
      proof: ["Supporto tecnico di qualità", "Meno dipendenza individuale", "Diagnosi ripetibili"],
      visualTitle: "Assistente virtuale Talkey",
    },
    problem: {
      kicker: "Problemi reali",
      title: "Il vero problema non sono le chiamate. È la conoscenza.",
      body: "",
      signalsTitle: "Segnali frequenti",
      consequencesTitle: "Conseguenze operative",
      bullets: ["Risposte incoerenti", "Informazione dispersa", "Diagnosi diverse per lo stesso problema", "Manuali difficili da usare", "Passaggi non necessari", "Visite tecniche evitabili"],
      consequences: ["Aumenta il tempo di risoluzione", "Sale il costo per caso", "Scende la soddisfazione clienti", "Cresce la dipendenza da agenti specifici"],
      customerImpact: {
        title: "Quando la conoscenza è dispersa, il cliente se ne accorge.",
        text: "Talkey trasforma conoscenza dispersa in una base approvata di risposte, criteri e procedure affinché il cliente riceva supporto coerente dal primo contatto.",
      },
      pairTitleProblem: "Problema",
      pairTitleSolution: "Come lo risolve l'assistente virtuale Talkey",
      pairs: [
        { problem: "Clienti in attesa di essere assistiti", solution: "Talkey è disponibile 24/7 per iniziare subito l'assistenza via chat o con voce se il cliente chiama al telefono, con risposte pazienti e coerenti basate su conoscenza approvata." },
        { problem: "Il cliente torna con un problema già segnalato", solution: "Talkey può usare lo storico individuale di quel cliente, quando disponibile, così l'assistenza non riparte da zero e continua con più contesto." },
        { problem: "Il cliente non sa esattamente quale modello o prodotto possiede", solution: "Talkey identifica il prodotto da una foto dell'etichetta, QR o numero di serie, guida la diagnosi e risolve o passa il caso con contesto." },
        { problem: "Casi semplici finiscono da specialisti", solution: "Talkey applica criteri comuni, risolve prima i casi frequenti e passa il caso a una persona quando ci sono rischio, bassa certezza o complessità reale." },
        { problem: "I manuali esistono, ma nessuno li usa durante una chiamata", solution: "Talkey trasforma documentazione tecnica in risposte chiare e azioni concrete, e può guidare l'operatore umano durante le chiamate telefoniche." },
        { problem: "Ogni operatore risponde in modo diverso", solution: "Talkey risponde usando conoscenza approvata e mantiene lo stesso criterio per casi equivalenti." },
        { problem: "I tecnici senior sanno cose non documentate", solution: "Talkey trasforma esperienza individuale in conoscenza riutilizzabile dall'azienda." },
        { problem: "I tecnici vengono inviati troppo presto", solution: "Talkey migliora la diagnosi remota prima di inviare una persona sul posto." },
      ],
    },
    solution: {
      kicker: "Come Talkey lo risolve",
      title: "Trasforma conoscenza tecnica in un sistema di supporto coerente.",
      body: "Talkey organizza la conoscenza che l'azienda già possiede e la trasforma in risposte, diagnosi guidate e criteri di passaggio a una persona.",
      items: [
        { title: "Centralizza conoscenza", text: "Manuali, schede tecniche, procedure, troubleshooting e FAQ in una base utile per il supporto." },
        { title: "Standardizza risposte", text: "Lo stesso problema deve produrre la stessa risposta, indipendentemente da chi risponde." },
        { title: "Rileva il modello da una foto", text: "Riconosce il modello da una foto scattata dal cliente con il cellulare." },
        { title: "Guida chiamate tecniche", text: "Durante una chiamata, guida l'operatore umano con passi chiari per risolvere o passare il caso con criterio." },
        { title: "Supporta chat o voce", text: "La versione vocale permette di parlare con Talkey come con un agente senior: paziente, coerente e basato sulla conoscenza approvata dall'azienda. Quando serve, passa il caso all'esperto umano giusto con contesto." },
      ],
    },
    managerConcerns: {
      kicker: "Per responsabili supporto",
      title: "Cosa deve controllare un responsabile supporto quando cresce.",
      body: "",
      items: [
        { title: "Conoscenza critica sotto controllo", text: "Trasforma manuali, criteri tecnici ed esperienza interna in una base riutilizzabile da tutta l'operazione." },
        { title: "Passaggio con contesto", text: "Aiuta a decidere quali casi può risolvere l'assistente virtuale e quali devono arrivare a una persona, usando dati già raccolti." },
        { title: "Visibilità e produttività operativa", text: "Ordina motivi di contatto, ragioni di passaggio a una persona, tempi di supporto e lacune documentali affinché il team umano si concentri sui casi di maggior valore." },
      ],
    },
    integrations: {
      kicker: "Integrazioni",
      title: "Si collega agli strumenti che l'azienda usa già.",
      body: "Talkey non obbliga a sostituire lo stack esistente. Può convivere con CRM, calendari di prenotazione, portali clienti e sistemi interni per ricevere contesto e restituire ticket, eventi e tracciabilità.",
      items: [
        { title: "CRM e storico clienti", text: "Usa dati esistenti su cliente, prodotto, garanzia e interazioni precedenti affinché il supporto non riparta da zero." },
        { title: "Agenda visite tecniche", text: "Google Calendar è il primo connettore per prenotare visite da un caso diagnosticato; il flusso è pronto per altri sistemi di prenotazione." },
        { title: "API per la tua operazione", text: "Talkey può integrarsi con strumenti come HubSpot, Salesforce, Microsoft Bookings, Calendly o sistemi interni secondo l'ambito del progetto." },
      ],
    },
    useCases: {
      kicker: "Casi d'uso",
      title: "Talkey può applicarsi dove prodotti e servizi dipendono da documentazione e diagnosi.",
      body: "Non è una lista decorativa di settori. Ogni caso ha una necessità concreta di supporto tecnico strutturato.",
      items: [
        { title: "Scaldabagni e climatizzazione", text: "Diagnosi remota prima di inviare un tecnico." },
        { title: "Forni elettrici ed elettrodomestici", text: "Guide d'uso, installazione, guasti frequenti e garanzia." },
        { title: "Macchine industriali", text: "Procedure tecniche, sicurezza operativa e passaggio a specialisti secondo criticità." },
        { title: "Dispositivi medici", text: "Risposte coerenti e tracciabili per prodotti sensibili." },
        { title: "Miniere", text: "Supporto tecnico strutturato per macchine, procedure e operazioni sul campo." },
        { title: "Distributori e importatori", text: "Supporto uniforme con più marchi, modelli o versioni." },
        { title: "Produttori", text: "Conversione della conoscenza interna in supporto tecnico pronto a crescere." },
      ],
    },
    demo: {
      kicker: "Demo",
      title: "Prova come Talkey risponde su Talkey.",
      body: "Questa demo mostra come Talkey può rispondere a domande commerciali, tecniche e di implementazione usando conoscenza strutturata. Puoi anche aprire l'assistente flottante in qualsiasi punto del sito.",
    },
    comparison: {
      kicker: "Confronto concettuale",
      title: "Perché Talkey è diverso.",
      body: "Risolve una categoria diversa: trasformare conoscenza tecnica in supporto operativo coerente.",
      items: [
        { title: "Umani", text: "Forti in criterio, empatia e casi complessi. Da soli non risolvono variabilità, disponibilità limitata e dipendenza dalla memoria individuale." },
        { title: "Zendesk / Intercom", text: "Eccellenti per ticket, conversazioni e operazione dei team. Non risolvono da soli diagnosi tecnica o strutturazione profonda della conoscenza di prodotto." },
        { title: "ElevenLabs", text: "Forti in esperienze conversazionali e voce. Non gestiscono da soli manuali, procedure, troubleshooting o criteri di supporto tecnico." },
        { title: "Talkey", text: "Organizza conoscenza tecnica, guida diagnosi e può operare anche via voce, con risposte coerenti e consistenti basate sui criteri dei migliori dipendenti della tua azienda." },
      ],
    },
    securityPrivacy: {
      kicker: "Sicurezza e privacy",
      title: "Controllo di sicurezza per conoscenza tecnica sensibile.",
      body: "",
      items: [
        { title: "Separazione per cliente", text: "Ogni azienda lavora con la propria base di conoscenza, senza mescolare contenuti o criteri di supporto." },
        { title: "Nessun training incrociato", text: "Le conversazioni di un'azienda non vengono usate per addestrare modelli o risposte di altre aziende." },
        { title: "Permessi per ambito", text: "L'accesso alla conoscenza può essere configurato per ruoli, prodotti, canali e responsabilità." },
        { title: "Revisione tecnica e contrattuale", text: "I dati sensibili vengono trattati secondo contratto, configurazione e normativa applicabile." },
      ],
    },
    faq: {
      kicker: "Domande frequenti",
      title: "Risposte rapide prima di una valutazione.",
      items: [
        { question: "Quanto dura un'implementazione?", answer: "Dipende da prodotti, documenti, canali e validazione tecnica. La cosa corretta è valutarlo in una riunione.", cta: "Richiedi valutazione", ctaHref: "#agenda" },
        { question: "Quanto costa?", answer: "Il prezzo dipende dall'operazione. Usa il simulatore prezzi per una stima indicativa e poi richiedi una valutazione.", cta: "Vai al simulatore prezzi" },
        { question: "Talkey è un chatbot?", answer: "Non solo. L'interfaccia può sembrare una chat, ma il valore sta nell'organizzare conoscenza tecnica, applicare procedure e mantenere criteri coerenti." },
        { question: "Talkey sostituisce i miei operatori?", answer: "Non necessariamente. Può affiancare gli operatori; se l'obiettivo è ridurre il team o evitare di ampliarlo, Talkey può assorbire carico ripetitivo e fornire più contesto per i casi complessi." },
        { question: "Talkey può migliorare la soddisfazione dei miei clienti?", answer: "Sì, può aiutare. La soddisfazione del cliente tende a migliorare quando riceve risposte chiare, coerenti e tempestive, e quando i casi complessi vengono inoltrati con il giusto contesto. Talkey non promette di eliminare tutti i problemi di supporto, ma aiuta a ridurre risposte contraddittorie, attese inutili e inoltri poco preparati." },
        { question: "In quali canali può funzionare?", answer: "Può essere valutato per web, WhatsApp, email, voce e portali clienti. Può anche integrarsi con il CRM, calendario o sistema di prenotazione che l'azienda usa già. Per le visite tecniche, Google Calendar è il primo connettore previsto, con un'architettura pronta per altri agendatori." },
      ],
    },
  },
};

function getSavedLocaleFromCookie() {
  if (typeof document === "undefined") return null;

  const localeCookie = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("talkey-locale="));
  const locale = localeCookie?.split("=")[1] as MarketingLocale | undefined;

  return locale && supportedLocales.has(locale) ? locale : null;
}

function getBrowserLocale() {
  if (typeof navigator === "undefined") return "es";

  const languages = navigator.languages?.length ? navigator.languages.join(",") : navigator.language;
  return detectMarketingLocale(null, languages);
}

export function CommercialHome({
  initialLocale,
  currentYear,
  detectClientLocale = true,
  aiDemo = false,
}: {
  initialLocale: MarketingLocale;
  currentYear: number;
  detectClientLocale?: boolean;
  aiDemo?: boolean;
}) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const [clientLocaleReady, setClientLocaleReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedLists, setExpandedLists] = useState<Record<ExpandableListKey, boolean>>({
    problems: false,
    useCases: false,
    faq: false,
  });
  const copy = marketingCopy[locale];
  const narrative = narrativeContent[locale];
  const navLineBreaks = navLineBreakLabels[locale];
  const problemRows = [
    ...narrative.problem.pairs.slice(0, 4),
    { problem: narrative.problem.customerImpact.title, solution: narrative.problem.customerImpact.text },
    ...narrative.problem.pairs.slice(4),
  ];
  const visibleProblemRows = expandedLists.problems ? problemRows : problemRows.slice(0, previewItemCount);
  const visibleUseCases = expandedLists.useCases ? narrative.useCases.items : narrative.useCases.items.slice(0, previewItemCount);
  const visibleFaqItems = expandedLists.faq ? narrative.faq.items : narrative.faq.items.slice(0, previewItemCount);

  useEffect(() => {
    if (!detectClientLocale) {
      document.documentElement.lang = initialLocale;
      setClientLocaleReady(true);
      return;
    }

    const clientLocale = getSavedLocaleFromCookie() ?? getBrowserLocale();
    setLocale(clientLocale);
    document.documentElement.lang = clientLocale;
    setClientLocaleReady(true);
  }, [detectClientLocale, initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    if (!clientLocaleReady) return;
    document.cookie = `talkey-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [clientLocaleReady, locale]);

  function selectLocale(nextLocale: MarketingLocale) {
    setLocale(nextLocale);
    setMenuOpen(false);
  }

  function trackCta(eventName: string) {
    trackEvent(eventName, { locale });
  }

  function toggleExpandedList(key: ExpandableListKey) {
    setExpandedLists((current) => ({ ...current, [key]: !current[key] }));
  }

  function renderListToggle(key: ExpandableListKey, totalItems: number) {
    if (totalItems <= previewItemCount) return null;

    const isExpanded = expandedLists[key];
    const collapsedLabels: Record<ExpandableListKey, string> = {
      problems: narrative.controls.showMoreProblems,
      useCases: narrative.controls.showMoreIndustries,
      faq: narrative.controls.showMoreFaq,
    };

    return (
      <button className="mk-list-toggle" type="button" onClick={() => toggleExpandedList(key)}>
        {isExpanded ? narrative.controls.showLess : collapsedLabels[key]}
      </button>
    );
  }

  return (
    <main className={`mk-site mk-locale-${locale}`}>
      <div className="mk-ambient mk-ambient-one" />
      <div className="mk-ambient mk-ambient-two" />

      <header className="mk-header">
        <div className="mk-container mk-nav">
          <a className="mk-brand" href="#top" aria-label="Talkey home">
            <Image src="/brand/talkey-key.svg" width={345} height={158} alt="" priority />
            <Image src="/brand/talkey-wordmark.svg" width={442} height={140} alt="Talkey" priority />
          </a>
          <nav className={`mk-nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <a href="#demo" onClick={() => setMenuOpen(false)}>{narrative.nav.demo}</a>
            <Link href="/manualesdeuso" onClick={() => setMenuOpen(false)}>{narrative.nav.manuals}</Link>
            <a href="#problema" onClick={() => setMenuOpen(false)}>{narrative.nav.problem}</a>
            <a href="#casos" onClick={() => setMenuOpen(false)}><span className="mk-nav-break"><span>{navLineBreaks.cases[0]}</span><span>{navLineBreaks.cases[1]}</span></span></a>
            <a href="#precios" onClick={() => setMenuOpen(false)}><span className="mk-nav-break"><span>{navLineBreaks.pricing[0]}</span><span>{navLineBreaks.pricing[1]}</span></span></a>
            <a href="#comparacion" onClick={() => setMenuOpen(false)}>{narrative.nav.comparison}</a>
            <a className="mk-mobile-quote" href="#agenda" onClick={() => { setMenuOpen(false); trackCta("agenda_click"); }}>{narrative.nav.quote}<ArrowRight size={16} /></a>
          </nav>
          <div className="mk-nav-actions">
            <div className="mk-language" aria-label="Language selector">
              {(["es", "en", "it"] as const).map((item) => (
                <button key={item} type="button" className={locale === item ? "is-active" : ""} onClick={() => selectLocale(item)} aria-label={marketingCopy[item].languageName}>{item.toUpperCase()}</button>
              ))}
            </div>
            <a className="mk-nav-cta" href="#agenda" onClick={() => trackCta("agenda_click")}>{narrative.nav.quote}<ArrowUpRight size={16} /></a>
            <button className="mk-menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={copy.nav.menu} aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <section id="top" className="mk-hero">
        <div className="mk-hero-grid mk-container">
          <div className="mk-hero-copy">
            {narrative.hero.eyebrow && <span className="mk-eyebrow"><span /><Sparkles size={14} />{narrative.hero.eyebrow}</span>}
            <h1>
              {narrative.hero.titleParts.map((part, index) => (
                <span key={`${part.text}-${index}`} className={"highlight" in part && part.highlight ? "mk-hero-highlight" : undefined}>
                  {part.text}
                </span>
              ))}
            </h1>
            <div className="mk-hero-actions">
              <a className="mk-button mk-button-primary" href="#agenda" onClick={() => trackCta("hero_request_evaluation_click")}>{narrative.hero.primary}<ArrowUpRight size={18} /></a>
              <a className="mk-button mk-button-secondary" href="#demo" onClick={() => trackCta("hero_try_demo_click")}>{narrative.hero.secondary}<MessageSquareText size={18} /></a>
              <a className="mk-button mk-button-secondary" href="#precios" onClick={() => trackCta("hero_estimate_price_click")}>{narrative.hero.tertiary}<ArrowRight size={18} /></a>
            </div>
          </div>
          <div className="mk-hero-visual">
            <article className="mk-hero-knowledge">
              <div className="mk-hero-knowledge-top">
                <span><BookOpenText size={28} /></span>
                <div>
                  <strong>{narrative.hero.visualTitle}</strong>
                  <p>{narrative.hero.body}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="problema" className="mk-section mk-problem">
        <div className="mk-container">
          <div className="mk-section-heading">
            <div className="mk-section-label"><span>02</span>{narrative.problem.kicker}</div>
            <h2>{narrative.problem.title}</h2>
            {narrative.problem.body && <p>{narrative.problem.body}</p>}
          </div>
          <div className="mk-problem-pairs">
            <div className="mk-problem-pair-head">
              <span>{narrative.problem.pairTitleProblem}</span>
              <span>{narrative.problem.pairTitleSolution}</span>
            </div>
            {visibleProblemRows.map((item) => (
              <article key={item.problem} className="mk-problem-pair">
                <h3>{item.problem}</h3>
                <p>{item.solution}</p>
              </article>
            ))}
          </div>
          {renderListToggle("problems", problemRows.length)}
        </div>
      </section>

      <section className="mk-section mk-manager">
        <div className="mk-container">
          <div className="mk-section-heading">
            <div className="mk-section-label"><span>03</span>{narrative.managerConcerns.kicker}</div>
            <h2>{narrative.managerConcerns.title}</h2>
            {narrative.managerConcerns.body && <p>{narrative.managerConcerns.body}</p>}
          </div>
          <div className="mk-manager-grid">
            {narrative.managerConcerns.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="comparacion" className="mk-section mk-security">
        <div className="mk-container mk-security-grid">
          <div className="mk-security-copy">
            <div className="mk-section-label"><span>04</span>{narrative.comparison.kicker}</div>
            <h2>{narrative.comparison.title}</h2>
            <p>{narrative.comparison.body}</p>
          </div>
          <div className="mk-security-list">
            {narrative.comparison.items.map((item, index) => {
              const Icon = comparisonIcons[index];
              const isTalkey = item.title === "Talkey";
              const isElevenLabs = item.title === "ElevenLabs";
              return <article key={item.title}><Icon className={isTalkey ? "mk-comparison-talkey-icon" : undefined} size={isTalkey ? 42 : isElevenLabs ? 34 : 24} /><div><h3>{item.title}</h3><p>{item.text}</p></div></article>;
            })}
          </div>
        </div>
      </section>

      <section id="casos" className="mk-impact mk-use-cases">
        <div className="mk-container">
          <div className="mk-use-cases-header">
            <div>
              <div className="mk-section-label mk-section-label-dark"><span>05</span>{narrative.useCases.kicker}</div>
              <h2>{narrative.useCases.title}</h2>
            </div>
            <div className="mk-use-cases-intro">
              <p>{narrative.useCases.body}</p>
              <a href="#agenda" onClick={() => trackCta("agenda_click")}>{narrative.hero.primary}<ArrowUpRight size={18} /></a>
            </div>
          </div>
          <div className="mk-use-case-cards">
            {visibleUseCases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          {renderListToggle("useCases", narrative.useCases.items.length)}
        </div>
      </section>

      <section id="demo" className="mk-section mk-demo-section">
        <div className="mk-container mk-demo-grid">
          <div className="mk-demo-copy">
            <div className="mk-section-label"><span>06</span>{narrative.demo.kicker}</div>
            <h2>{narrative.demo.title}</h2>
            <p>{narrative.demo.body}</p>
          </div>
          <MarketingChatDemo copy={copy.chat} aiMode={aiDemo} />
        </div>
      </section>

      <PricingSimulator copy={copy.pricing} />

      <section className="mk-section mk-integrations">
        <div className="mk-container">
          <div className="mk-section-heading">
            <div className="mk-section-label"><span>08</span>{narrative.integrations.kicker}</div>
            <h2>{narrative.integrations.title}</h2>
            <p>{narrative.integrations.body}</p>
          </div>
          <div className="mk-integration-grid">
            {narrative.integrations.items.map((item, index) => {
              const Icon = integrationIcons[index];
              return (
                <article key={item.title}>
                  <span><Icon size={22} /></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mk-section mk-privacy">
        <div className="mk-container">
          <div className="mk-section-heading mk-privacy-heading">
            <div className="mk-section-label"><span>09</span>{narrative.securityPrivacy.kicker}</div>
            <h2>{narrative.securityPrivacy.title}</h2>
            {narrative.securityPrivacy.body ? <p>{narrative.securityPrivacy.body}</p> : null}
          </div>
          <div className="mk-privacy-grid">
            {narrative.securityPrivacy.items.map((item) => (
              <article key={item.title}>
                <div className="mk-privacy-icon"><ShieldCheck size={20} /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section mk-faq">
        <div className="mk-container">
          <div className="mk-section-heading">
            <div className="mk-section-label"><span>10</span>{narrative.faq.kicker}</div>
            <h2>{narrative.faq.title}</h2>
          </div>
          <div className="mk-faq-grid">
            {visibleFaqItems.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
                {"cta" in item && item.cta && (
                  <a
                    className="mk-faq-cta"
                    href={"ctaHref" in item && item.ctaHref ? item.ctaHref : "#precios"}
                    onClick={() => trackCta("ctaHref" in item && item.ctaHref === "#agenda" ? "faq_request_evaluation_click" : "faq_pricing_simulator_click")}
                  >
                    {item.cta}<ArrowRight size={16} />
                  </a>
                )}
              </article>
            ))}
          </div>
          {renderListToggle("faq", narrative.faq.items.length)}
        </div>
      </section>

      <section id="agenda" className="mk-section mk-contact">
        <div className="mk-container mk-contact-grid">
          <div className="mk-contact-copy">
            <div className="mk-section-label"><span>11</span>{copy.scheduler.kicker}</div>
            <h2>{copy.scheduler.title}</h2>
            <p>{copy.scheduler.body}</p>
            <div className="mk-contact-badge"><Globe2 size={18} /><span>ES · EN · IT</span></div>
          </div>
          <MarketingScheduler copy={copy.scheduler} />
        </div>
      </section>

      <footer className="mk-footer">
        <div className="mk-container">
          <div className="mk-footer-top">
            <a className="mk-brand mk-brand-footer" href="#top">
              <Image src="/brand/talkey-key.svg" width={345} height={158} alt="" />
              <Image src="/brand/talkey-wordmark.svg" width={442} height={140} alt="Talkey" />
            </a>
            <p>{copy.footer.line}</p>
          </div>
          <div className="mk-footer-bottom">
            <span>© {currentYear} Talkey</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
