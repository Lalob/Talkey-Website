import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  FileText,
  Handshake,
  LayoutDashboard,
  LifeBuoy,
  MessageSquareText,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { absoluteUrl, seoKeywords } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: {
    absolute: "Manuales Talkey | Guías para soporte técnico, ventas y CRM",
  },
  description:
    "Manuales Talkey para soporte técnico, CRM de soporte, asistente de ventas y CRM de ventas. Guías claras con pasos, referencias visuales y funciones IA.",
  keywords: [
    ...seoKeywords,
    "manuales Talkey",
    "manuales de uso Talkey",
    "CRM soporte Talkey",
    "CRM ventas Talkey",
    "guías soporte técnico Talkey",
    "guías Talkey ventas",
  ],
  alternates: {
    canonical: absoluteUrl("/manualesdeuso"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "article",
    title: "Manuales Talkey",
    description:
      "Guías paso a paso para usar las apps Talkey en soporte técnico, ventas y operación asistida por IA.",
    url: absoluteUrl("/manualesdeuso"),
    siteName: "Talkey",
    locale: "es_CL",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Manuales Talkey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuales Talkey | Guías para soporte, ventas y CRM",
    description:
      "Guías paso a paso para usar las apps Talkey en soporte técnico, ventas y operación asistida por IA.",
    images: ["/opengraph-image"],
  },
};

type AppLink = {
  label: string;
  href: string;
};

type AppManual = {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  audience: string;
  preview: {
    eyebrow: string;
    title: string;
    primary: string;
    secondary: string;
    rows: string[];
    chips: string[];
  };
  links: AppLink[];
  before: string[];
  steps: string[];
  checks: string[];
  tip: string;
};

const appManuals: AppManual[] = [
  {
    id: "asistente-soporte",
    number: "01",
    icon: MessageSquareText,
    title: "Asistente conversacional de soporte",
    subtitle:
      "Para clientes o usuarios que necesitan abrir un ticket, explicar un problema y seguir el avance sin perder contexto.",
    audience:
      "Personas que necesitan ayuda técnica desde el sitio, un QR, un enlace de soporte o una conversación guiada.",
    preview: {
      eyebrow: "Vista cliente",
      title: "Ticket abierto automáticamente",
      primary: "TK-1048 · En revisión",
      secondary: "Modelo detectado: equipo técnico · Prioridad media",
      rows: ["Mensaje del cliente", "Foto o etiqueta del producto", "Respuesta sugerida", "Próximo paso"],
      chips: ["Estado", "Responsable", "ETA", "Historial"],
    },
    links: [
      { label: "Ver Suite Soporte", href: "/soporte-tecnico" },
      { label: "Ver demo de soporte", href: "/soporte-tecnico#demo" },
    ],
    before: [
      "Ten a mano tu email, nombre y teléfono de contacto.",
      "Si el problema es de un equipo, intenta tener modelo, serie o una foto de la etiqueta.",
      "Describe qué pasó con palabras simples: Talkey ordenará la información.",
    ],
    steps: [
      "Abre el asistente. Talkey creará un ticket automáticamente para que el caso tenga seguimiento.",
      "Completa tus datos de contacto cuando la app los pida. Esto permite que soporte encuentre tu caso después.",
      "Escribe el problema como lo dirías por WhatsApp: qué intentaste hacer, qué ocurrió y desde cuándo pasa.",
      "Si el problema depende de un equipo físico, usa la opción de foto para adjuntar etiqueta, QR, número de serie o imagen del producto.",
      "Antes de enviar, revisa las respuestas sugeridas de autoservicio. Si una te sirve, puedes usarla al tiro.",
      "Si necesitas enviar el caso, Talkey lo dejará clasificado con categoría, prioridad, responsable sugerido y próximos pasos.",
      "Guarda el código de ticket. En el portal verás estado, responsable, prioridad, tiempo estimado e historial.",
      "Usa el enlace de WhatsApp si quieres continuar el seguimiento por ese canal cuando esté disponible para tu operación.",
    ],
    checks: [
      "El ticket muestra un código visible.",
      "El estado del caso aparece actualizado.",
      "El historial contiene tus mensajes principales.",
      "El próximo paso queda claro antes de cerrar la página.",
    ],
    tip:
      "Mientras más concreto sea el primer mensaje, mejor llega el ticket al equipo humano: síntoma, producto, urgencia y foto si aplica.",
  },
  {
    id: "crm-soporte",
    number: "02",
    icon: LifeBuoy,
    title: "CRM de soporte técnico",
    subtitle:
      "Para agentes, supervisores y equipos de postventa que gestionan tickets, respuestas, prioridad y trazabilidad.",
    audience:
      "Equipos internos de soporte que reciben tickets desde el asistente, revisan contexto y deciden si responde Talkey o una persona.",
    preview: {
      eyebrow: "Consola soporte",
      title: "Inteligencia del ticket",
      primary: "Resumen IA · Prioridad alta · ETA 2 h",
      secondary: "Responsable sugerido: Soporte técnico nivel 2",
      rows: ["Resumen automático", "Duplicados posibles", "Respuesta inicial", "Artículo sugerido"],
      chips: ["Categoría", "Urgencia", "Responsable", "Base de conocimiento"],
    },
    links: [
      { label: "Ver Suite Soporte", href: "/soporte-tecnico" },
      { label: "Ver problemas/soluciones", href: "/soporte-tecnico#problema" },
    ],
    before: [
      "Revisa primero la lista de tickets y usa el buscador por email, serie, ticket o modelo.",
      "Abre un ticket antes de responder: el detalle reúne conversación, datos del cliente y señales operativas.",
      "Si vas a intervenir como agente, toma control para que el usuario sepa que lo atiende una persona.",
    ],
    steps: [
      "Entra al CRM de soporte y selecciona un ticket de la lista lateral.",
      "Lee el bloque de IA integrada al ticket: categoría, urgencia, prioridad, responsable sugerido y tiempo estimado.",
      "Revisa el resumen automático: qué pasó, qué pidió el usuario, qué falta y próximo paso sugerido.",
      "Si la respuesta inicial sugerida es correcta, usa el botón para preparar el borrador y ajústalo antes de enviarlo.",
      "Revisa si la IA detectó modelo, serie, etiqueta o producto asociado a partir de texto o foto enviada por el usuario.",
      "Cambia el estado del ticket según avance: nuevo, en revisión, escalado o cerrado.",
      "Si detectas que varios tickets tratan el mismo tema, usa la sugerencia de duplicados para agruparlos o responder en bloque.",
      "Al cerrar un caso, revisa la sugerencia de base de conocimiento y guarda el artículo si la solución puede servir de nuevo.",
      "Consulta el panel de salud para ver tickets abiertos, urgentes, atrasados, temas repetidos y carga del equipo.",
    ],
    checks: [
      "La prioridad y el responsable tienen sentido para el caso.",
      "El estado del ticket refleja la realidad.",
      "La respuesta enviada no promete garantías, disponibilidad ni procedimientos no validados.",
      "Si el caso se repite, quedó agrupado o con una respuesta común.",
    ],
    tip:
      "Talkey ayuda a ordenar el caso, pero el agente siempre debe validar decisiones sensibles, garantías o compromisos técnicos.",
  },
  {
    id: "agente-ventas",
    number: "03",
    icon: Handshake,
    title: "Agente conversacional de ventas",
    subtitle:
      "Para prospectos o clientes que quieren orientación comercial, comparación de productos, demo o cotización.",
    audience:
      "Personas interesadas en comprar, cotizar, entender productos o pedir una reunión comercial con contexto ya ordenado.",
    preview: {
      eyebrow: "Vista prospecto",
      title: "Conversación comercial guiada",
      primary: "Intención: cotización · Score alto",
      secondary: "CTA sugerido: agendar demo o preparar presupuesto",
      rows: ["Necesidad del prospecto", "Producto sugerido", "Datos mínimos", "Próximo paso"],
      chips: ["Score", "Cotización", "Agenda", "CRM"],
    },
    links: [
      { label: "Ver Suite Ventas", href: "/ventas" },
      { label: "Ver demo de ventas", href: "/ventas#demo" },
    ],
    before: [
      "Piensa qué necesitas resolver: producto, aplicación, presupuesto, ciudad, demo o cotización.",
      "Si preguntas por precio, ten claro que la cotización formal depende de configuración, accesorios e instalación.",
      "Si quieres reunión, el botón de agenda abre Google Calendar para revisar y guardar el evento.",
    ],
    steps: [
      "Abre el agente de ventas y escribe tu necesidad en lenguaje natural.",
      "Pregunta por productos, usos, diferencias entre modelos, soporte técnico, capacitación o próximos pasos comerciales.",
      "Revisa el panel de precalificación: intención, prioridad, producto sugerido y próximo paso.",
      "Si Talkey sugiere una demo o reunión, usa Agendar demo para abrir una plantilla en Google Calendar.",
      "Completa o revisa los datos del evento antes de guardarlo y enviarlo desde tu calendario.",
      "Si pides cotización, entrega producto de interés, ciudad, uso principal, instalación, capacitación y cualquier accesorio relevante.",
      "Al final de una conversación comercial, confirma que Talkey haya dejado un llamado a la acción claro: agendar reunión o preparar presupuesto.",
      "Continúa la conversación hasta que el equipo comercial tenga suficiente contexto para responder sin partir desde cero.",
    ],
    checks: [
      "La intención del lead coincide con lo que necesitas: demo, cotización, compra o información.",
      "El producto sugerido es razonable para tu caso.",
      "El próximo paso quedó claro.",
      "Si abriste Google Calendar, revisaste y guardaste tú el evento.",
    ],
    tip:
      "El agente no reemplaza una cotización formal: prepara mejor la conversación para que ventas llegue con información útil.",
  },
  {
    id: "crm-ventas",
    number: "04",
    icon: LayoutDashboard,
    title: "CRM de ventas",
    subtitle:
      "Para equipos comerciales que administran prospectos, oportunidades, cotizaciones y handoff hacia soporte.",
    audience:
      "Ejecutivos, jefaturas comerciales y equipos que necesitan pipeline claro, próximos pasos y coordinación con postventa.",
    preview: {
      eyebrow: "CRM ventas",
      title: "Smart Agent interno",
      primary: "Riesgo: sin seguimiento · Acción: enviar email",
      secondary: "Oportunidad ganada crea cliente y ticket en soporte",
      rows: ["Pipeline priorizado", "Correo preparado", "Duplicado detectado", "Handoff postventa"],
      chips: ["Score", "Riesgo", "Agenda", "Soporte"],
    },
    links: [
      { label: "Ver Suite Ventas", href: "/ventas" },
      { label: "Ver precios", href: "/ventas#precios" },
    ],
    before: [
      "Parte en Inicio para revisar pipeline abierto, prospectos calientes y clientes enviados a CRM Soporte.",
      "Usa Prospectos para capturar leads nuevos antes de convertirlos en cuenta, contacto y oportunidad.",
      "Recuerda que un cliente pasa a CRM Soporte cuando una oportunidad se marca como ganada.",
    ],
    steps: [
      "Crea un prospecto con empresa, contacto, email, segmento, score y necesidad comercial.",
      "Convierte el prospecto cuando esté listo: la app creará cuenta comercial, contacto y oportunidad inicial.",
      "Gestiona la oportunidad en el pipeline: avanza etapa, actualiza próximo paso y fecha de cierre.",
      "Usa Smart Agent para priorizar pipeline, detectar riesgos, preparar correos, encontrar duplicados o sugerir agenda.",
      "Cuando Smart Agent prepare un correo de seguimiento, revisa tono, datos del cliente, propuesta de valor y próximo paso antes de enviarlo.",
      "Si necesitas reunión, genera el enlace de Google Calendar, revisa la invitación y guárdala desde tu cuenta.",
      "Crea cotizaciones desde oportunidades cuando corresponda.",
      "Marca una oportunidad como ganada solo cuando el cierre sea real.",
      "Después de ganar, revisa CRM Soporte: Talkey crea o actualiza el cliente operativo y deja ticket de onboarding.",
      "Confirma que el evento de integración o handoff hacia soporte incluya producto, contexto comercial, responsable y próximos pasos.",
    ],
    checks: [
      "Cada oportunidad tiene responsable, monto, etapa, fecha y próximo paso.",
      "No hay leads u oportunidades duplicadas sin revisar.",
      "Las oportunidades ganadas aparecen como clientes en CRM Soporte.",
      "La cola de eventos hacia soporte queda sin pendientes críticos.",
    ],
    tip:
      "La regla de oro es simple: si el próximo paso no está claro, el pipeline no está realmente actualizado.",
  },
];

const quickFlows = [
  { icon: MessageSquareText, title: "Usuario conversa", text: "El cliente o prospecto explica lo que necesita en lenguaje natural." },
  { icon: Sparkles, title: "Talkey ordena", text: "La app clasifica, resume, sugiere prioridad, responsable y próximo paso." },
  { icon: ShieldCheck, title: "Equipo valida", text: "Soporte o ventas revisa el contexto antes de prometer o cerrar algo." },
  { icon: CheckCircle2, title: "Caso trazable", text: "Queda historial, código, estado y una ruta clara para continuar." },
];

const bestPractices = [
  "Usa siempre el código de ticket o el nombre de la oportunidad cuando hagas seguimiento.",
  "No mezcles temas distintos en el mismo ticket: un problema claro se resuelve más rápido.",
  "En soporte, valida riesgos, garantías y procedimientos sensibles antes de responder.",
  "En ventas, deja siempre un próximo paso concreto: llamada, demo, cotización o handoff.",
  "En las versiones IA, revisa las sugerencias antes de usarlas. La IA acelera, pero el equipo decide.",
  "Cuando una solución se repite, conviértela en artículo de ayuda para que Talkey aprenda a atender mejor.",
];

function InterfacePreview({ manual }: { manual: AppManual }) {
  const Icon = manual.icon;

  return (
    <figure className="mk-manual-interface-preview" aria-label={`Referencia visual de ${manual.title}`}>
      <div className="mk-manual-preview-top">
        <span />
        <strong>{manual.preview.eyebrow}</strong>
      </div>
      <div className="mk-manual-preview-hero">
        <div>
          <small>{manual.number}</small>
          <h3>{manual.preview.title}</h3>
          <p>{manual.preview.primary}</p>
        </div>
        <span>
          <Icon size={24} />
        </span>
      </div>
      <p className="mk-manual-preview-secondary">{manual.preview.secondary}</p>
      <div className="mk-manual-preview-rows">
        {manual.preview.rows.map((row) => (
          <div key={row}>
            <span />
            <p>{row}</p>
          </div>
        ))}
      </div>
      <div className="mk-manual-preview-chips">
        {manual.preview.chips.map((chip) => (
          <small key={chip}>{chip}</small>
        ))}
      </div>
      <figcaption>Referencia visual: ubica estos bloques dentro de la app antes de operar el flujo.</figcaption>
    </figure>
  );
}

export default function ManualsPage() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <main className="mk-site mk-manuals-site">
      <div className="mk-ambient mk-ambient-one" />
      <div className="mk-ambient mk-ambient-two" />

      <header className="mk-manual-header">
        <div className="mk-container mk-manual-nav">
          <Link className="mk-brand" href="/" aria-label="Volver al inicio de Talkey">
            <Image src="/brand/talkey-key.svg" width={345} height={158} alt="" priority />
            <Image src="/brand/talkey-wordmark.svg" width={442} height={140} alt="Talkey" priority />
          </Link>
          <nav className="mk-manual-nav-links" aria-label="Navegación de manuales">
            <Link href="/">Inicio</Link>
            <a href="#apps">Apps</a>
            <a href="#manuales">Manuales</a>
            <a href="#versiones">Base vs IA</a>
            <a href="#practicas">Buenas prácticas</a>
          </nav>
          <div className="mk-manual-nav-actions">
            <Link className="mk-nav-cta mk-nav-cta-sales" href="/ventas">
              Ver Talkey Ventas <ArrowUpRight size={16} />
            </Link>
            <Link className="mk-nav-cta" href="/soporte-tecnico">
              Ver Talkey Soporte <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="mk-manual-hero">
        <div className="mk-container mk-manual-hero-grid">
          <div>
            <span className="mk-eyebrow">
              <span />
              <BookIcon />
              Manuales Talkey
            </span>
            <h1>Guías claras para usar cada app Talkey.</h1>
            <p>
              Manuales con pasos accionables, referencias visuales de interfaz y criterios para operar soporte,
              ventas y las versiones IA sin tener que aprender un software enorme.
            </p>
            <div className="mk-manual-hero-actions">
              <a className="mk-button mk-button-primary" href="#apps">
                Elegir app <ArrowRight size={18} />
              </a>
              <Link className="mk-button mk-button-secondary" href="/">
                Volver al sitio <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <aside className="mk-manual-flow-card" aria-label="Flujo general de Talkey">
            <p>Ruta recomendada</p>
            {quickFlows.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <span>
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </div>
                </article>
              );
            })}
          </aside>
        </div>
      </section>

      <section id="apps" className="mk-section mk-manual-apps">
        <div className="mk-container">
          <div className="mk-manual-section-head">
            <div className="mk-section-label">
              <span>01</span> Elige tu app
            </div>
            <h2>Empieza por la experiencia que vas a usar.</h2>
            <p>Cada app tiene una versión base y una versión IA. La versión IA agrega clasificación, resumen, sugerencias, próximos pasos automáticos y apoyo operativo para el equipo.</p>
          </div>

          <div className="mk-manual-app-grid">
            {appManuals.map((manual) => {
              const Icon = manual.icon;
              return (
                <article key={manual.id}>
                  <div className="mk-manual-app-icon">
                    <Icon size={23} />
                  </div>
                  <span>{manual.number}</span>
                  <h3>{manual.title}</h3>
                  <p>{manual.subtitle}</p>
                  <div>
                    <a href={`#${manual.id}`}>Leer manual</a>
                    {manual.links.map((link) => (
                      <a key={link.href} href={link.href}>
                        {link.label} <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="manuales" className="mk-section mk-manual-guides">
        <div className="mk-container">
          <div className="mk-manual-section-head mk-manual-section-head-compact">
            <div className="mk-section-label">
              <span>02</span> Manuales paso a paso
            </div>
            <h2>Usa Talkey con calma, pero con foco.</h2>
            <p>Antes de seguir cada flujo, mira la referencia visual: te muestra qué bloques de la interfaz debes revisar y qué datos deberían quedar visibles.</p>
          </div>

          <div className="mk-manual-guide-list">
            {appManuals.map((manual) => {
              const Icon = manual.icon;
              return (
                <section key={manual.id} id={manual.id} className="mk-manual-guide-card">
                  <div className="mk-manual-guide-title">
                    <div>
                      <span>{manual.number}</span>
                      <Icon size={24} />
                    </div>
                    <h2>{manual.title}</h2>
                    <p>{manual.subtitle}</p>
                    <div className="mk-manual-guide-links">
                      {manual.links.map((link) => (
                        <a key={link.href} href={link.href}>
                          {link.label} <ArrowUpRight size={15} />
                        </a>
                      ))}
                    </div>
                  </div>

                  <InterfacePreview manual={manual} />

                  <div className="mk-manual-guide-content">
                    <aside>
                      <h3>Para quién es</h3>
                      <p>{manual.audience}</p>
                      <h3>Antes de empezar</h3>
                      <ul>
                        {manual.before.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </aside>

                    <div>
                      <h3>Paso a paso</h3>
                      <ol>
                        {manual.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>

                      <h3>Qué revisar al final</h3>
                      <ul>
                        {manual.checks.map((check) => (
                          <li key={check}>{check}</li>
                        ))}
                      </ul>

                      <div className="mk-manual-tip">
                        <Sparkles size={18} />
                        <p>{manual.tip}</p>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section id="versiones" className="mk-section mk-manual-versions">
        <div className="mk-container mk-manual-versions-grid">
          <div>
            <div className="mk-section-label mk-section-label-dark">
              <span>03</span> Base vs IA
            </div>
            <h2>La versión base opera el flujo. La versión IA ayuda a decidir mejor.</h2>
          </div>
          <div className="mk-manual-version-cards">
            <article>
              <Bot size={22} />
              <h3>Versión base</h3>
              <p>Permite conversar, crear registros, avanzar estados, guardar contexto y operar el proceso con reglas internas.</p>
            </article>
            <article>
              <Sparkles size={22} />
              <h3>Versión IA</h3>
              <p>Agrega clasificación automática, resumen, prioridad sugerida, responsable, duplicados, respuestas iniciales y próximos pasos.</p>
            </article>
            <article>
              <CalendarDays size={22} />
              <h3>Agenda conectable</h3>
              <p>Hoy parte con Google Calendar para demos o visitas. El diseño permite conectar Calendly, Microsoft Bookings u otro sistema.</p>
            </article>
            <article>
              <Network size={22} />
              <h3>Integraciones</h3>
              <p>Talkey está pensado para convivir con CRM, calendarios, portales de clientes, WhatsApp y sistemas internos de cada empresa.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="practicas" className="mk-section mk-manual-practices">
        <div className="mk-container mk-manual-practices-grid">
          <div>
            <div className="mk-section-label">
              <span>04</span> Buenas prácticas
            </div>
            <h2>Pequeños hábitos que hacen que Talkey funcione mucho mejor.</h2>
          </div>
          <div className="mk-manual-practice-list">
            {bestPractices.map((practice) => (
              <article key={practice}>
                <CheckCircle2 size={18} />
                <p>{practice}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section mk-manual-final">
        <div className="mk-container">
          <div className="mk-manual-final-card">
            <span>
              <FileText size={18} /> Manuales publicados
            </span>
            <h2>Cuando tengas dudas, vuelve a esta página y parte por tu app.</h2>
            <p>El objetivo de Talkey es que soporte y ventas trabajen con más contexto, menos fricción y una experiencia simple para usuarios y equipos internos.</p>
            <a className="mk-button mk-button-primary" href="#apps">
              Ver apps <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="mk-footer">
        <div className="mk-container">
          <div className="mk-footer-top">
            <Link className="mk-brand mk-brand-footer" href="/">
              <Image src="/brand/talkey-key.svg" width={345} height={158} alt="" />
              <Image src="/brand/talkey-wordmark.svg" width={442} height={140} alt="Talkey" />
            </Link>
            <p>Manuales de uso para las aplicaciones Talkey.</p>
          </div>
          <div className="mk-footer-bottom">
            <span>© {currentYear} Talkey</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function BookIcon() {
  return <FileText size={14} aria-hidden="true" />;
}
