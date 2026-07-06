import Image from "next/image";
import Link from "next/link";
import { MarketingChatDemo } from "@/components/marketing-chat-demo";
import { DemoPanel, type DemoOption } from "@/components/platform-demo-panel";
import { SalesProblemTable } from "@/components/sales-problem-table";
import { marketingCopy } from "@/lib/marketing-copy";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Briefcase,
  Calendar,
  Database,
  FileText,
  Gauge,
  Headphones,
  LineChart,
  MessageSquare,
  Phone,
  RefreshCw,
  ShieldCheck,
  Tags,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SuiteKey = "ventas" | "soporte";

const products: Array<{
  key: SuiteKey;
  name: string;
  href: string;
  kicker: string;
  value: string;
  proof: string[];
  metric: string;
  icon: LucideIcon;
}> = [
  {
    key: "ventas",
    name: "Talkey Suite Ventas",
    href: "/ventas",
    kicker: "Conversaciones que venden",
    value:
      "Convierte conversaciones entrantes en oportunidades priorizadas, con seguimiento comercial automatizado y próximos pasos claros para cerrar más ventas.",
    proof: ["Pipeline vivo", "Scoring comercial", "Seguimiento automático"],
    metric: "Ventas",
    icon: Briefcase,
  },
  {
    key: "soporte",
    name: "Talkey Suite Soporte Técnico",
    href: "/soporte-tecnico",
    kicker: "Soporte que fideliza",
    value:
      "Convierte problemas técnicos en respuestas consistentes, diagnóstico guiado y derivación con contexto para proteger la experiencia del cliente.",
    proof: ["Diagnóstico guiado", "Historial por cliente", "Derivación técnica"],
    metric: "Soporte",
    icon: Headphones,
  },
];

const pricing = [
  {
    name: "Base",
    description:
      "Para empresas que quieren ordenar conversaciones entrantes, calificar leads y empezar con automatización comercial clara.",
    price: "$650.000 CLP",
    detail: "al mes",
    setup: "Implementación desde $850.000 CLP",
    highlighted: false,
    features: [
      "Una suite: Ventas o Soporte Técnico",
      "1.500 conversaciones incluidas",
      "Talkey Editor para conocimiento base",
      "3 usuarios internos",
      "Integraciones estándar",
    ],
  },
  {
    name: "Avanzado",
    description:
      "Para equipos que ya tienen más volumen, varios canales, seguimiento activo, scoring y necesidad de conectar mejor ventas con operación.",
    price: "$950.000 CLP",
    detail: "al mes",
    setup: "Implementación desde $1.300.000 CLP",
    highlighted: true,
    features: [
      "Suite Ventas + Suite Soporte Técnico",
      "4.000 conversaciones incluidas",
      "Pipeline, scoring, seguimiento y handoff a soporte",
      "Diagnóstico guiado y base técnica editable",
      "8 usuarios internos",
    ],
  },
  {
    name: "Enterprise",
    description:
      "Para operaciones más grandes o complejas, con integraciones, múltiples equipos, permisos, control avanzado y acompañamiento más cercano.",
    price: "Desde $3.200.000 CLP",
    detail: "al mes",
    setup: "Implementación a medida",
    highlighted: false,
    features: [
      "Volumen, usuarios y suites personalizados",
      "Integraciones CRM/API y flujos internos",
      "Talkey Editor avanzado y control por equipos",
      "Soporte prioritario y revisión operacional",
      "Seguridad, permisos y trazabilidad por alcance",
    ],
  },
];

const suiteContent: Record<
  SuiteKey,
  {
    eyebrow: string;
    title: string;
    body: string;
    heroMetric: string;
    heroMetricText: string;
    icon: LucideIcon;
    features: Array<{ icon: LucideIcon; title: string; text: string }>;
    workflow: string[];
    demoTitle: string;
    demoBody: string;
    demoOptions: DemoOption[];
    comparison: Array<{ title: string; text: string }>;
    nextTitle: string;
    nextBody: string;
  }
> = {
  ventas: {
    eyebrow: "Talkey Suite Ventas",
    title: "Convierte conversaciones comerciales en oportunidades que avanzan.",
    body:
      "Talkey Ventas atiende, califica, prioriza y organiza leads para que el equipo comercial trabaje con mejor contexto y menos seguimiento manual.",
    heroMetric: "24/7",
    heroMetricText: "captura, calificación y seguimiento comercial",
    icon: Briefcase,
    features: [
      { icon: LineChart, title: "Pipeline de prospectos", text: "Convierte conversaciones en etapas comerciales claras, con estado, origen y próximo paso." },
      { icon: Gauge, title: "Scoring y prioridad", text: "Prioriza oportunidades según urgencia, intención, fit, presupuesto, repetición y potencial." },
      { icon: Tags, title: "Cotizaciones y propuestas", text: "Ayuda a levantar datos mínimos para cotizar y dejar lista la información que necesita ventas." },
      { icon: RefreshCw, title: "Seguimiento inteligente", text: "Mantiene oportunidades vivas con recordatorios, respuestas y próximos pasos definidos." },
      { icon: Users, title: "Leads repetidos", text: "Detecta contactos duplicados o recurrentes para no tratar cada conversación como si fuera nueva." },
      { icon: RefreshCw, title: "Handoff hacia soporte", text: "Cuando una venta se gana, pasa el contexto relevante a soporte o postventa." },
      { icon: Bot, title: "Asistente comercial", text: "Sugiere próximos pasos, objeciones a resolver y acciones para que el ejecutivo avance mejor." },
      { icon: Calendar, title: "Agenda y reuniones", text: "Puede coordinar evaluaciones, demos o llamadas comerciales según disponibilidad." },
    ],
    workflow: ["Lead entra", "Talkey conversa", "Califica", "Prioriza", "Cotiza", "Hace seguimiento"],
    demoTitle: "Demo de Talkey Ventas",
    demoBody:
      "Simula cómo Talkey toma una conversación comercial y la convierte en oportunidad, prioridad y próximo paso.",
    demoOptions: [
      {
        label: "Lead pide precio",
        messages: [
          ["visitor", "Hola, quiero saber cuánto cuesta Talkey para mi equipo comercial."],
          ["assistant", "Perfecto. Para orientar el precio necesito entender volumen de conversaciones, canales actuales y si el equipo también requiere soporte técnico postventa."],
          ["assistant", "Clasifico la oportunidad como prioritaria, preparo los datos mínimos para evaluación y sugiero agendar una reunión comercial con contexto."],
        ],
        cards: ["Scoring: prioridad alta", "Próximo paso: evaluación", "Datos para cotizar"],
      },
      {
        label: "Lead vuelve por otro canal",
        messages: [
          ["visitor", "Hola, escribí por WhatsApp la semana pasada y ahora quiero avanzar por el sitio."],
          ["assistant", "Detecto historial previo. Retomo el contexto: buscabas automatizar ventas y conectar clientes ganados con soporte técnico."],
          ["assistant", "Unifico el lead, actualizo el pipeline y dejo el seguimiento activo sin tratar esta conversación como una oportunidad nueva."],
        ],
        cards: ["Lead unificado", "Historial recuperado", "Seguimiento activo"],
      },
      {
        label: "Comparación con Vambe",
        messages: [
          ["visitor", "Estoy comparando Talkey con Vambe."],
          ["assistant", "Vambe es fuerte en captación y automatización comercial. Talkey compite ahí y además conecta ventas con soporte técnico, historial por cliente, Talkey Editor y handoff postventa."],
          ["assistant", "Si tu venta termina en instalación, garantía, visitas técnicas o soporte, marco el caso como buen fit y recomiendo una evaluación enfocada en ciclo completo del cliente."],
        ],
        cards: ["Buen fit", "Diferencia: postventa", "Ventas + soporte"],
      },
      {
        label: "Lead listo para reunión",
        messages: [
          ["visitor", "Somos distribuidores y recibimos muchas consultas por web y teléfono. Queremos una demo."],
          ["assistant", "Entendido. Registro industria, canales y necesidad principal: priorizar leads, responder rápido y dejar contexto para ventas y soporte."],
          ["assistant", "Propongo agenda de evaluación, dejo el resumen para el ejecutivo y preparo preguntas comerciales para que la reunión parta avanzada."],
        ],
        cards: ["Agenda sugerida", "Resumen comercial", "Handoff a ejecutivo"],
      },
    ],
    comparison: [
      { title: "Equipo comercial solamente", text: "Mantiene seguimiento, priorización y contexto incluso cuando el ejecutivo está ocupado o cambia el responsable." },
      { title: "CRM tradicional", text: "No solo almacena oportunidades: conversa, califica, prioriza y propone próximos pasos." },
      { title: "Automatizadores tipo Vambe", text: "Hace captación, calificación y seguimiento, pero además conecta ventas con soporte técnico y postventa." },
      { title: "Chatbots comerciales genéricos", text: "No se queda en responder preguntas: transforma conversaciones en oportunidades gestionables." },
      { title: "Herramientas de agendamiento", text: "Agenda reuniones, pero con contexto comercial previo, intención detectada y datos mínimos levantados." },
      { title: "Planillas o seguimiento manual", text: "Evita oportunidades perdidas por olvido, duplicación de leads o falta de continuidad entre canales." },
    ],
    nextTitle: "Convierte conversación en pipeline.",
    nextBody:
      "Talkey Ventas está pensado para equipos que no quieren perder leads por demora, seguimiento débil o falta de contexto comercial.",
  },
  soporte: {
    eyebrow: "Talkey Suite Soporte Técnico",
    title: "Convierte problemas técnicos en una experiencia de soporte consistente.",
    body:
      "Talkey Soporte Técnico guía al cliente, usa conocimiento aprobado, recuerda historial cuando está disponible y deriva con contexto cuando corresponde.",
    heroMetric: "75%",
    heroMetricText: "de casos frecuentes puede resolverse antes de llegar a un especialista",
    icon: Headphones,
    features: [
      { icon: FileText, title: "Conocimiento estructurado", text: "Manuales, FAQs, criterios, troubleshootings y experiencia técnica convertidos en respuestas útiles." },
      { icon: Wrench, title: "Diagnóstico guiado", text: "Preguntas paso a paso para entender síntomas, producto, riesgo y solución probable." },
      { icon: Phone, title: "Guía para llamadas", text: "El agente humano puede usar Talkey como guía mientras atiende a un cliente por teléfono." },
      { icon: MessageSquare, title: "Chat o voz", text: "Puede atender por chat y también operar por voz cuando el canal lo justifique." },
      { icon: Database, title: "Historial por cliente", text: "La atención no parte desde cero si ya existe información previa del cliente o del producto." },
      { icon: BadgeCheck, title: "Producto por foto", text: "El cliente puede enviar foto de etiqueta, QR o número de serie para identificar modelo." },
      { icon: ShieldCheck, title: "Derivación segura", text: "Si hay riesgo, baja certeza o caso sensible, deriva a un especialista con contexto." },
      { icon: LineChart, title: "Métricas de postventa", text: "Permite observar motivos de consulta, derivaciones, tiempos, brechas y casos repetidos." },
    ],
    workflow: ["Cliente consulta", "Talkey identifica producto", "Pregunta síntomas", "Guía solución", "Resuelve o deriva", "Deja contexto"],
    demoTitle: "Demo de Talkey Soporte Técnico",
    demoBody:
      "Simula casos técnicos cotidianos para mostrar cómo Talkey diagnostica, guía y decide cuándo derivar.",
    demoOptions: [
      {
        label: "Calefont no enciende",
        messages: [
          ["visitor", "Mi calefont no enciende."],
          ["assistant", "Vamos paso a paso. Primero: ¿ves algún código de error o luz encendida? Si puedes, envía una foto de la etiqueta o del número de serie para identificar el modelo."],
          ["assistant", "Si hay olor a gas, no intentes encenderlo. Ventila, cierra la llave de paso y contacta soporte autorizado."],
        ],
        cards: ["Identificar modelo", "Preguntas de seguridad", "Derivar si hay riesgo"],
      },
      {
        label: "Aire no enfría",
        messages: [
          ["visitor", "El aire acondicionado prende, pero no enfría bien."],
          ["assistant", "Revisemos lo básico: modo frío, temperatura configurada, filtro limpio y si la unidad exterior está funcionando. ¿Cuándo fue la última mantención?"],
          ["assistant", "Si el flujo de aire es bajo, puede ser filtro o bloqueo. Si hay hielo o ruido anormal, conviene derivar a técnico con el diagnóstico ya levantado."],
        ],
        cards: ["Diagnóstico remoto", "Evita visita innecesaria", "Derivación con contexto"],
      },
      {
        label: "Lavadora vibra mucho",
        messages: [
          ["visitor", "La lavadora se mueve demasiado al centrifugar."],
          ["assistant", "Puede ser carga desbalanceada, desnivel o seguros de transporte. Primero pausa, redistribuye la ropa y confirma que esté nivelada."],
          ["assistant", "Si el problema sigue, Talkey registra síntomas, modelo y frecuencia para derivar a soporte sin que el cliente repita todo."],
        ],
        cards: ["Caso frecuente", "Solución guiada", "Historial guardado"],
      },
    ],
    comparison: [
      { title: "Vambe", text: "Fuerte en conversación comercial y automatización de demanda; no está centrado en diagnóstico técnico profundo." },
      { title: "Software de tickets", text: "Ordena estados y bandejas, pero no necesariamente resuelve el problema técnico del cliente." },
      { title: "Talkey Soporte", text: "Responde desde conocimiento técnico, guía diagnóstico y deriva con contexto cuando hace falta un especialista." },
    ],
    nextTitle: "Haz que soporte no dependa de memoria individual.",
    nextBody:
      "Talkey Soporte Técnico está pensado para postventa, garantía, instalación, productos técnicos y operaciones donde resolver bien exige conocimiento.",
  },
};

function Brand() {
  return (
    <Link className="mk-brand" href="/" aria-label="Talkey">
      <Image src="/brand/talkey-key.svg" alt="" width={76} height={36} priority />
      <Image src="/brand/talkey-wordmark.svg" alt="Talkey" width={116} height={36} priority />
    </Link>
  );
}

function PlatformHeader({ minimal = false, sales = false, ctaHref = "#agenda" }: { minimal?: boolean; sales?: boolean; ctaHref?: string }) {
  const ctaExternal = ctaHref.startsWith("http");

  return (
    <header className={`mk-header${minimal ? " is-minimal" : ""}`}>
      <nav className="mk-container mk-nav" aria-label="Navegación principal">
        <Brand />
        <div className="mk-nav-links">
          {sales ? (
            <>
              <Link href="/">Inicio</Link>
              <a href="#problema">Problemas/Soluciones</a>
              <a href="#demo">Demo</a>
              <a href="#precios">Precios</a>
              <a href="#comparacion">Comparación</a>
            </>
          ) : (
            <>
              <Link href="/#suites">Suites</Link>
              <Link href="/ventas">Ventas</Link>
              <Link href="/soporte-tecnico">Soporte técnico</Link>
              <Link href="/#precios">Precios</Link>
              <Link href="/#comparacion">Comparación</Link>
            </>
          )}
        </div>
        <div className="mk-nav-actions">
          <a className="mk-nav-cta" href={ctaHref} target={ctaExternal ? "_blank" : undefined} rel={ctaExternal ? "noopener noreferrer" : undefined}>Solicitar evaluación <ArrowRight size={16} /></a>
        </div>
      </nav>
    </header>
  );
}

function Footer({ currentYear, ctaHref = "#agenda", line }: { currentYear: number; ctaHref?: string; line?: string }) {
  const ctaExternal = ctaHref.startsWith("http");

  if (line) {
    return (
      <footer className="mk-footer">
        <div className="mk-container">
          <div className="mk-footer-top">
            <a className="mk-brand mk-brand-footer" href="#top">
              <Image src="/brand/talkey-key.svg" width={345} height={158} alt="" />
              <Image src="/brand/talkey-wordmark.svg" width={442} height={140} alt="Talkey" />
            </a>
            <p>{line}</p>
          </div>
          <div className="mk-footer-bottom">
            <span>© {currentYear} Talkey</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mk-footer">
      <div className="mk-container mk-footer-bottom">
        <span>© {currentYear} Talkey</span>
        <div>
          <Link href="/ventas">Suite Ventas</Link>
          <Link href="/soporte-tecnico">Suite Soporte Técnico</Link>
          <a href={ctaHref} target={ctaExternal ? "_blank" : undefined} rel={ctaExternal ? "noopener noreferrer" : undefined}>Solicitar evaluación</a>
        </div>
      </div>
    </footer>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const Icon = product.icon;
  const title = product.key === "ventas" ? "Talkey Ventas" : "Talkey Soporte";

  return (
    <Link className={`mk-suite-card mk-suite-card-${product.key}`} href={product.href}>
      <div className="mk-suite-card-top">
        <span><Icon size={28} /></span>
        <p>{product.kicker}</p>
      </div>
      <h2>{title}</h2>
      <p>{product.value}</p>
      <div className="mk-suite-card-bottom">
        <small>Ver página</small>
        <ArrowRight size={26} />
      </div>
    </Link>
  );
}

export function PlatformHome() {
  const year = new Date().getUTCFullYear();
  const bookingUrl = "https://calendar.app.google/3GHWcX3gvTc1ujv6A";

  return (
    <main className="mk-site mk-platform-site mk-platform-home-minimal">
      <div className="mk-ambient mk-ambient-one" />
      <div className="mk-ambient mk-ambient-two" />
      <PlatformHeader minimal ctaHref={bookingUrl} />

      <section className="mk-section mk-platform-hero" aria-labelledby="talkey-home-title">
        <div className="mk-container">
          <div className="mk-platform-home-hero-box">
            <h1 id="talkey-home-title">
              La plataforma IA para convertir conversaciones en <span className="mk-hero-highlight">ventas</span> y problemas técnicos en <span className="mk-hero-highlight">fidelización</span>.
            </h1>
          </div>

          <div id="suites" className="mk-platform-home-suite-grid" aria-label="Suites Talkey">
            {products.map((product) => <ProductCard product={product} key={product.key} />)}
          </div>
        </div>
      </section>

      <Footer currentYear={year} ctaHref={bookingUrl} />
    </main>
  );
}

const salesProblems = [
  {
    title: "Leads que se enfrían",
    problem: "La empresa responde tarde o pierde continuidad después del primer contacto.",
    solution: "Talkey Ventas mantiene oportunidades vivas con seguimiento comercial automatizado, recordatorios y próximos pasos claros.",
  },
  {
    title: "Pipeline incompleto",
    problem: "Las conversaciones quedan dispersas entre canales y no siempre pasan a una etapa comercial clara.",
    solution: "Talkey Ventas convierte conversaciones en pipeline, con estado, origen, contexto y próximo paso para cada oportunidad.",
  },
  {
    title: "Oportunidades sin prioridad",
    problem: "El equipo trata consultas de bajo valor y oportunidades urgentes casi con el mismo criterio.",
    solution: "Talkey Ventas aplica scoring según intención, urgencia, fit, presupuesto, repetición y potencial comercial.",
  },
  {
    title: "Cotizaciones lentas",
    problem: "Faltan datos básicos para cotizar y el ejecutivo debe pedir información que pudo levantarse antes.",
    solution: "Talkey Ventas pide los datos mínimos, ordena la información y deja preparada la base para cotizaciones o propuestas.",
  },
  {
    title: "Conversaciones duplicadas",
    problem: "El mismo cliente vuelve por otro canal y el equipo lo trata como si partiera desde cero.",
    solution: "Talkey Ventas detecta leads repetidos o recurrentes, recupera historial y evita duplicar esfuerzos comerciales.",
  },
  {
    title: "Ventas y soporte desconectados",
    problem: "Cuando el cliente compra, postventa recibe poco contexto y la experiencia se quiebra.",
    solution: "Talkey Ventas prepara el handoff hacia soporte técnico con información relevante del cliente, la venta y el caso.",
  },
  {
    title: "Ejecutivos sin próximo paso claro",
    problem: "Después de una conversación, no siempre queda claro qué objeción resolver o qué acción tomar.",
    solution: "Talkey Ventas actúa como asistente comercial y sugiere próximos pasos, objeciones a resolver y acciones concretas.",
  },
  {
    title: "Reuniones difíciles de coordinar",
    problem: "Agendar demos, evaluaciones o llamadas puede depender de demasiado ida y vuelta manual.",
    solution: "Talkey Ventas puede coordinar reuniones comerciales según disponibilidad y dejar la conversación lista para avanzar.",
  },
];

const salesWorkflow = [
  "Conversación entra",
  "Talkey pregunta lo esencial",
  "Califica intención y fit",
  "Prioriza oportunidad",
  "Prepara cotización o reunión",
  "Hace seguimiento",
  "Pasa contexto a soporte",
];

const salesChatCopy = {
  ...marketingCopy.es.chat,
  live: "Demo en vivo · Talkey Ventas",
  open: "Abrir demo de Talkey Ventas",
  minimize: "Minimizar demo de ventas",
  welcome:
    "Hola, soy Talkey Ventas. Puedo mostrarte cómo califico leads, priorizo oportunidades, preparo próximos pasos, coordino reuniones y conecto ventas con soporte técnico. ¿Qué quieres probar?",
  prompts: [
    "¿Cómo califica Talkey un lead?",
    "¿Cómo ayuda con cotizaciones?",
    "¿Se integra con mi CRM?",
    "¿Cómo conecta ventas con soporte?",
    "¿Cuánto cuesta Talkey Ventas?",
  ],
  placeholder: "Pregúntame sobre Talkey Ventas...",
  typing: "Talkey Ventas está preparando una respuesta",
  danger: "Talkey Ventas",
  actions: {
    ...marketingCopy.es.chat.actions,
    pricingSimulator: "Ver paquetes de precios",
    bookDemo: "Solicitar evaluación",
    bookReview: "Solicitar evaluación",
  },
  responses: {
    ...marketingCopy.es.chat.responses,
    pricing:
      "Talkey Ventas se ofrece en paquetes referenciales según volumen, canales, nivel de automatización, integraciones y continuidad con soporte técnico. Puedes revisar los paquetes de la sección de precios y luego solicitar una evaluación para ajustar alcance, implementación y precio final.",
    implementation:
      "La implementación parte revisando tu proceso comercial: canales de entrada, criterios de calificación, etapas de pipeline, datos mínimos para cotizar, reglas de seguimiento e integraciones necesarias. Después se configura Talkey Editor, se prueban conversaciones reales y se valida el handoff hacia el equipo comercial o soporte.",
    implementationFollowUp:
      "En más detalle: 1. levantamos canales y origen de leads; 2. definimos criterios de scoring; 3. configuramos preguntas comerciales y datos para cotizar; 4. conectamos CRM, agenda o canales; 5. probamos casos reales; 6. ajustamos seguimiento y handoff. ¿Qué otra parte de la implementación quieres revisar?",
    integration:
      "Talkey Ventas puede integrarse con tu CRM o funcionar junto al CRM de Talkey. También puede conectarse con formularios del sitio, WhatsApp, email, agenda de reuniones y otros canales comerciales según evaluación técnica.",
    security:
      "Talkey Ventas debe operar con criterios aprobados, trazabilidad y control de datos comerciales. La configuración de permisos, historial, integraciones y tratamiento de información se revisa en la evaluación técnica.",
    technical:
      "Talkey Ventas conecta ventas con soporte cuando el cliente ganado necesita instalación, garantía, postventa o atención técnica. La idea es que el contexto comercial no se pierda: producto, necesidad, historial y próximos pasos llegan preparados.",
    problemSolved:
      "Talkey Ventas resuelve una fricción común: muchas conversaciones entrantes se pierden por demora, falta de seguimiento, baja priorización o poca continuidad. Talkey califica, prioriza, ordena pipeline, prepara próximos pasos y mantiene contexto por cliente.",
    ticketComparison:
      "Para cotizaciones, Talkey Ventas puede levantar datos mínimos, entender intención, ordenar la información y dejar lista la base para que el equipo comercial prepare una propuesta sin volver a preguntar lo mismo.",
    competitorComparison:
      "Vambe, HubSpot, Salesforce, Salesloft/Drift y Manychat cubren partes importantes de captación, CRM, automatización, agendamiento y seguimiento. Talkey Ventas hace eso, más continuidad con soporte técnico, historial por cliente, detección de leads repetidos, Talkey Editor y handoff hacia postventa.",
    supportMetrics:
      "Talkey Ventas ayuda a que el equipo no trate todos los leads igual: identifica intención, urgencia, fit, presupuesto, repetición y potencial. Con eso prioriza oportunidades y propone próximos pasos concretos.",
    customerMemory:
      "Si un lead vuelve por otro canal, Talkey Ventas puede usar el historial disponible para no partir desde cero, detectar duplicados, unificar contexto y mantener el seguimiento activo.",
    humanRole:
      "Talkey Ventas no reemplaza necesariamente al equipo comercial. Puede absorber tareas repetitivas, calificar leads, preparar datos y sugerir próximos pasos, dejando a los ejecutivos las conversaciones de mayor valor, negociación y cierre.",
    voiceVersion:
      "Talkey Ventas puede operar también por voz si el canal lo justifica: por ejemplo, para capturar datos iniciales, calificar intención o preparar una reunión antes de que intervenga un ejecutivo.",
    negativeChallenge:
      "¿Qué te hace pensar eso? Si tu duda es sobre precio, precisión, comparación con Vambe o capacidad real de cerrar oportunidades, puedo responderlo desde el enfoque de Talkey Ventas.",
    fallback:
      "Puedo explicarte cómo Talkey Ventas califica leads, prioriza oportunidades, prepara cotizaciones, evita duplicados, agenda reuniones, se integra con CRM o conecta ventas con soporte técnico.",
  },
};

const salesEditorItems = [
  "Criterios de scoring",
  "Preguntas comerciales",
  "Objeciones frecuentes",
  "Campos mínimos para cotizar",
  "Reglas de seguimiento",
  "Handoff hacia soporte",
];

const salesMetrics = [
  { value: "24/7", label: "captura y calificación de conversaciones" },
  { value: "1", label: "historial comercial por cliente" },
  { value: "0", label: "leads duplicados tratados como nuevos" },
];

export function SalesPage() {
  const content = suiteContent.ventas;
  const year = new Date().getUTCFullYear();

  return (
    <main className="mk-site mk-platform-site mk-sales-page">
      <div className="mk-sales-ambient mk-sales-ambient-one" />
      <div className="mk-sales-ambient mk-sales-ambient-two" />
      <PlatformHeader sales />

      <section id="top" className="mk-section mk-sales-hero" aria-labelledby="talkey-sales-title">
        <div className="mk-container mk-sales-hero-grid">
          <div className="mk-sales-hero-copy">
            <h1 id="talkey-sales-title">
              Convierte conversaciones en <span className="mk-sales-hero-highlight">ventas</span> sin perder oportunidades por seguimiento débil.
            </h1>
          </div>
          <div className="mk-sales-hero-aside">
            <p>
              Talkey Ventas atiende, califica, prioriza y organiza conversaciones comerciales para que tu equipo llegue
              con contexto, foco y próximos pasos claros.
            </p>
            <div className="mk-hero-actions">
              <a className="mk-button mk-button-primary" href="#demo">Ver demo <ArrowRight size={18} /></a>
              <a className="mk-button mk-button-secondary" href="#agenda">Solicitar evaluación <ArrowRight size={18} /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="problema" className="mk-section mk-sales-section">
        <div className="mk-container">
          <div className="mk-section-heading">
            <p className="mk-section-label"><span>01</span>Problemas/Soluciones</p>
            <h2>La venta no se pierde solo por precio. Se pierde por fricción.</h2>
            <p>
              En operaciones con muchos canales, el problema no es solamente captar leads: es responder rápido,
              priorizar bien y sostener seguimiento sin depender de memoria individual.
            </p>
          </div>
          <SalesProblemTable problems={salesProblems} />
        </div>
      </section>

      <section className="mk-section mk-sales-flow-section">
        <div className="mk-container">
          <p className="mk-section-label"><span>02</span>Flujo</p>
          <h2>De conversación a oportunidad gestionada.</h2>
          <div className="mk-sales-flow">
            {salesWorkflow.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section mk-sales-editor-section">
        <div className="mk-container mk-sales-editor-grid">
          <div>
            <p className="mk-section-label"><span>03</span>Talkey Editor</p>
            <h2>Tu equipo define cómo Talkey vende.</h2>
            <p>
              Talkey Editor permite ajustar criterios comerciales, preguntas, objeciones, reglas de seguimiento y datos
              mínimos para cotizar sin depender de desarrollo cada vez que cambia tu operación.
            </p>
          </div>
          <div className="mk-sales-editor-list">
            {salesEditorItems.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section id="demo" className="mk-section mk-sales-demo-section">
        <div className="mk-container mk-sales-demo-grid">
          <div>
            <p className="mk-section-label"><span>04</span>Demo</p>
            <h2>{content.demoTitle}</h2>
            <p>{content.demoBody}</p>
          </div>
          <MarketingChatDemo copy={salesChatCopy} variant="sales" />
        </div>
      </section>

      <section id="precios" className="mk-section mk-sales-pricing-section">
        <div className="mk-container">
          <div className="mk-section-heading">
            <p className="mk-section-label"><span>05</span>Precios</p>
            <h2>Paquetes para partir con una conversación seria.</h2>
            <p>
              Los valores son referenciales. Talkey se posiciona como una solución premium porque une conversación,
              pipeline, seguimiento, Talkey Editor y continuidad hacia soporte.
            </p>
          </div>
          <div className="mk-package-grid">
            {pricing.map((plan) => (
              <article className={plan.highlighted ? "is-highlighted" : ""} key={plan.name}>
                <h3>{plan.name}</h3>
                <p className="mk-package-description">{plan.description}</p>
                <strong>{plan.price}</strong>
                <small>{plan.detail} · {plan.setup}</small>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}><BadgeCheck size={17} />{feature}</li>
                  ))}
                </ul>
                <a href="#agenda">Solicitar evaluación <ArrowRight size={16} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="comparacion" className="mk-section mk-sales-comparison-section">
        <div className="mk-container">
          <div className="mk-section-heading">
            <p className="mk-section-label"><span>06</span>Comparación</p>
            <h2>Talkey compite con herramientas de ventas, pero mira más ciclo de vida.</h2>
            <p>
              Si tu venta termina en instalación, garantía, postventa o soporte técnico, necesitas más que captar y convertir:
              necesitas que el contexto siga vivo después del cierre.
            </p>
          </div>
          <div className="mk-comparison-table" role="table" aria-label="Comparación Talkey Ventas">
            <div className="mk-comparison-table-head" role="row">
              <span role="columnheader">Opción</span>
              <span role="columnheader">Ventaja de Talkey</span>
            </div>
            {content.comparison.map((item) => (
              <article className="mk-comparison-table-row" key={item.title} role="row">
                <h3 role="cell">{item.title}</h3>
                <p role="cell">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section mk-sales-metrics-section">
        <div className="mk-container mk-sales-metrics-grid">
          {salesMetrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="agenda" className="mk-section mk-sales-final-section">
        <div className="mk-container mk-sales-final-card">
          <div>
            <p className="mk-section-label"><span>07</span>Evaluación</p>
            <h2>Veamos si Talkey Ventas calza con tu operación.</h2>
            <p>
              En 30 minutos revisamos canales, volumen de conversaciones, proceso comercial, criterios de calificación,
              CRM actual y qué haría falta para implementarlo bien.
            </p>
          </div>
          <a className="mk-button mk-button-primary" href="https://calendar.app.google/3GHWcX3gvTc1ujv6A">
            Solicitar evaluación <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer currentYear={year} line="Conversaciones que venden." />
    </main>
  );
}

export function SuitePage({ suite }: { suite: SuiteKey }) {
  const content = suiteContent[suite];
  const product = products.find((item) => item.key === suite) ?? products[0];
  const Icon = content.icon;
  const year = new Date().getUTCFullYear();
  const featureList = content.features.slice(0, 4);
  const recommendedPlan = pricing[1];
  const pageTitle =
    suite === "ventas"
      ? "Convierte conversaciones en oportunidades listas para cerrar."
      : "Convierte problemas técnicos en soporte que fideliza.";
  const pageBody =
    suite === "ventas"
      ? "Talkey Ventas califica, prioriza y da seguimiento para que tu equipo llegue a la conversación correcta con el próximo paso claro."
      : "Talkey Soporte guía diagnósticos, usa conocimiento aprobado y deriva con contexto cuando el caso necesita un especialista.";
  const finalBody =
    suite === "ventas"
      ? "Para operaciones comerciales que necesitan responder rápido, ordenar leads y no perder oportunidades por falta de seguimiento."
      : "Para empresas con productos o servicios técnicos que necesitan resolver mejor, reducir esperas y entregar respuestas consistentes.";

  return (
    <main className={`mk-site mk-platform-site mk-suite-page mk-suite-page-${suite}`}>
      <div className="mk-ambient mk-ambient-one" />
      <PlatformHeader minimal />

      <section className="mk-section mk-suite-simple-hero" aria-labelledby="talkey-suite-title">
        <div className="mk-container mk-suite-simple-hero-grid">
          <div>
            <Link className="mk-simple-back" href="/">Volver a plataforma</Link>
            <p className="mk-eyebrow"><span />{content.eyebrow}</p>
            <h1 id="talkey-suite-title">{pageTitle}</h1>
            <p>{pageBody}</p>
            <div className="mk-hero-actions">
              <a className="mk-button mk-button-primary" href="#demo">Ver demo <ArrowRight size={18} /></a>
              <a className="mk-button mk-button-secondary" href="#agenda">Solicitar evaluación <ArrowRight size={18} /></a>
            </div>
          </div>
          <article className="mk-suite-simple-panel">
            <span><Icon size={32} /></span>
            <strong>{content.heroMetric}</strong>
            <p>{content.heroMetricText}</p>
            <div>
              {product.proof.map((item) => <small key={item}>{item}</small>)}
            </div>
          </article>
        </div>
      </section>

      <section className="mk-section mk-suite-simple-section">
        <div className="mk-container">
          <div className="mk-suite-simple-grid">
            {featureList.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <article key={feature.title}>
                  <span><FeatureIcon size={22} /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="demo" className="mk-section mk-suite-simple-demo">
        <div className="mk-container mk-suite-simple-demo-grid">
          <div>
            <p className="mk-section-label"><span>Demo</span>{product.name}</p>
            <h2>{content.demoTitle}</h2>
            <p>{content.demoBody}</p>
          </div>
          <DemoPanel title={content.demoTitle} body={content.demoBody} options={content.demoOptions} />
        </div>
      </section>

      <section id="agenda" className="mk-section mk-suite-simple-final">
        <div className="mk-container mk-suite-simple-final-card">
          <div>
            <p className="mk-section-label"><span>Precio</span>Referencial</p>
            <h2>{content.nextTitle}</h2>
            <p>{finalBody}</p>
            <small>
              Plan recomendado: {recommendedPlan.name}, {recommendedPlan.price} {recommendedPlan.detail}.
              La implementación se confirma después de una evaluación técnica y comercial.
            </small>
          </div>
          <a className="mk-button mk-button-primary" href="https://calendar.app.google/3GHWcX3gvTc1ujv6A">
            Solicitar evaluación <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer currentYear={year} />
    </main>
  );
}
