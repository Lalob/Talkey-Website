"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Database,
  Globe2,
  Menu,
  PlugZap,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { ComparisonShowcase } from "@/components/comparison-showcase";
import { MarketingChatDemo } from "@/components/marketing-chat-demo";
import { MarketingScheduler } from "@/components/marketing-scheduler";
import { PricingSimulator } from "@/components/pricing-simulator";
import { trackEvent } from "@/lib/analytics";
import { talkeyBookingUrl } from "@/lib/booking";
import { detectMarketingLocale, marketingCopy, type MarketingLocale, type PricingSimulatorCopy } from "@/lib/marketing-copy";

const integrationIcons = [Database, CalendarCheck, PlugZap];
const supportedLocales = new Set<MarketingLocale>(["es", "en", "it"]);

const navLineBreakLabels: Record<MarketingLocale, { cases: [string, string]; pricing: [string, string] }> = {
  es: { cases: ["Casos", "de uso"], pricing: ["Precios", ""] },
  en: { cases: ["Use", "cases"], pricing: ["Pricing", "simulator"] },
  it: { cases: ["Casi", "d'uso"], pricing: ["Simulatore", "prezzi"] },
};

const previewItemCount = 3;
type ExpandableListKey = "problems" | "faq";

const supportComparisonShowcaseContent: Record<
  MarketingLocale,
  {
    sourceTitle: string;
    summaryTitle: string;
    summaryBody: string;
    advantages: string[];
  }
> = {
  es: {
    sourceTitle: "Alternativas que cubren partes del soporte",
    summaryTitle: "Talkey hace todo eso + diagnóstico técnico con contexto.",
    summaryBody:
      "No es solo tickets, voz o una base de conocimiento: une identificación de producto, conocimiento aprobado, diagnóstico guiado y derivación preparada.",
    advantages: [
      "Reconoce el producto por foto de etiqueta, QR o número de serie tomada con el celular.",
      "Convierte manuales, procedimientos y troubleshootings en diagnóstico guiado.",
      "Responde desde conocimiento aprobado e historial del cliente, no desde cero.",
      "Ayuda al agente humano con resumen, prioridad, responsable, ETA, duplicados y respuesta inicial.",
      "Resuelve o deriva con contexto cuando hace falta un especialista.",
      "Puede sugerir convertir casos cerrados en artículos reutilizables de base de conocimiento.",
    ],
  },
  en: {
    sourceTitle: "Alternatives that cover parts of support",
    summaryTitle: "Talkey does all that + technical diagnosis with context.",
    summaryBody:
      "It is not only tickets, voice or a knowledge base: it connects product identification, approved knowledge, guided diagnosis and prepared handoff.",
    advantages: [
      "Recognizes the product from a label, QR code or serial number photo taken with a phone.",
      "Turns manuals, procedures and troubleshootings into guided diagnosis.",
      "Answers from approved knowledge and customer history, not from scratch.",
      "Helps human agents with summary, priority, owner, ETA, duplicates and initial response.",
      "Resolves or hands off with context when a specialist is needed.",
      "Can suggest turning closed cases into reusable knowledge base articles.",
    ],
  },
  it: {
    sourceTitle: "Alternative che coprono parti del supporto",
    summaryTitle: "Talkey fa tutto questo + diagnosi tecnica con contesto.",
    summaryBody:
      "Non è solo ticket, voce o una base di conoscenza: collega identificazione del prodotto, conoscenza approvata, diagnosi guidata e passaggio preparato.",
    advantages: [
      "Riconosce il prodotto da una foto di etichetta, QR o numero di serie scattata con il cellulare.",
      "Trasforma manuali, procedure e troubleshooting in diagnosi guidata.",
      "Risponde da conoscenza approvata e storico cliente, non da zero.",
      "Aiuta gli agenti umani con riepilogo, priorità, responsabile, ETA, duplicati e risposta iniziale.",
      "Risolve o passa il caso con contesto quando serve uno specialista.",
      "Può suggerire di trasformare casi chiusi in articoli riutilizzabili di knowledge base.",
    ],
  },
};

const supportPricingPackages = [
  {
    name: "Talkey Base",
    description:
      "Para empresas que quieren ordenar conversaciones entrantes y empezar con una operación comercial o de soporte más clara.",
    price: "$590.000 CLP",
    setup: "Implementación desde $850.000 CLP (se paga solo una vez)",
    highlighted: false,
    features: [
      "Una solución: Talkey Soporte Técnico o Talkey Ventas",
      "1.500 conversaciones incluidas",
      "Hasta 3 usuarios internos",
      "Talkey Editor para conocimiento base",
      "CRM operativo básico: contactos, conversaciones, estados, responsables y próximos pasos",
      "Tickets básicos o pipeline básico, según la suite elegida",
      "Una integración estándar",
      "Exportación de datos",
      "Soporte estándar",
    ],
  },
  {
    name: "Talkey Pro",
    description:
      "Para equipos que necesitan unir ventas, soporte técnico, seguimiento, diagnóstico y operación en un solo flujo.",
    price: "$990.000 CLP",
    setup: "Implementación desde $1.300.000 CLP (se paga solo una vez)",
    highlighted: true,
    features: [
      "Talkey Ventas + Talkey Soporte Técnico",
      "4.000 conversaciones incluidas",
      "Hasta 8 usuarios internos",
      "Pipeline comercial",
      "Scoring de leads",
      "Seguimiento y próximos pasos",
      "Diagnóstico guiado de soporte",
      "Base técnica editable",
      "Consola de tickets",
      "Respuesta sugerida",
      "Handoff ventas → soporte",
      "Resumen IA del caso",
      "Detección de duplicados",
      "Integración CRM/calendario/API estándar",
      "Dashboard operacional",
    ],
  },
  {
    name: "Talkey Enterprise",
    description:
      "Para operaciones más grandes o complejas, con múltiples equipos, integraciones, permisos, control avanzado y acompañamiento cercano.",
    price: "Desde $2.900.000 CLP",
    setup: "Implementación a medida (se paga solo una vez)",
    highlighted: false,
    features: [
      "Volumen personalizado",
      "Múltiples soluciones o unidades de negocio",
      "Más de 10 usuarios o usuarios personalizados",
      "Integraciones CRM/API avanzadas",
      "Permisos por rol, producto, cliente o equipo",
      "Talkey Editor avanzado",
      "Flujos internos personalizados",
      "Seguridad, trazabilidad y control por alcance",
      "Soporte prioritario",
      "Revisión operacional mensual",
      "Acompañamiento ejecutivo",
    ],
  },
];

const narrativeContent = {
  es: {
    controls: { showMoreProblems: "Ver más problemas/soluciones...", showMoreComparisons: "Ver más comparaciones...", showMoreIndustries: "Ver más industrias...", showMoreFaq: "Ver más preguntas frecuentes...", showLess: "Ver menos..." },
    nav: { problem: "Problemas/Soluciones", solution: "Solución", cases: "Casos de uso", demo: "Demo", manuals: "Manuales", pricing: "Precios", comparison: "Comparación", quote: "Agendar diagnóstico de 30 min" },
    hero: {
      eyebrow: "",
      titleParts: [
        { text: "Soporte técnico que no parte de cero" },
      ],
      body: "Talkey convierte manuales, procedimientos e historial en respuestas consistentes, diagnóstico guiado y derivación con contexto.",
      primary: "Agendar diagnóstico de 30 min",
      secondary: "Ver demo de caso técnico",
      tertiary: "Ver precios",
      proof: ["Soporte técnico de calidad", "Menos dependencia individual", "Diagnósticos repetibles"],
      visualTitle: "Asistente virtual Talkey",
      demoPrompt: "Prueba cómo Talkey resolvería un problema con un aparato de tu casa que elijas.",
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
      pairTitleSolution: "Cómo lo resuelve Talkey Soporte Técnico",
      pairs: [
        { problem: "Clientes esperando a ser atendidos", solution: "Talkey está disponible 24/7 para iniciar la atención de inmediato por chat o por voz si el cliente llama por teléfono, con respuestas pacientes, consistentes y basadas en conocimiento aprobado." },
        { problem: "El cliente vuelve a consultar por un problema ya reportado", solution: "Talkey puede usar el historial individual de ese cliente, cuando está disponible, para que la atención no parta desde cero y continúe con más contexto." },
        { problem: "El cliente no sabe exactamente qué modelo o producto tiene", solution: "Talkey identifica el producto desde una foto de la etiqueta, QR o número de serie, guía el diagnóstico y resuelve o deriva el caso con contexto." },
        { problem: "Casos simples terminan derivados a especialistas", solution: "Talkey aplica criterios comunes, intenta resolver casos frecuentes y deriva solo cuando hay riesgo, baja certeza o complejidad real." },
        { problem: "Los manuales existen, pero nadie los usa durante una llamada", solution: "Talkey transforma documentación técnica en respuestas claras y acciones concretas. También funciona como copiloto para agentes humanos: resume el ticket, sugiere prioridad, responsable, ETA y una respuesta inicial." },
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
        { title: "Conocimiento crítico bajo control", text: "Convierte manuales, criterios técnicos y experiencia interna en una base reutilizable por toda la operación. Cuando un caso se cierra, Talkey puede sugerir convertir la solución en un artículo reutilizable de base de conocimiento." },
        { title: "Derivación con contexto", text: "Ayuda a decidir qué casos puede resolver el asistente virtual y cuáles deben llegar a una persona, usando datos ya levantados." },
        { title: "Visibilidad y productividad operativa", text: "Ordena motivos de consulta, razones de derivación, tiempos y brechas de documentación para que el equipo humano se concentre en casos de mayor valor." },
      ],
    },
    integrations: {
      kicker: "Integraciones",
      title: "Se conecta a las herramientas que la empresa ya usa.",
      body: "Talkey puede operar con un CRM completo e inteligente para clientes, tickets e historial, pero no obliga a reemplazar tus herramientas actuales.",
      items: [
        { title: "CRM e historial de clientes", text: "Usa datos existentes del cliente, producto, garantía e interacciones previas para que el soporte no parta desde cero." },
        { title: "Agenda de visitas técnicas", text: "Google Calendar es nuestro conector predilecto para agendar visitas desde un caso diagnosticado, pero nuestro flujo está preparado para integrarse con cualquier sistema de reservas." },
        { title: "API para tu operación", text: "Talkey puede integrarse con herramientas como HubSpot, Salesforce, Microsoft Bookings, Calendly o sistemas propios según el alcance del proyecto." },
      ],
    },
    useCases: {
      kicker: "Casos de uso",
      title: "Talkey puede aplicarse donde los productos y servicios dependen de documentación y diagnóstico.",
      body: "No se trata de una lista decorativa de industrias. Cada caso tiene una necesidad concreta de soporte técnico estructurado.",
      items: [
        { title: "Calefones y climatización", text: "Diagnóstico remoto antes de enviar un técnico." },
        { title: "Servicios técnicos multi-marca", text: "Casos mejor levantados desde el primer contacto, incluso cuando se atienden múltiples marcas y modelos." },
        { title: "Distribuidores e importadores", text: "Soporte uniforme aunque trabajen con múltiples marcas, modelos o versiones." },
        { title: "Equipos industriales", text: "Criticidad, manuales y derivación experta para procedimientos técnicos y operación sensible." },
        { title: "Electrodomésticos y línea blanca", text: "Garantías, fallas frecuentes y postventa ordenada." },
        { title: "Equipamiento gastronómico / HoReCa", text: "Diagnóstico y derivación para equipos de cocina, frío, lavado y operación diaria." },
        { title: "Equipos médicos", text: "Respuestas consistentes y trazables para productos sensibles." },
        { title: "Minería", text: "Soporte técnico estructurado para equipos, procedimientos y operación en terreno." },
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
        { title: "Equipo humano solamente", text: "Talkey reduce la dependencia de personas específicas y mantiene criterios consistentes incluso cuando cambia el agente." },
        { title: "Software de tickets / helpdesk", text: "Talkey no solo ordena casos: ayuda al agente con resumen automático, prioridad, responsable sugerido, ETA, duplicados y respuesta inicial." },
        { title: "Chatbot genérico", text: "Talkey responde desde conocimiento aprobado de la empresa, no desde respuestas genéricas o improvisadas." },
        { title: "Herramientas de voz", text: "Talkey puede operar por voz, pero además entiende productos, manuales, síntomas, procedimientos e historial del cliente." },
        { title: "Base de conocimiento tradicional", text: "Talkey convierte documentación en respuestas operativas, no solo en artículos que el cliente debe buscar por su cuenta." },
      ],
    },
    securityPrivacy: {
      kicker: "Seguridad y privacidad",
      title: "Control para soporte técnico sensible",
      body: "",
      dataOwnership:
        "En Talkey, tus datos son tuyos. Puedes exportar tickets, conversaciones, historial, documentos técnicos, estados, responsables y decisiones de derivación en formatos utilizables cuando quieras. No bloqueamos tu operación si decides irte.",
      items: [
        { title: "Conocimiento separado por cliente", text: "Cada empresa trabaja con su propia base de conocimiento, criterios y procedimientos, sin mezclar información con otros clientes." },
        { title: "Sin entrenamiento cruzado", text: "Las conversaciones y documentos de una empresa no se usan para entrenar respuestas de otra empresa." },
        { title: "Permisos por alcance", text: "El acceso puede limitarse por rol, producto, canal o responsabilidad del equipo." },
        { title: "Validación humana en garantías, seguridad y procedimientos sensibles", text: "Cuando un caso puede afectar garantía, seguridad o un procedimiento crítico, Talkey deja contexto y deriva a una persona autorizada." },
      ],
    },
    faq: {
      kicker: "Preguntas frecuentes",
      title: "Respuestas rápidas antes de una evaluación.",
      items: [
        { question: "¿Cuánto demora una implementación?", answer: "Depende del volumen de productos, documentos, canales y validación técnica. Lo correcto es revisarlo en una evaluación.", cta: "Agendar diagnóstico de 30 min", ctaHref: talkeyBookingUrl },
        { question: "¿Cuánto cuesta?", answer: "El precio depende del volumen, canales, documentación, integraciones y nivel de acompañamiento requerido. Revisa los paquetes referenciales y luego solicita una evaluación para ajustar alcance y precio final.", cta: "Ver paquetes de precios" },
        { question: "¿Talkey ayuda también al equipo interno?", answer: "Sí. Además de asistir al cliente, Talkey puede actuar como copiloto operativo para agentes: resume tickets, sugiere prioridad, responsable, próximos pasos y respuestas iniciales." },
        { question: "¿Talkey es un chatbot?", answer: "No solamente. La interfaz puede parecer un chat, pero el valor está en organizar conocimiento técnico, aplicar procedimientos y mantener criterios de soporte." },
        { question: "¿Talkey reemplaza a mis agentes?", answer: "No necesariamente. Puede complementar a tus agentes; si tu objetivo es reducir dotación o evitar seguir ampliándola, Talkey puede absorber carga repetitiva y entregar más contexto para casos complejos." },
        { question: "¿Talkey puede mejorar la satisfacción de mis clientes?", answer: "Sí, puede ayudar. La satisfacción del cliente suele mejorar cuando recibe respuestas claras, consistentes y oportunas, y cuando los casos complejos se derivan con buen contexto. Talkey no promete eliminar todos los problemas de soporte, pero sí ayuda a reducir respuestas contradictorias, esperas innecesarias y derivaciones mal preparadas." },
        { question: "¿En qué canales puede funcionar?", answer: "Puede evaluarse para web, WhatsApp, email, voz y portales de clientes. También puede integrarse al CRM, calendario o sistema de agendamiento que ya use la empresa. Para visitas técnicas, Google Calendar es el primer conector previsto, con una arquitectura preparada para otros agendadores." },
      ],
    },
  },
  en: {
    controls: { showMoreProblems: "Show more problems...", showMoreComparisons: "Show more comparisons...", showMoreIndustries: "Show more industries...", showMoreFaq: "Show more frequently asked questions...", showLess: "Show less..." },
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
      demoPrompt: "Try how Talkey would solve a problem with any home appliance you choose.",
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
        { title: "Human team only", text: "Reduces dependency on specific people and keeps criteria consistent even when the agent changes." },
        { title: "Ticketing software / helpdesk", text: "Does not only organize cases: it helps resolve them with technical knowledge, guided diagnosis and handoff with context." },
        { title: "Generic chatbot", text: "Answers from approved company knowledge instead of generic or improvised responses." },
        { title: "Voice tools", text: "Can operate by voice, but also understands products, manuals, symptoms, procedures and customer history." },
        { title: "Traditional knowledge base", text: "Turns documentation into operational answers, not just articles the customer has to search on their own." },
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
        { question: "How long does implementation take?", answer: "It depends on products, documents, channels and technical validation. The right next step is to review it in an evaluation.", cta: "Request evaluation", ctaHref: talkeyBookingUrl },
        { question: "How much does it cost?", answer: "Pricing depends on the operation. Use the pricing simulator for a reference estimate, then request an evaluation.", cta: "Go to pricing simulator" },
        { question: "Is Talkey a chatbot?", answer: "Not only. The interface can look like chat, but the value is in organizing technical knowledge, applying procedures and keeping support criteria consistent." },
        { question: "Does Talkey replace my agents?", answer: "Not necessarily. It can complement your agents; if your goal is to reduce headcount or avoid expanding it, Talkey can absorb repetitive load and provide more context for complex cases." },
        { question: "Can Talkey improve customer satisfaction?", answer: "Yes, it can help. Customer satisfaction often improves when people receive clear, consistent, and timely answers, and when complex cases are handed off with proper context. Talkey does not promise to eliminate every support problem, but it helps reduce contradictory answers, unnecessary waiting, and poorly prepared handoffs." },
        { question: "Which channels can it support?", answer: "It can be evaluated for web, WhatsApp, email, voice and customer portals. It can also integrate with the CRM, calendar or booking system the company already uses. For technical visits, Google Calendar is the first planned connector, with an architecture ready for other schedulers." },
      ],
    },
  },
  it: {
    controls: { showMoreProblems: "Vedi più problemi...", showMoreComparisons: "Vedi più confronti...", showMoreIndustries: "Vedi più settori...", showMoreFaq: "Vedi più domande frequenti...", showLess: "Mostra meno..." },
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
      demoPrompt: "Prova come Talkey risolverebbe un problema con un qualsiasi apparecchio di casa tua.",
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
        { title: "Solo team umano", text: "Riduce la dipendenza da persone specifiche e mantiene criteri coerenti anche quando cambia l'agente." },
        { title: "Software di ticket / helpdesk", text: "Non si limita a organizzare casi: aiuta a risolverli con conoscenza tecnica, diagnosi guidata e passaggio con contesto." },
        { title: "Chatbot generico", text: "Risponde dalla conoscenza approvata dell'azienda, non da risposte generiche o improvvisate." },
        { title: "Strumenti vocali", text: "Può operare via voce, ma comprende anche prodotti, manuali, sintomi, procedure e storico del cliente." },
        { title: "Base di conoscenza tradizionale", text: "Trasforma la documentazione in risposte operative, non solo in articoli che il cliente deve cercare da solo." },
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
        { question: "Quanto dura un'implementazione?", answer: "Dipende da prodotti, documenti, canali e validazione tecnica. La cosa corretta è valutarlo in una riunione.", cta: "Richiedi valutazione", ctaHref: talkeyBookingUrl },
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

export function ArchivedSupportPricingSimulator({ copy }: { copy: PricingSimulatorCopy }) {
  return <PricingSimulator copy={copy} />;
}

function SupportPricingPackagesSection() {
  return (
    <section id="precios" className="mk-section mk-sales-pricing-section mk-support-package-pricing">
      <div className="mk-container">
        <div className="mk-section-heading">
          <div className="mk-section-label"><span>08</span>Precios</div>
          <h2>Paquetes para partir con soporte técnico estructurado.</h2>
          <p>
            Los valores son referenciales. Talkey se posiciona como una solución premium porque une asistente virtual,
            conocimiento técnico, consola para agentes humanos, trazabilidad y continuidad operacional.
          </p>
        </div>
        <div className="mk-package-grid">
          {supportPricingPackages.map((plan) => (
            <article className={plan.highlighted ? "is-highlighted" : ""} key={plan.name}>
              <h3>{plan.name}</h3>
              <p className="mk-package-description">{plan.description}</p>
              <strong>{plan.price} <span>al mes</span></strong>
              <small>{plan.setup}</small>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}><BadgeCheck size={17} />{feature}</li>
                ))}
              </ul>
              <a href={talkeyBookingUrl} target="_blank" rel="noopener noreferrer">Agendar diagnóstico de 30 min <ArrowRight size={16} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CommercialHome({
  initialLocale,
  currentYear,
  detectClientLocale = true,
  aiDemo = false,
  platformHomeHref,
}: {
  initialLocale: MarketingLocale;
  currentYear: number;
  detectClientLocale?: boolean;
  aiDemo?: boolean;
  platformHomeHref?: string;
}) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const [clientLocaleReady, setClientLocaleReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedLists, setExpandedLists] = useState<Record<ExpandableListKey, boolean>>({
    problems: false,
    faq: false,
  });
  const expandedListOpenScrollY = useRef<Partial<Record<ExpandableListKey, number>>>({});
  const copy = marketingCopy[locale];
  const narrative = narrativeContent[locale];
  const navLineBreaks = navLineBreakLabels[locale];
  const problemRows = [
    ...narrative.problem.pairs.slice(0, 4),
    { problem: narrative.problem.customerImpact.title, solution: narrative.problem.customerImpact.text },
    ...narrative.problem.pairs.slice(4),
  ];
  const visibleProblemRows = expandedLists.problems ? problemRows : problemRows.slice(0, previewItemCount);
  const visibleFaqItems = expandedLists.faq ? narrative.faq.items : narrative.faq.items.slice(0, previewItemCount);
  const supportComparisonShowcase = supportComparisonShowcaseContent[locale];

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
    const isExpanded = expandedLists[key];

    if (!isExpanded) {
      expandedListOpenScrollY.current[key] = window.scrollY;
      setExpandedLists((current) => ({ ...current, [key]: true }));
      return;
    }

    const targetScrollY = expandedListOpenScrollY.current[key] ?? window.scrollY;
    setExpandedLists((current) => ({ ...current, [key]: false }));
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: Math.max(0, targetScrollY), behavior: "auto" });
      });
    });
  }

  function renderListToggle(key: ExpandableListKey, totalItems: number) {
    if (totalItems <= previewItemCount) return null;

    const isExpanded = expandedLists[key];
    const collapsedLabels: Record<ExpandableListKey, string> = {
      problems: narrative.controls.showMoreProblems,
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
            {platformHomeHref && <Link href={platformHomeHref} onClick={() => setMenuOpen(false)}>Inicio</Link>}
            <a href="#problema" onClick={() => setMenuOpen(false)}>{narrative.nav.problem}</a>
            <a href="#comparacion" onClick={() => setMenuOpen(false)}>{narrative.nav.comparison}</a>
            <a href="#precios" onClick={() => setMenuOpen(false)}>
              {navLineBreaks.pricing[1] ? (
                <span className="mk-nav-break"><span>{navLineBreaks.pricing[0]}</span><span>{navLineBreaks.pricing[1]}</span></span>
              ) : narrative.nav.pricing}
            </a>
            <Link href="/manuales" onClick={() => setMenuOpen(false)}>{narrative.nav.manuals}</Link>
            <a className="mk-mobile-quote" href={talkeyBookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => { setMenuOpen(false); trackCta("agenda_click"); }}>{narrative.nav.quote}<ArrowRight size={16} /></a>
          </nav>
          <div className="mk-nav-actions">
            <div className="mk-language" aria-label="Language selector">
              {(["es", "en", "it"] as const).map((item) => (
                <button key={item} type="button" className={locale === item ? "is-active" : ""} onClick={() => selectLocale(item)} aria-label={marketingCopy[item].languageName}>{item.toUpperCase()}</button>
              ))}
            </div>
            <a className="mk-nav-cta" href={talkeyBookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackCta("agenda_click")}>{narrative.nav.quote}<ArrowUpRight size={16} /></a>
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
            <p className="mk-hero-subtitle">{narrative.hero.body}</p>
            <div className="mk-hero-actions">
              <a className="mk-button mk-button-primary" href={talkeyBookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackCta("hero_request_evaluation_click")}>{narrative.hero.primary}<ArrowUpRight size={18} /></a>
              <a className="mk-button mk-button-secondary" href="#precios" onClick={() => trackCta("hero_estimate_price_click")}>{narrative.hero.tertiary}<ArrowRight size={18} /></a>
            </div>
          </div>
          <div className="mk-hero-visual">
            <div id="demo-hero" className="mk-hero-demo-panel">
              <MarketingChatDemo copy={copy.chat} aiMode={aiDemo} />
              <div className="mk-hero-demo-callout">
                <p>{narrative.hero.demoPrompt}</p>
                <ArrowRight size={36} aria-hidden="true" />
              </div>
            </div>
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
        <div className="mk-container">
          <div className="mk-section-heading mk-comparison-showcase-heading">
            <div className="mk-section-label"><span>04</span>{narrative.comparison.kicker}</div>
            <h2>{narrative.comparison.title}</h2>
            <p>{narrative.comparison.body}</p>
          </div>
          <ComparisonShowcase
            sourceTitle={supportComparisonShowcase.sourceTitle}
            items={narrative.comparison.items}
            summaryTitle={supportComparisonShowcase.summaryTitle}
            summaryBody={supportComparisonShowcase.summaryBody}
            advantages={supportComparisonShowcase.advantages}
            variant="support"
          />
        </div>
      </section>

      <section className="mk-section mk-privacy">
        <div className="mk-container">
          <div className="mk-section-heading mk-privacy-heading">
            <div className="mk-section-label"><span>05</span>{narrative.securityPrivacy.kicker}</div>
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
          {"dataOwnership" in narrative.securityPrivacy && narrative.securityPrivacy.dataOwnership ? (
            <div className="mk-privacy-data-note">
              <ShieldCheck size={22} />
              <p>{narrative.securityPrivacy.dataOwnership}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mk-section mk-integrations">
        <div className="mk-container">
          <div className="mk-section-heading">
            <div className="mk-section-label"><span>06</span>{narrative.integrations.kicker}</div>
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

      <section className="mk-section mk-faq">
        <div className="mk-container">
          <div className="mk-section-heading">
            <div className="mk-section-label"><span>07</span>{narrative.faq.kicker}</div>
            <h2>{narrative.faq.title}</h2>
          </div>
          <div className="mk-faq-grid">
            {visibleFaqItems.map((item) => {
              const ctaHref = "ctaHref" in item && item.ctaHref ? item.ctaHref : "#precios";
              const ctaExternal = ctaHref.startsWith("http");

              return (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                  {"cta" in item && item.cta && (
                    <a
                      className="mk-faq-cta"
                      href={ctaHref}
                      target={ctaExternal ? "_blank" : undefined}
                      rel={ctaExternal ? "noopener noreferrer" : undefined}
                      onClick={() => trackCta(ctaHref === talkeyBookingUrl ? "faq_request_evaluation_click" : "faq_pricing_packages_click")}
                    >
                      {item.cta}<ArrowRight size={16} />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
          {renderListToggle("faq", narrative.faq.items.length)}
        </div>
      </section>

      {locale === "es" ? <SupportPricingPackagesSection /> : <ArchivedSupportPricingSimulator copy={copy.pricing} />}

      <section id="agenda" className="mk-section mk-contact">
        <div className="mk-container mk-contact-grid">
          <div className="mk-contact-copy">
            <div className="mk-section-label"><span>09</span>{copy.scheduler.kicker}</div>
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
