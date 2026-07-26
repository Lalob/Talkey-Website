import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Handshake,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  MessageSquareText,
  Package,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { absoluteUrl, seoKeywords } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: {
    absolute: "Manuales Talkey | Guía completa para ventas, soporte, IA y CRM",
  },
  description:
    "Manual de uso Talkey para operar soporte técnico, CRM Soporte, agente de ventas, CRM de ventas, Smart Agent, configuración Playbook, maestros y Customer master.",
  keywords: [
    ...seoKeywords,
    "manuales Talkey",
    "manuales de uso Talkey",
    "CRM soporte Talkey",
    "CRM ventas Talkey",
    "Smart Agent Talkey",
    "Configuración Playbook Talkey",
    "Customer master Talkey",
    "guías soporte técnico Talkey",
    "guías Talkey ventas",
  ],
  alternates: {
    canonical: absoluteUrl("/manuales"),
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
      "Guía completa para usar Talkey en soporte técnico, ventas, CRM, IA, configuración y operación diaria.",
    url: absoluteUrl("/manuales"),
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
    title: "Manuales Talkey | Guía completa de uso",
    description:
      "Guía paso a paso para operar Talkey en soporte, ventas, CRM, Smart Agent y administración.",
    images: ["/opengraph-image"],
  },
};

type AppLink = {
  label: string;
  href: string;
};

type ManualScreenshot = {
  src: string;
  alt: string;
  caption: string;
  callouts: {
    label: string;
    x: string;
    y: string;
  }[];
};

type AppManual = {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  audience: string;
  learningGoal: string;
  outcome: string;
  preview: {
    eyebrow: string;
    title: string;
    primary: string;
    secondary: string;
    rows: string[];
    chips: string[];
  };
  screenshots: ManualScreenshot[];
  links: AppLink[];
  before: string[];
  steps: string[];
  checks: string[];
  tip: string;
};

type InfoCard = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const learningPath: InfoCard[] = [
  {
    icon: Target,
    title: "1. Entiende el resultado esperado",
    text: "Antes de tocar botones, identifica qué quieres lograr: resolver un ticket, calificar un prospecto, avanzar una oportunidad o configurar reglas.",
  },
  {
    icon: LayoutDashboard,
    title: "2. Ubica la pantalla correcta",
    text: "Cada sección del manual nombra la app, el rol que la usa y los bloques visuales que deberías reconocer antes de operar.",
  },
  {
    icon: ClipboardCheck,
    title: "3. Sigue pasos cortos",
    text: "Los flujos están divididos en acciones pequeñas para que no tengas que memorizar el sistema completo antes de usarlo.",
  },
  {
    icon: CheckCircle2,
    title: "4. Verifica al final",
    text: "Cada manual termina con una lista de control. Si esos puntos se cumplen, el caso, lead u oportunidad quedó trazable.",
  },
];

const coreConcepts = [
  ["Panel de control", "Pantalla inicial del CRM de ventas. Resume tareas prioritarias, alertas, actividad reciente, prospectos recomendados, documentos pendientes y pipeline por etapas."],
  ["Pipeline abierto", "Monto total de oportunidades que siguen activas. No incluye ventas ya ganadas ni casos cerrados."],
  ["Forecast ponderado", "Estimación de ventas esperadas ajustada por la probabilidad de cierre de cada etapa del pipeline."],
  ["Smart Agent", "Asistente interno que recomienda tareas, prioriza oportunidades, detecta riesgos, prepara correos y sugiere próximos pasos."],
  ["MQL", "Lead precalificado: tiene fit e intención suficiente para entrar al CRM sin ser considerado basura."],
  ["SQL", "Lead listo para ventas: además de fit, muestra señales fuertes como demo, cotización, presupuesto o compra."],
  ["Customer master", "Registro único de cliente que conecta ventas y soporte para evitar duplicados y mantener un solo historial."],
  ["Configuración Playbook", "Sección donde administradores y gerentes definen reglas de venta: plazos, prioridades, automatizaciones, scoring, cotizaciones y traspaso a soporte."],
  ["Maestro de productos", "Catálogo administrable que alimenta campos como Producto en oportunidades y cotizaciones."],
  ["Maestro de emails", "Configuración de remitentes, plantillas y modo de envío usado por emails comerciales automáticos."],
  ["Handoff a soporte", "Traspaso del cliente y contexto comercial hacia CRM Soporte cuando una venta se gana o cuando soporte debe intervenir."],
  ["1/8, 2/8", "Progreso de documentos de cierre completados sobre el total del flujo documental de ventas."],
];

const salesDocumentFlow = [
  ["Propuesta comercial", "Solución recomendada, alcance, valor para el cliente y próximos pasos."],
  ["Cotización formal", "Precio, ítems, condiciones comerciales, garantía, vigencia, pago y entrega."],
  ["Envío al cliente", "Correo comercial enviado o preparado con respaldo de estado y destinatario."],
  ["Orden de compra", "Registro o solicitud de OC asociada a cotización y monto."],
  ["Anexo técnico", "Alcance operativo, entregables, exclusiones y criterios de aceptación."],
  ["Contrato / acuerdo", "Términos comerciales, obligaciones, pago, entrega, garantía y firmas."],
  ["Acta de aceptación", "Confirmación formal de aceptación comercial."],
  ["Orden de implementación", "Traspaso operativo hacia implementación y CRM Soporte."],
];

const adminModules: InfoCard[] = [
  {
    icon: Users,
    title: "Usuarios y permisos",
    text: "Define quién puede vender, atender soporte, administrar datos, ver reportes, configurar seguridad o gobernar toda la plataforma.",
  },
  {
    icon: Package,
    title: "Maestro de productos",
    text: "Mantiene el catálogo que usan oportunidades, cotizaciones y agentes comerciales. Evita nombres inventados o productos duplicados.",
  },
  {
    icon: Mail,
    title: "Maestro de emails",
    text: "Configura remitentes, plantillas, firma y modo de envío para que los correos automáticos tengan control operativo.",
  },
  {
    icon: Settings,
    title: "Configuración Playbook",
    text: "Ajusta cómo vende la empresa: probabilidades por etapa, plazos, scoring, automatizaciones, reglas MQL/SQL y traspaso a soporte.",
  },
  {
    icon: Database,
    title: "Customer master",
    text: "Consolida datos de clientes, tickets, leads y oportunidades para que ventas y soporte no trabajen con historiales separados.",
  },
  {
    icon: ShieldCheck,
    title: "Auditoría y observabilidad IA",
    text: "Permite revisar acciones sensibles, uso de IA, errores, eventos y salud general de la operación.",
  },
];

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
    learningGoal: "Aprender a abrir un caso claro y trazable sin conocer la estructura interna de soporte.",
    outcome: "Un ticket con código, estado, historial, datos de contacto, producto identificado y próximo paso visible.",
    preview: {
      eyebrow: "Vista cliente",
      title: "Ticket abierto automáticamente",
      primary: "TK-1048 · En revisión",
      secondary: "Modelo detectado · Prioridad media · Próximo paso visible",
      rows: ["Mensaje del cliente", "Foto o etiqueta del producto", "Respuesta sugerida", "Seguimiento del ticket"],
      chips: ["Estado", "Responsable", "ETA", "Historial"],
    },
    screenshots: [
      {
        src: "/manual-assets/01-agente-soporte-inicio.jpg",
        alt: "Ejemplo BioHertz del inicio del asistente conversacional de soporte Talkey",
        caption:
          "Inicio del asistente: el usuario ingresa su email, Talkey crea el ticket y muestra estado, responsable, prioridad y tiempo estimado.",
        callouts: [
          { label: "Email para iniciar atención", x: "27%", y: "35%" },
          { label: "Portal de seguimiento del ticket", x: "19%", y: "50%" },
          { label: "Campo de mensaje y cámara", x: "67%", y: "94%" },
        ],
      },
      {
        src: "/manual-assets/02-agente-soporte-conversacion.jpg",
        alt: "Ejemplo BioHertz de conversación guiada en el asistente de soporte Talkey",
        caption:
          "Conversación guiada: el usuario describe el problema, puede adjuntar foto de etiqueta o QR y Talkey deja el caso mejor clasificado.",
        callouts: [
          { label: "Historial y estado visible", x: "31%", y: "29%" },
          { label: "Respuestas sugeridas antes de enviar", x: "32%", y: "78%" },
          { label: "Cámara para etiqueta, QR o serie", x: "82%", y: "88%" },
        ],
      },
    ],
    links: [
      { label: "Ver solución para soporte", href: "/soporte" },
      { label: "Ver demo de soporte", href: "/soporte#demo-hero" },
    ],
    before: [
      "Ten a mano email, nombre y teléfono de contacto.",
      "Si el caso trata de un equipo, intenta tener modelo, serie, QR o una foto de la etiqueta.",
      "Describe el síntoma en lenguaje simple: qué pasó, desde cuándo y qué intentaste hacer.",
    ],
    steps: [
      "Abre el asistente. Talkey crea un ticket automáticamente para que el caso tenga seguimiento.",
      "Completa los datos de contacto cuando la app los pida. Esto permite encontrar el caso después.",
      "Escribe el problema como lo dirías por chat: producto, síntoma, urgencia y contexto.",
      "Si el problema depende de un equipo físico, usa la cámara para adjuntar etiqueta, QR, número de serie o imagen del producto.",
      "Revisa las respuestas sugeridas de autoservicio. Si una resuelve el caso, úsala antes de escalar.",
      "Si necesitas ayuda humana, envía el caso. Talkey lo clasifica con categoría, prioridad, responsable sugerido y próximos pasos.",
      "Guarda el código de ticket. En el portal verás estado, responsable, prioridad, tiempo estimado e historial.",
    ],
    checks: [
      "El ticket tiene código visible.",
      "El estado del caso aparece actualizado.",
      "El historial contiene los mensajes principales y archivos útiles.",
      "El próximo paso queda claro antes de cerrar la página.",
    ],
    tip:
      "Un buen primer mensaje reduce idas y vueltas: incluye síntoma, producto, urgencia y foto si aplica.",
  },
  {
    id: "crm-soporte",
    number: "02",
    icon: LifeBuoy,
    title: "CRM Soporte",
    subtitle:
      "Para agentes, supervisores y equipos de postventa que gestionan tickets, respuestas, prioridad y trazabilidad.",
    audience:
      "Equipos internos de soporte que reciben tickets, revisan contexto y deciden si responde Talkey o una persona.",
    learningGoal: "Aprender a pasar de una conversación desordenada a una atención con contexto, responsable y estado real.",
    outcome: "Un ticket actualizado, con respuesta validada, estado correcto, cliente reconocido y conocimiento reutilizable si corresponde.",
    preview: {
      eyebrow: "Consola soporte",
      title: "Inteligencia del ticket",
      primary: "Resumen IA · Prioridad alta · ETA 2 h",
      secondary: "Responsable sugerido: Soporte técnico nivel 2",
      rows: ["Resumen automático", "Duplicados posibles", "Respuesta inicial", "Artículo sugerido"],
      chips: ["Categoría", "Urgencia", "Responsable", "Base de conocimiento"],
    },
    screenshots: [
      {
        src: "/manual-assets/03-backoffice-soporte-ticket.jpg",
        alt: "Ejemplo BioHertz del backoffice de soporte Talkey con inteligencia del ticket",
        caption:
          "Consola de soporte: el equipo revisa tickets, toma control humano, cambia estados y usa la inteligencia del ticket para responder con contexto.",
        callouts: [
          { label: "Buscar por email, serie, ticket o modelo", x: "17%", y: "65%" },
          { label: "Tomar control humano", x: "65%", y: "31%" },
          { label: "IA integrada al ticket", x: "87%", y: "21%" },
          { label: "Respuesta inicial sugerida", x: "86%", y: "78%" },
        ],
      },
    ],
    links: [
      { label: "Ver solución para soporte", href: "/soporte" },
      { label: "Ver problemas/soluciones", href: "/soporte#problema" },
    ],
    before: [
      "Revisa la lista de tickets y usa el buscador por email, serie, ticket o modelo.",
      "Abre un ticket antes de responder: el detalle reúne conversación, datos del cliente y señales operativas.",
      "Si vas a intervenir como agente, toma control para que el usuario sepa que lo atiende una persona.",
    ],
    steps: [
      "Entra al CRM Soporte y selecciona un ticket de la lista lateral.",
      "Lee el bloque de IA integrada: categoría, urgencia, prioridad, responsable sugerido y tiempo estimado.",
      "Revisa el resumen automático: qué pasó, qué pidió el usuario, qué falta y próximo paso sugerido.",
      "Si la respuesta recomendada es correcta, prepárala, ajústala y envíala. El cliente no la ve hasta que una persona la aprueba.",
      "Confirma si Talkey detectó modelo, serie, etiqueta o producto asociado desde texto o foto.",
      "Cambia el estado del ticket según avance: nuevo, en revisión, pendiente de cliente, escalado o cerrado.",
      "Si hay casos repetidos, revisa duplicados y decide si corresponde agrupar, responder en bloque o crear artículo de ayuda.",
      "Al cerrar, revisa si la solución debe quedar en base de conocimiento para que Talkey la reutilice.",
    ],
    checks: [
      "La prioridad y el responsable tienen sentido para el caso.",
      "El estado del ticket refleja la realidad.",
      "La respuesta no promete garantías, disponibilidad ni procedimientos no validados.",
      "Si el caso se repite, quedó agrupado o documentado.",
    ],
    tip:
      "Talkey acelera la atención, pero soporte valida decisiones sensibles, garantías y compromisos técnicos.",
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
    learningGoal: "Aprender a convertir una conversación inicial en un lead útil para ventas, sin llenar el CRM de contactos basura.",
    outcome: "Una precalificación con intención, score, producto sugerido, datos faltantes y próximo paso comercial.",
    preview: {
      eyebrow: "Vista prospecto",
      title: "Conversación comercial guiada",
      primary: "Estado: MQL o SQL según score y datos mínimos",
      secondary: "CTA sugerido: agendar demo, preparar presupuesto o pedir datos faltantes",
      rows: ["Necesidad del prospecto", "Producto sugerido", "Datos mínimos", "Próximo paso"],
      chips: ["Score", "MQL", "SQL", "CRM"],
    },
    screenshots: [
      {
        src: "/manual-assets/06-agente-ventas.jpg",
        alt: "Ejemplo BioHertz del agente conversacional de ventas Talkey",
        caption:
          "Agente comercial: el prospecto puede preguntar por productos, Talkey precalifica la intención y deja un CTA claro a demo o presupuesto.",
        callouts: [
          { label: "Catálogo y filtros", x: "12%", y: "42%" },
          { label: "Precalificación del lead", x: "47%", y: "28%" },
          { label: "CTA comercial", x: "91%", y: "29%" },
          { label: "Chat para preguntas del prospecto", x: "61%", y: "91%" },
        ],
      },
    ],
    links: [
      { label: "Ver solución para ventas", href: "/ventas" },
      { label: "Ver demo de ventas", href: "/ventas#demo" },
    ],
    before: [
      "Piensa qué necesitas resolver: producto, aplicación, presupuesto, ciudad, demo o cotización.",
      "Si preguntas por precio, recuerda que una cotización formal depende de configuración, accesorios, despacho, instalación y condiciones.",
      "Si quieres reunión, el botón de agenda abre Google Calendar para revisar y guardar el evento desde tu cuenta.",
    ],
    steps: [
      "Abre el agente de ventas y escribe tu necesidad en lenguaje natural.",
      "Pregunta por productos, usos, diferencias entre modelos, soporte técnico, capacitación o próximos pasos comerciales.",
      "Talkey evalúa fit, intención, interacción, datos completos y señales de descarte.",
      "Si faltan datos mínimos, el lead queda en calificación y Talkey pregunta lo necesario: email o teléfono, empresa, producto de interés o necesidad concreta.",
      "Si cumple umbral MQL, entra al CRM como lead precalificado. Si cumple umbral SQL, queda listo para que ventas lo atienda con prioridad alta.",
      "Si Talkey sugiere demo o reunión, usa Agendar demo para abrir una plantilla de Google Calendar y revísala antes de guardar.",
      "Si pides cotización, entrega producto de interés, uso principal, ciudad, instalación, capacitación y accesorios relevantes.",
      "Al cerrar la conversación, confirma que exista un próximo paso claro: agendar reunión, preparar presupuesto, pedir datos o derivar a ejecutivo.",
    ],
    checks: [
      "La intención del lead coincide con lo que necesita: demo, cotización, compra o información.",
      "El producto sugerido es razonable para el caso.",
      "Si faltan datos, Talkey los pidió antes de crear un lead activo.",
      "El próximo paso quedó claro y accionable.",
    ],
    tip:
      "El agente no reemplaza una cotización formal; prepara la conversación para que ventas llegue con información útil y menos ruido.",
  },
  {
    id: "crm-ventas",
    number: "04",
    icon: LayoutDashboard,
    title: "CRM de ventas",
    subtitle:
      "Para equipos comerciales que administran prospectos, cuentas, oportunidades, cotizaciones, documentos y traspaso a soporte.",
    audience:
      "Ejecutivos, jefaturas comerciales y equipos que necesitan pipeline claro, próximos pasos y coordinación con postventa.",
    learningGoal: "Aprender a operar el ciclo completo: de lead precalificado a oportunidad, documentos, venta ganada y handoff a soporte.",
    outcome: "Una oportunidad con etapa, monto, cuenta comercial, prospecto, producto, cotización, documentos y próximo paso claros.",
    preview: {
      eyebrow: "CRM ventas",
      title: "Panel de control y pipeline",
      primary: "Pipeline abierto · Forecast ponderado · Foco sugerido",
      secondary: "La oportunidad ganada crea o actualiza cliente y ticket de onboarding en CRM Soporte",
      rows: ["Tareas priorizadas", "Pipeline por etapas", "Detalle de oportunidad", "Documentos de cierre"],
      chips: ["Score", "Riesgo", "Cotización", "Soporte"],
    },
    screenshots: [
      {
        src: "/manual-assets/04-crm-ventas-dashboard.jpg",
        alt: "Ejemplo BioHertz del dashboard del CRM de ventas Talkey",
        caption:
          "Dashboard comercial: permite ver pipeline, forecast, leads calientes, riesgos y actividad reciente sin depender de seguimiento manual.",
        callouts: [
          { label: "Menú comercial", x: "10%", y: "30%" },
          { label: "Métricas del pipeline", x: "48%", y: "25%" },
          { label: "Pipeline por etapa", x: "47%", y: "61%" },
          { label: "Riesgos y actividad", x: "82%", y: "65%" },
        ],
      },
      {
        src: "/manual-assets/05-crm-ventas-smart-agent.jpg",
        alt: "Ejemplo BioHertz del Smart Agent interno en el CRM de ventas Talkey",
        caption:
          "Smart Agent interno: ayuda a priorizar, detectar riesgos, preparar seguimiento, sugerir agenda y revisar handoff hacia soporte.",
        callouts: [
          { label: "Acceso a Smart Agent", x: "79%", y: "12%" },
          { label: "Prospectos y oportunidades", x: "12%", y: "42%" },
          { label: "Recomendaciones del agente", x: "81%", y: "43%" },
          { label: "Conector hacia soporte", x: "10%", y: "73%" },
        ],
      },
    ],
    links: [
      { label: "Ver solución para ventas", href: "/ventas" },
      { label: "Ver precios", href: "/ventas#precios" },
    ],
    before: [
      "Parte en Panel de control para revisar tareas prioritarias, alertas, documentos pendientes, prospectos recomendados y actividad reciente.",
      "Usa Prospectos para revisar leads precalificados por agente, aceptar MQL/SQL, pedir más datos o descartar contactos sin fit.",
      "Recuerda que una cotización debe estar asociada a una oportunidad; se crea desde el detalle de la oportunidad cuando corresponde.",
    ],
    steps: [
      "Abre Panel de control y atiende primero lo rojo o más urgente: tareas por vencer, documentos pendientes, riesgos y foco sugerido.",
      "En Prospectos, revisa leads precalificados por agente. Acepta solo los que tienen intención y datos suficientes.",
      "Crea o confirma la cuenta comercial. Cada prospecto debe quedar asociado a una cuenta para mantener coherencia de datos.",
      "Crea nueva oportunidad desde Pipeline o desde Prospectos. Selecciona cuenta comercial, prospecto, producto, monto, etapa, fecha de cierre y próximo paso del flujo.",
      "Gestiona la oportunidad en Pipeline por etapas. Usa Avanzar o Retroceder cuando cambia el estado comercial.",
      "Abre la oportunidad para trabajar el detalle: botones, datos, cotización, alertas, documentos, historial y siguiente acción.",
      "Cuando la oportunidad llegue a Propuesta o Negociación, crea cotización y completa el flujo documental: propuesta, cotización, email, OC, anexo, contrato, acta y orden de implementación.",
      "Usa Enviar email automático solo después de revisar contenido, destinatario y remitente configurado en Maestro de emails.",
      "Marca como Ganada únicamente cuando la venta sea real. Talkey traspasa automáticamente cliente, contexto y ticket de onboarding a CRM Soporte.",
      "Si un traspaso falla, revisa CRM Soporte: la cola queda en pendiente, reintentando o error, y el botón manual aparece solo para recuperación.",
    ],
    checks: [
      "Cada oportunidad tiene cuenta comercial, prospecto, producto, monto, etapa, fecha y próximo paso.",
      "No hay leads u oportunidades duplicadas sin revisar.",
      "La cotización aparece dentro de la oportunidad y muestra avance documental, por ejemplo 2/8.",
      "Las oportunidades ganadas aparecen como clientes en CRM Soporte o quedan en cola con estado claro.",
    ],
    tip:
      "La regla de oro es simple: si el próximo paso no está claro, el pipeline no está realmente actualizado.",
  },
  {
    id: "administracion-configuracion",
    number: "05",
    icon: Settings,
    title: "Administración y configuración",
    subtitle:
      "Para administradores y gerentes que definen usuarios, permisos, productos, emails, reglas Playbook, conocimiento y datos maestros.",
    audience:
      "Admin Talkey, super-admin empresa, administradores de ventas/soporte, gerentes, data admin, knowledge admin e integration admin.",
    learningGoal: "Aprender qué se configura una vez para que el resto del equipo pueda operar sin improvisar.",
    outcome: "Un entorno con roles claros, catálogo consistente, reglas comerciales visibles y datos compartidos entre ventas y soporte.",
    preview: {
      eyebrow: "Administración",
      title: "Reglas, permisos y maestros",
      primary: "Playbook · Productos · Emails · Customer master",
      secondary: "Los usuarios operativos venden y atienden; la configuración define cómo debe comportarse Talkey.",
      rows: ["Roles y permisos", "Maestro de productos", "Maestro de emails", "Configuración Playbook"],
      chips: ["Seguridad", "Datos", "IA", "Gobierno"],
    },
    screenshots: [],
    links: [
      { label: "Volver a apps", href: "#apps" },
      { label: "Ver buenas prácticas", href: "#practicas" },
    ],
    before: [
      "Define quién puede administrar ventas, soporte, datos, conocimiento, integraciones y seguridad.",
      "Ten claro si la empresa usa ventas, soporte o ambos módulos; Talkey puede operar por módulos y crecer después.",
      "Revisa que productos, remitentes y reglas Playbook reflejen la forma real de vender y atender.",
    ],
    steps: [
      "Crea usuarios y asigna roles: ventas, soporte, gerencia, administración empresa, administración Talkey o perfiles especializados.",
      "Carga o revisa el Maestro de productos para que oportunidades, cotizaciones y agentes hablen de un catálogo consistente.",
      "Configura Maestro de emails con remitente, responder a, prefijo, plantilla, texto base, firma y modo de envío.",
      "Ajusta Configuración Playbook: probabilidades por etapa, plazos de cierre, scoring de prioridad, reglas de cotización, tareas y notificaciones.",
      "Configura la calificación del agente de ventas: umbral MQL, umbral SQL, datos mínimos y si se crean leads automáticamente al llegar a MQL.",
      "Revisa automatizaciones: riesgo comercial, preparación de cierre, sugerencia de demo, duplicados y traspaso de ventas ganadas a soporte.",
      "Gobierna Customer master: revisa duplicados, fusiona registros autorizados y mantén un historial único de cliente.",
      "Audita acciones sensibles y eventos IA para entender qué hizo el sistema, quién cambió algo y dónde puede mejorar la operación.",
    ],
    checks: [
      "Cada usuario tiene el mínimo permiso necesario para su rol.",
      "Los productos activos son los que deben aparecer en oportunidades y cotizaciones.",
      "Hay un email maestro predeterminado para envíos comerciales.",
      "Las reglas Playbook explican claramente cómo Talkey prioriza, notifica y automatiza.",
    ],
    tip:
      "Configurar bien al inicio reduce errores operativos después: menos texto libre, menos duplicados y menos decisiones escondidas.",
  },
];

const quickFlows = [
  { icon: MessageSquareText, title: "Usuario conversa", text: "Cliente o prospecto explica lo que necesita en lenguaje natural." },
  { icon: Sparkles, title: "Talkey ordena", text: "Clasifica, resume, detecta datos faltantes, prioridad y próximo paso." },
  { icon: ShieldCheck, title: "Equipo valida", text: "Ventas o soporte revisa decisiones sensibles antes de prometer o cerrar algo." },
  { icon: CheckCircle2, title: "Caso trazable", text: "Queda historial, estado, responsable, documento o acción siguiente." },
];

const bestPractices = [
  "Empieza por el objetivo del usuario: resolver un problema, calificar un lead, avanzar una oportunidad o configurar una regla.",
  "Usa nombres consistentes: CRM de ventas, CRM Soporte, cuenta comercial, prospecto, oportunidad, Smart Agent y Customer master.",
  "No mezcles temas distintos en el mismo ticket ni oportunidades distintas en una sola conversación.",
  "En soporte, valida riesgos, garantías y procedimientos sensibles antes de enviar una respuesta sugerida.",
  "En ventas, deja siempre un próximo paso concreto: llamada, demo, cotización, documento pendiente o handoff a soporte.",
  "Revisa las sugerencias de IA antes de usarlas. Talkey acelera, pero el equipo decide.",
  "Cuando una solución o respuesta se repite, conviértela en conocimiento reutilizable para que Talkey atienda mejor la próxima vez.",
  "Si una regla de prioridad se corrige manualmente, documenta por qué: esa decisión debe quedar por sobre el recálculo automático.",
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

function ManualScreenshots({ manual }: { manual: AppManual }) {
  if (!manual.screenshots.length) return null;

  return (
    <div className="mk-manual-shot-list" aria-label={`Capturas anotadas de ${manual.title}`}>
      {manual.screenshots.map((screenshot) => (
        <figure className="mk-manual-shot" key={screenshot.src}>
          <div className="mk-manual-shot-frame">
            <Image src={screenshot.src} alt={screenshot.alt} width={1280} height={720} loading="lazy" />
            <div className="mk-manual-shot-callouts" aria-hidden="true">
              {screenshot.callouts.map((callout) => (
                <span
                  className="mk-manual-shot-callout"
                  key={callout.label}
                  style={{ left: callout.x, top: callout.y }}
                >
                  {callout.label}
                </span>
              ))}
            </div>
          </div>
          <figcaption>{screenshot.caption}</figcaption>
        </figure>
      ))}
    </div>
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
            <a href="#ruta-aprendizaje">Ruta</a>
            <a href="#apps">Apps</a>
            <a href="#conceptos">Glosario</a>
            <a href="#manuales">Manuales</a>
            <a href="#administracion">Administración</a>
          </nav>
          <div className="mk-manual-nav-actions">
            <Link className="mk-nav-cta mk-nav-cta-sales" href="/ventas">
              Ver Talkey Ventas <ArrowUpRight size={16} />
            </Link>
            <Link className="mk-nav-cta" href="/soporte">
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
            <h1>Aprende a usar Talkey de punta a punta.</h1>
            <p>
              Esta guía explica qué hace cada app, cuándo usarla, qué datos mirar, qué botones ejecutar y cómo verificar que el trabajo quedó trazable. Está pensada para usuarios nuevos, equipos de ventas, soporte, gerentes y administradores.
            </p>
            <div className="mk-manual-hero-actions">
              <a className="mk-button mk-button-primary" href="#ruta-aprendizaje">
                Empezar aprendizaje <ArrowRight size={18} />
              </a>
              <a className="mk-button mk-button-secondary" href="#conceptos">
                Ver glosario <FileText size={18} />
              </a>
            </div>
          </div>

          <aside className="mk-manual-flow-card" aria-label="Flujo general de Talkey">
            <p>Modelo mental básico</p>
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

      <section className="mk-manual-example-note" aria-label="Nota sobre imágenes de ejemplo">
        <div className="mk-container">
          <div>
            <strong>Imágenes de ejemplo</strong>
            <p>
              Las capturas muestran una interfaz Talkey aplicada a BioHertz. En una implementación real, tu empresa verá su propio logo, colores institucionales, productos, canales y reglas operativas.
            </p>
          </div>
        </div>
      </section>

      <section id="ruta-aprendizaje" className="mk-section mk-manual-learning">
        <div className="mk-container">
          <div className="mk-manual-section-head mk-manual-section-head-compact">
            <div className="mk-section-label">
              <span>01</span> Ruta de aprendizaje
            </div>
            <h2>Primero entiende la tarea; después usa la pantalla.</h2>
            <p>
              La guía está organizada para reducir memoria y evitar tutoriales largos: propósito, ubicación visual, pasos concretos y checklist final.
            </p>
          </div>
          <div className="mk-manual-learning-grid">
            {learningPath.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <Icon size={20} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="apps" className="mk-section mk-manual-apps">
        <div className="mk-container">
          <div className="mk-manual-section-head">
            <div className="mk-section-label">
              <span>02</span> Elige tu app
            </div>
            <h2>Empieza por la experiencia que vas a usar.</h2>
            <p>
              Cada app resuelve una tarea distinta. Si no sabes por dónde partir, busca tu rol: cliente, prospecto, soporte, ventas, gerente o administrador.
            </p>
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

      <section id="conceptos" className="mk-section mk-manual-concepts">
        <div className="mk-container">
          <div className="mk-manual-section-head mk-manual-section-head-compact">
            <div className="mk-section-label">
              <span>03</span> Glosario operativo
            </div>
            <h2>Conceptos que conviene reconocer antes de operar.</h2>
            <p>
              Talkey usa palabras de ventas, soporte y administración. Este glosario evita que el usuario tenga que recordar definiciones de otras pantallas.
            </p>
          </div>
          <div className="mk-manual-concept-grid">
            {coreConcepts.map(([term, definition]) => (
              <article key={term}>
                <strong>{term}</strong>
                <p>{definition}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="manuales" className="mk-section mk-manual-guides">
        <div className="mk-container">
          <div className="mk-manual-section-head mk-manual-section-head-compact">
            <div className="mk-section-label">
              <span>04</span> Manuales paso a paso
            </div>
            <h2>Usa Talkey con calma, pero con foco.</h2>
            <p>
              Cada manual explica el objetivo, el resultado esperado, lo que debes preparar, los pasos de uso y cómo comprobar que quedó bien.
            </p>
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

                  <div className="mk-manual-objective-row">
                    <article>
                      <strong>Objetivo de aprendizaje</strong>
                      <p>{manual.learningGoal}</p>
                    </article>
                    <article>
                      <strong>Resultado esperado</strong>
                      <p>{manual.outcome}</p>
                    </article>
                  </div>

                  <InterfacePreview manual={manual} />
                  <ManualScreenshots manual={manual} />

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

      <section id="administracion" className="mk-section mk-manual-admin">
        <div className="mk-container">
          <div className="mk-manual-section-head mk-manual-section-head-compact">
            <div className="mk-section-label">
              <span>05</span> Administración y flujo comercial
            </div>
            <h2>Lo que se configura para que el equipo opere simple.</h2>
            <p>
              Las configuraciones viven detrás de la operación diaria: no todos los usuarios las editan, pero todos se benefician de que existan reglas claras.
            </p>
          </div>

          <div className="mk-manual-admin-grid">
            {adminModules.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <Icon size={20} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mk-manual-document-flow">
            <div>
              <span>Flujo documental de ventas</span>
              <h3>La oportunidad avanza cuando sus documentos quedan completos.</h3>
              <p>
                Una cotización no vive aislada: debe estar asociada a una oportunidad y al momento del flujo donde corresponde cotizar.
              </p>
            </div>
            <ol>
              {salesDocumentFlow.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="practicas" className="mk-section mk-manual-practices">
        <div className="mk-container mk-manual-practices-grid">
          <div>
            <div className="mk-section-label">
              <span>06</span> Buenas prácticas
            </div>
            <h2>Hábitos pequeños que hacen que Talkey funcione mucho mejor.</h2>
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
            <h2>Cuando tengas dudas, vuelve a esta página y parte por tu objetivo.</h2>
            <p>
              Talkey funciona mejor cuando las personas no memorizan el sistema, sino que reconocen la tarea, siguen el flujo y verifican el resultado. Esa es la lógica de estos manuales.
            </p>
            <a className="mk-button mk-button-primary" href="#ruta-aprendizaje">
              Volver al inicio del manual <ArrowRight size={18} />
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
