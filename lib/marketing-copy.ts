export type MarketingLocale = "es" | "en" | "it";

export type PricingSimulatorCopy = {
  kicker: string;
  title: string;
  body: string;
  sections: {
    operation: string;
    scope: string;
    readiness: string;
    channels: string;
  };
  fields: {
    agents: string;
    monthlyTickets: string;
    products: string;
    variantsPerProduct: string;
    documents: string;
    cleanDocs: string;
    troubleshootingStatus: string;
    protocolStatus: string;
    interviewExperts: string;
    channels: string;
  };
  help: {
    agents: string;
    monthlyTickets: string;
    products: string;
    variantsPerProduct: string;
    readinessIntro: string;
    documents: string;
    channelsIntro: string;
  };
  options: {
    monthlyTickets: string[];
    cleanDocs: string[];
    troubleshootingStatus: string[];
    protocolStatus: string[];
    interviewExperts: string[];
    channels: string[];
  };
  results: {
    estimateBadge: string;
    monthlyRange: string;
    rangePrefix: string;
    rangeConnector: string;
    implementationRange: string;
    demoButton: string;
    legal: string;
    monthlySuffix: string;
    implementationSuffix: string;
    notes: string[];
  };
  warnings: {
    title: string;
    noChannels: string;
    manyProducts: string;
    manyDocuments: string;
    missingTroubleshooting: string;
    missingProtocols: string;
    phoneSelected: string;
    lowCurrentCost: string;
  };
};

export type MarketingCopy = {
  languageName: string;
  nav: { product: string; how: string; impact: string; pricing: string; security: string; quote: string; menu: string };
  hero: {
    eyebrow: string;
    lead: string;
    emphasis: string;
    tail: string;
    body: string;
    primary: string;
    secondary: string;
    proof: string[];
  };
  chat: {
    live: string;
    open: string;
    minimize: string;
    welcome: string;
    prompts: string[];
    placeholder: string;
    send: string;
    typing: string;
    danger: string;
    actions: {
      pricingSimulator: string;
      tryAnotherCase: string;
      bookReview: string;
      bookDemo: string;
    };
    responses: {
      pricing: string;
      implementation: string;
      implementationFollowUp: string;
      integration: string;
      security: string;
      technical: string;
      troubleshootingPicker: string;
      problemSolved: string;
      ticketComparison: string;
      elevenLabsComparison: string;
      zendeskComparison: string;
      intercomComparison: string;
      supportLeader: string;
      noManuals: string;
      noTroubleshootings: string;
      noManualsOrTroubleshootings: string;
      peopleDependency: string;
      supportMetrics: string;
      humanRole: string;
      directChatGpt: string;
      expensive: string;
      guarantee75: string;
      wrongAnswers: string;
      dataTraining: string;
      customerMemory: string;
      productPhotoRecognition: string;
      whatsapp: string;
      voiceVersion: string;
      industryFit: string;
      negativeChallenge: string;
      absurd: string;
      unsafeTechnical: string;
      truthfulSupport: string;
      competitorComparison: string;
      fallback: string;
    };
  };
  metrics: { value: string; label: string }[];
  always: { kicker: string; first: string; firstValue: string; second: string; secondValue: string; body: string };
  capabilities: {
    kicker: string;
    title: string;
    body: string;
    items: { title: string; text: string }[];
  };
  how: {
    kicker: string;
    title: string;
    steps: { number: string; title: string; text: string }[];
  };
  impact: { kicker: string; title: string; body: string; cta: string; notes: string[] };
  pricing: PricingSimulatorCopy;
  security: {
    kicker: string;
    title: string;
    body: string;
    items: { title: string; text: string }[];
  };
  scheduler: {
    kicker: string;
    title: string;
    body: string;
    duration: string;
    channel: string;
    name: string;
    company: string;
    email: string;
    date: string;
    time: string;
    submit: string;
    note: string;
    success: string;
    subject: string;
    details: string;
  };
  footer: { line: string; product: string; admin: string; support: string };
};

export const archivedSupportChatPrompts: Record<MarketingLocale, string[]> = {
  es: [
    "¿Por qué Talkey es diferente a un software de tickets?",
    "¿Qué pasa si no tengo manuales o troubleshootings?",
    "Tengo un problema con Talkey",
    "¿Cuánto cuesta Talkey?",
  ],
  en: [
    "How is Talkey different from ticketing software?",
    "How is Talkey different from ElevenLabs?",
    "What if I do not have manuals or troubleshooting procedures?",
    "What if support depends on specific people?",
    "How does Talkey help improve customer satisfaction?",
    "I have a Talkey issue",
    "How much does Talkey cost?",
  ],
  it: [
    "Perché Talkey è diverso da un software ticket?",
    "Perché Talkey è diverso da ElevenLabs?",
    "Cosa succede se non ho manuali o troubleshooting?",
    "Cosa succede se il supporto dipende da persone specifiche?",
    "In che modo Talkey aiuta a migliorare la soddisfazione dei clienti?",
    "Ho un problema con Talkey",
    "Quanto costa Talkey?",
  ],
};

export const marketingCopy: Record<MarketingLocale, MarketingCopy> = {
  es: {
    languageName: "Español",
    nav: { product: "Producto", how: "Cómo funciona", impact: "Impacto", pricing: "Simulador de precios", security: "Seguridad", quote: "Agenda una cotización", menu: "Abrir menú" },
    hero: {
      eyebrow: "Soporte técnico consistente · Disponible 24/7",
      lead: "Soporte técnico consistente",
      emphasis: "CON CONOCIMIENTO ESTRUCTURADO",
      tail: "para operaciones de postventa",
      body: "Talkey transforma manuales, procedimientos y experiencia técnica en respuestas claras, trazables y siempre disponibles.",
      primary: "Solicitar evaluación",
      secondary: "Probar demo",
      proof: ["Sin reemplazar tu equipo", "Derivación humana", "Respuestas trazables"],
    },
    chat: {
      live: "Demo en vivo · Pruébala ahora",
      open: "Abrir demostración en vivo",
      minimize: "Minimizar demostración",
      welcome: "Hola, soy Talkey. Puedo explicarte qué problema resuelve Talkey, cómo se diferencia de otras herramientas, cómo se implementa o mostrarte un caso simulado de soporte técnico. ¿Qué quieres saber?",
      prompts: [],
      placeholder: "Pregúntame sobre Talkey...",
      send: "Enviar mensaje",
      typing: "Talkey está preparando una respuesta",
      danger: "Soporte técnico Talkey",
      actions: {
        pricingSimulator: "Ir al simulador de precios",
        tryAnotherCase: "Probar otro caso",
        bookReview: "Agendar revisión con Talkey",
        bookDemo: "Agendar una demo",
      },
      responses: {
        pricing: "El precio depende del tamaño de tu operación, productos, documentos, canales y nivel de preparación técnica. Para no inventar un número, puedes usar el simulador de precios y obtener una estimación referencial en CLP.",
        implementation: "La implementación suele avanzar en cinco pasos: diagnóstico de tu operación actual, revisión de manuales y FAQs, estructuración de protocolos y troubleshooting, configuración de canales y reglas de derivación a humanos, y una etapa de pruebas con casos reales antes de salir a producción. Si faltan documentos o procedimientos, Talkey puede ayudarte a construirlos. ¿Qué necesitas saber en detalle sobre la implementación?",
        implementationFollowUp: "Las etapas típicas son: 1. entender tu operación de soporte; 2. revisar manuales, FAQs y documentos técnicos; 3. construir o ajustar protocolos y troubleshooting; 4. configurar canales, reglas de seguridad y derivación a humanos; 5. probar casos reales antes de salir a producción. ¿Qué otras cosas te gustaría saber sobre la implementación?",
        integration: "Puedes incorporar Talkey en tu sitio web, portal de clientes, QR de producto o canales como WhatsApp y email. También puede integrarse al CRM, calendario de agendamiento o sistema interno que la empresa ya usa. Para visitas técnicas, Google Calendar es el primer conector previsto, y el mismo flujo puede adaptarse a otros agendadores. Además, puede detectar el modelo del producto cuando el usuario toma una foto con el celular de un QR, número de serie o etiqueta, agilizando el soporte desde el primer mensaje.",
        security: "Talkey responde desde conocimiento aprobado por tu empresa, mantiene trazabilidad de las respuestas y deriva a un humano cuando detecta riesgo, baja certeza o frustración.",
        technical: "Como este es un demo, podemos usar un caso simulado para mostrar cómo Talkey diagnosticaría un problema de soporte técnico. Elige uno de los problemas simulados para probarlo.",
        troubleshootingPicker: "Elige uno de estos problemas simulados para ver cómo Talkey organizaría el diagnóstico, propondría una solución o derivaría el caso si corresponde.",
        problemSolved: "Talkey resuelve un problema operativo muy concreto: el conocimiento técnico de muchas empresas está disperso entre manuales, PDFs, fichas, criterios de técnicos y experiencia de personas específicas. Talkey convierte ese conocimiento en respuestas consistentes, diagnósticos guiados y criterios claros de derivación a humanos, disponibles en los canales donde atiendes a tus clientes.",
        ticketComparison: "Un software de tickets ordena conversaciones, prioridades y estados. Talkey se enfoca en resolver el problema técnico: entiende documentación, guía diagnóstico, propone pasos de solución y entrega contexto cuando hay que derivar a un especialista. Puede convivir con un software de tickets; no compite con él como bandeja de atención.",
        elevenLabsComparison: "ElevenLabs es muy fuerte en voz y agentes conversacionales. Talkey también puede tener una versión con voz, pero la diferencia central no es hablar: es responder desde el conocimiento técnico de tu empresa. La experiencia se parece a conversar con un agente senior de soporte: paciente, consistente y guiado por manuales, procedimientos, troubleshootings, historial operativo cuando está disponible y criterios de derivación a humanos. Eso permite respuestas más coherentes y más capacidad real de resolver casos o pasar el caso al humano más preparado con buen contexto.",
        zendeskComparison: "Zendesk es excelente para gestionar tickets, conversaciones y flujos de atención. Talkey cubre otra capa: ayudar a resolver problemas técnicos usando conocimiento estructurado, procedimientos, troubleshootings y criterios de derivación.",
        intercomComparison: "Intercom es excelente para comunicación con clientes, mensajería y automatización comercial o de soporte general. Talkey está diseñado para soporte técnico especializado: productos, manuales, síntomas, diagnósticos, procedimientos y derivación con contexto técnico.",
        supportLeader: "A un gerente de soporte técnico, Talkey le ayuda a reducir variabilidad: respuestas más consistentes, menos dependencia de memoria individual, mejor diagnóstico remoto, más visibilidad de qué casos se derivan a especialistas y por qué, y métricas más claras sobre resolución, tiempos y costo por caso.",
        noManuals: "Si no tienes manuales ordenados, no es un bloqueo automático. Talkey puede partir con entrevistas a expertos internos, tickets históricos, FAQs, fichas técnicas parciales o documentos existentes. En la implementación se puede estructurar esa información para construir una base de conocimiento útil y mantenible.",
        noTroubleshootings: "Si no tienes troubleshootings documentados, Talkey puede ayudar a construirlos. Normalmente se parte por los problemas más frecuentes o costosos, se define una secuencia de preguntas, se agregan criterios de seguridad y se establece cuándo derivar a una persona.",
        noManualsOrTroubleshootings: "Si no tienes manuales ordenados ni troubleshootings, no es un bloqueo automático. Talkey puede partir con entrevistas a expertos internos, tickets históricos, FAQs, fichas técnicas parciales o documentos existentes. Durante la implementación se estructura ese conocimiento y se construyen troubleshootings para los casos más frecuentes o costosos.",
        peopleDependency: "Cuando el soporte depende de personas específicas, la operación se vuelve frágil: si esa persona no está, cambia la calidad de la respuesta. Talkey ayuda a capturar ese conocimiento y convertirlo en criterios compartidos, para que el equipo responda con más consistencia.",
        supportMetrics: "Talkey puede ayudar a mejorar la satisfacción de clientes porque reduce respuestas contradictorias, guía diagnósticos paso a paso y permite derivar casos complejos con más contexto. No reemplaza todos los casos humanos, pero ayuda a que la atención sea más clara, consistente y oportuna. Si lo quieres medir, las métricas más relevantes suelen ser: porcentaje de casos resueltos en el primer contacto, tiempo promedio de atención, tiempo total de resolución, porcentaje de derivaciones a humanos, costo por caso atendido y satisfacción de clientes. La satisfacción de clientes mide qué tan conforme queda una persona después de recibir soporte. Si quieres revisar cómo se aplicaría a tu operación, puedes solicitar una evaluación.",
        humanRole: "No necesariamente, pero es posible si esa es tu decisión operativa. Talkey puede absorber consultas repetitivas y casos de conocimiento superficial; aun así, conviene mantener a las personas con conocimiento técnico profundo para casos complejos, validación, excepciones y decisiones sensibles.",
        directChatGpt: "ChatGPT puede responder preguntas generales. Talkey está pensado para operar soporte técnico con conocimiento aprobado de tu empresa, procedimientos, historial cuando está disponible, criterios de derivación y contexto por cliente o producto. La diferencia no es solo conversar: es responder con el estándar operativo de tu postventa.",
        expensive: "Talkey no se posiciona como una herramienta barata. Es una solución premium para soporte técnico: normalmente se estima cerca del costo actual de operación, con un rango referencial entre 10% y 15% bajo una operación humana equivalente, porque busca mejorar consistencia, disponibilidad y capacidad de resolución.",
        guarantee75: "Es posible lograr una reducción alta de problemas atendidos por humanos, pero no corresponde prometerlo sin evaluación. Depende de documentación, tipo de casos, canales, productos, volumen, calidad de la implementación y criterios de derivación.",
        wrongAnswers: "Talkey, como cualquier sistema, puede equivocarse si está mal configurado o si la base de conocimiento está incompleta. Bien implementado, debería equivocarse menos que una operación humana informal porque responde desde conocimiento aprobado, mantiene criterios consistentes, deja trazabilidad y deriva a una persona cuando hay baja certeza o riesgo.",
        dataTraining: "No. La información de una empresa no debe usarse para entrenar respuestas de otros clientes. Talkey se diseña con separación por cliente, conocimiento aprobado y revisión técnica/contractual para proteger manuales, procedimientos y datos sensibles.",
        customerMemory: "Sí, cuando se integra con el historial disponible del cliente. Así la atención no parte desde cero: Talkey puede considerar problemas previos, producto asociado, datos ya levantados y derivaciones anteriores para continuar con más contexto.",
        productPhotoRecognition: "Sí, como capacidad configurable según implementación. El cliente puede enviar una foto tomada con su celular de la etiqueta, QR o número de serie; Talkey identifica el producto o modelo y acelera el diagnóstico desde el primer mensaje.",
        whatsapp: "Sí, puede funcionar con WhatsApp, pero se debe evaluar y configurar según el flujo, volumen, datos necesarios, reglas de derivación y canales actuales de la empresa.",
        voiceVersion: "Sí. Talkey puede tener una versión con voz: una experiencia similar a hablar con un agente senior de soporte, paciente, consistente y basado en el conocimiento aprobado de la empresa.",
        industryFit: "Talkey puede implementarse cuando el soporte depende de productos o servicios con documentación, procedimientos, preguntas frecuentes, historial de casos o criterios técnicos. No es solo para una industria: aplica donde resolver bien exige conocimiento estructurado.",
        negativeChallenge: "¿Qué te hace pensar eso? Si tu duda es el precio, la precisión, la implementación o la diferencia con un chatbot común, puedo responderlo directamente con el enfoque de Talkey.",
        absurd: "No, Talkey no está diseñado para eso. Está diseñado para soporte técnico de productos y servicios: entender síntomas, usar documentación, guiar diagnósticos y derivar con contexto cuando corresponde.",
        unsafeTechnical: "No puedo guiar acciones peligrosas o que anulen medidas de seguridad. En un caso real, Talkey debería detener el autoservicio, levantar los datos relevantes y derivar a un técnico o canal autorizado.",
        truthfulSupport: "No. Talkey no debe inventar, ocultar información ni cerrar tickets de forma engañosa. El objetivo es precisión, trazabilidad y derivación cuando no hay certeza suficiente.",
        competitorComparison: "La comparación correcta es por capa de problema. Herramientas como Zendesk, Intercom o Freshdesk ordenan conversaciones y tickets; ElevenLabs destaca en voz; ChatGPT responde preguntas generales. Talkey se enfoca en resolver soporte técnico con conocimiento estructurado, procedimientos, historial cuando está disponible y derivación con contexto.",
        fallback: "Puedo explicarte qué problema resuelve Talkey, compararlo con Zendesk, Intercom o ElevenLabs, hablar de implementación, integración, seguridad, métricas o mostrarte un caso simulado de soporte técnico.",
      },
    },
    metrics: [
      { value: "24/7", label: "disponibilidad evaluable según canal" },
      { value: "1", label: "criterio común para casos repetidos" },
      { value: "N", label: "productos y modelos con conocimiento estructurado" },
      { value: "Humano", label: "derivación cuando corresponde" },
    ],
    always: {
      kicker: "Una experiencia que protege tu marca",
      first: "SIEMPRE",
      firstValue: "AMABLE",
      second: "SIEMPRE",
      secondValue: "RESUELVE",
      body: "El tono que definiste, la información que aprobaste y el criterio para saber cuándo debe intervenir una persona.",
    },
    capabilities: {
      kicker: "Diseñado para soporte técnico real",
      title: "Mucho más que respuestas automáticas.",
      body: "Talkey entiende el producto, sigue procedimientos y entrega contexto completo cuando el caso necesita a tu equipo.",
      items: [
        { title: "Conocimiento controlado", text: "Responde desde manuales, troubleshooting y políticas que tu empresa aprueba." },
        { title: "Diagnóstico guiado", text: "Hace una pregunta a la vez y adapta el siguiente paso a cada respuesta." },
        { title: "Derivación inteligente", text: "Detecta riesgo, frustración o falta de certeza y deriva con todo el contexto." },
        { title: "Integración sencilla", text: "Se incorpora a tu web, QR de producto, portal, CRM o calendario de agendamiento mediante API." },
      ],
    },
    how: {
      kicker: "Cómo funciona",
      title: "Del manual a la solución, sin perder control.",
      steps: [
        { number: "01", title: "Carga tu conocimiento", text: "Manuales, protocolos, preguntas frecuentes y reglas de seguridad." },
        { number: "02", title: "Talkey identifica la intención", text: "Reconoce producto, síntoma, urgencia y contexto antes de responder." },
        { number: "03", title: "Resuelve o deriva", text: "Guía al cliente y entrega a tu equipo un caso documentado cuando hace falta." },
      ],
    },
    impact: {
      kicker: "Impacto medible",
      title: "Mejora la consistencia de soporte y reduce carga repetitiva en tu equipo",
      body: "Menos tiempo buscando información. Menos criterios distintos para el mismo problema. Más casos con contexto antes de llegar a un especialista.",
      cta: "Hablemos de tu operación",
      notes: ["Menor tiempo de primera respuesta", "Resoluciones consistentes", "Trazabilidad por conversación"],
    },
    pricing: {
      kicker: "Simulador de precios",
      title: "¿Cuánto podría costar tu soporte técnico usando solo Talkey?",
      body: "Talkey no se calcula como un software genérico. El precio depende del tamaño de tu operación, volumen de soporte, canales, productos y trabajo necesario para convertir conocimiento técnico en soporte confiable.",
      sections: {
        operation: "1. Operación actual",
        scope: "2. Necesidades de soporte",
        readiness: "3. Preparación técnica",
        channels: "4. Canales que Talkey atenderá",
      },
      fields: {
        agents: "Número de agentes humanos",
        monthlyTickets: "Consultas/tickets mensuales",
        products: "Número de productos (modelos específicos)",
        variantsPerProduct: "Número promedio de versiones/variantes por producto",
        documents: "Número de documentos existentes",
        cleanDocs: "¿Se requiere limpiar documentos?",
        troubleshootingStatus: "Estado de troubleshootings",
        protocolStatus: "Estado de protocolos",
        interviewExperts: "¿Talkey debe entrevistar expertos internos para construir la base de conocimiento?",
        channels: "Canales incluidos en Talkey",
      },
      help: {
        agents: "Personas que hoy atienden soporte técnico o telefónico.",
        monthlyTickets: "Estimación del volumen mensual de llamadas, mensajes o solicitudes de soporte.",
        products: "Cuenta cada modelo específico como un producto independiente. Por ejemplo, si tienes tres modelos distintos de calentadores, ingresa 3. Puede ser un número aproximado para hacerte una idea del precio de Talkey.",
        variantsPerProduct: "Ejemplo: versiones por año, variantes de potencia, tamaños o configuraciones.",
        readinessIntro: "Estas actividades ayudan a que Talkey funcione correctamente y mejoran la calidad general del soporte técnico.",
        documents: "Cuenta cada archivo fuente como un documento independiente: PDF, Word, Excel, ficha técnica, manual, presentación, etc.",
        channelsIntro: "Selecciona los canales que deseas que Talkey atienda. Estos no son tus canales actuales, sino los canales incluidos en la solución Talkey.",
      },
      options: {
        monthlyTickets: ["Hasta 500", "501 a 1.500", "1.501 a 3.000", "3.001 a 7.000", "Más de 7.000", "No lo sé"],
        cleanDocs: ["No", "Sí"],
        troubleshootingStatus: ["Ya existen y están estructurados", "Existen parcialmente", "No existen"],
        protocolStatus: ["Ya existen", "Existen parcialmente", "No existen"],
        interviewExperts: ["No", "Sí"],
        channels: ["Web", "WhatsApp", "Email", "Voz telefónica"],
      },
      results: {
        monthlyRange: "Precio mensual estimado Talkey",
        rangePrefix: "Entre",
        rangeConnector: "y",
        estimateBadge: "CLP · estimación referencial mensual",
        implementationRange: "Costo fijo de implementación estimado",
        demoButton: "Solicitar una demostración",
        legal: "Estos valores son estimativos y deben validarse mediante una evaluación comercial y técnica.",
        monthlySuffix: "/ mes",
        implementationSuffix: "Se paga solo una vez",
        notes: [
          "Los canales seleccionados pueden modificar el costo mensual estimado.",
          "La implementación depende de productos, documentos, protocolos y preparación técnica.",
        ],
      },
      warnings: {
        title: "Notas del simulador",
        noChannels: "Selecciona al menos un canal que Talkey atenderá.",
        manyProducts: "Alto número de modelos: se recomienda una evaluación técnica específica.",
        manyDocuments: "Alto volumen documental: la preparación de la base de conocimiento puede requerir revisión adicional.",
        missingTroubleshooting: "Si los troubleshootings no existen o no están completos, Talkey puede hacerse cargo de crearlos o completarlos como parte de la implementación.",
        missingProtocols: "Si los protocolos no existen o no están completos, Talkey puede hacerse cargo de generar o estructurar los protocolos faltantes como parte de la implementación.",
        phoneSelected: "La voz telefónica requiere pruebas adicionales de latencia, fallback y calidad conversacional.",
        lowCurrentCost: "El costo actual estimado es bajo para una solución B2B completa. El precio final debe validarse comercialmente.",
      },
    },
    security: {
      kicker: "Confianza desde el diseño",
      title: "Respuestas consistentes. Tu empresa mantiene el control.",
      body: "Talkey separa el conocimiento por empresa y producto, muestra las fuentes utilizadas y detiene el autoservicio ante riesgos críticos.",
      items: [
        { title: "Fuentes visibles", text: "Cada indicación puede conservar su manual y referencia de origen." },
        { title: "Permisos por rol", text: "Clientes, agentes humanos, supervisores y administradores ven lo que corresponde." },
        { title: "Reglas determinísticas", text: "Las emergencias no dependen de una respuesta creativa del modelo." },
      ],
    },
    scheduler: {
      kicker: "Solicitar evaluación",
      title: "Revisemos si Talkey calza con tu operación de soporte técnico",
      body: "Cuéntanos cómo funciona tu soporte, qué productos y servicios atiendes, qué documentación existe y qué canales necesitas cubrir. En 30 minutos revisaremos si Talkey puede ayudarte y qué haría falta para implementarlo.",
      duration: "30 minutos",
      channel: "Página de reservas",
      name: "Tu nombre",
      company: "Empresa",
      email: "Correo de trabajo",
      date: "Fecha",
      time: "Hora",
      submit: "Ver horarios disponibles",
      note: "Elige un horario disponible en la página de reservas de Talkey. Recibirás la confirmación y los detalles de la reunión.",
      success: "Reserva confirmada.",
      subject: "Evaluación Talkey",
      details: "Reunión de 30 minutos para revisar la operación de soporte técnico y evaluar si Talkey calza con la empresa.",
    },
    footer: { line: "Soluciones técnicas que fidelizan.", product: "Probar soporte", admin: "Administrar conocimiento", support: "Escribir a Talkey" },
  },
  en: {
    languageName: "English",
    nav: { product: "Product", how: "How it works", impact: "Impact", pricing: "Pricing simulator", security: "Security", quote: "Book a consultation", menu: "Open menu" },
    hero: {
      eyebrow: "Consistent technical support · Available 24/7",
      lead: "Consistent technical support",
      emphasis: "WITH STRUCTURED KNOWLEDGE",
      tail: "for post-sale operations",
      body: "Talkey turns manuals, procedures and technical expertise into clear, traceable answers that are always available.",
      primary: "Request evaluation",
      secondary: "Try demo",
      proof: ["No team replacement", "Human handoff", "Traceable answers"],
    },
    chat: {
      live: "Live demo · Try it now",
      open: "Open live demonstration",
      minimize: "Minimize demonstration",
      welcome: "Hi, I am Talkey. I can explain what problem Talkey solves, how it differs from other tools, how implementation works or show a simulated technical support case. What would you like to know?",
      prompts: [],
      placeholder: "Ask me about Talkey",
      send: "Send message",
      typing: "Talkey is preparing a response",
      danger: "Talkey technical support",
      actions: {
        pricingSimulator: "Go to pricing simulator",
        tryAnotherCase: "Try another case",
        bookReview: "Book a Talkey review",
        bookDemo: "Book a demo",
      },
      responses: {
        pricing: "Pricing depends on your operation size, products, documents, channels and technical readiness. To avoid inventing a number, use the pricing simulator for a reference estimate in CLP.",
        implementation: "Implementation usually moves through five steps: understanding your current support operation, reviewing manuals and FAQs, structuring protocols and troubleshooting flows, configuring channels and human handoff rules, and testing with real cases before launch. If documents or procedures are missing, Talkey can help create them. What would you like to know in detail about implementation?",
        implementationFollowUp: "The usual stages are: 1. understand your support operation; 2. review manuals, FAQs and technical documents; 3. build or adjust protocols and troubleshooting flows; 4. configure channels, safety rules and human handoff; 5. test real cases before launch. What else would you like to know about implementation?",
        integration: "You can add Talkey to your website, customer portal, product QR codes or channels like WhatsApp and email. It can also integrate with the CRM, booking calendar or internal system your company already uses. For technical visits, Google Calendar is the first planned connector, and the same flow can adapt to other scheduling systems. It can also detect the product model when a user takes a phone photo of a QR code, serial number or label, speeding up support from the first message.",
        security: "Talkey answers from company-approved knowledge, keeps response traceability and hands off to a human when it detects risk, low confidence or frustration.",
        technical: "Because this is a demo, we can use a simulated case to show how Talkey would diagnose a technical support issue. Choose one simulated problem to try it.",
        troubleshootingPicker: "Choose one of these simulated problems to see how Talkey would organize diagnosis, recommend a solution or hand off the case when needed.",
        problemSolved: "Talkey solves a specific operating problem: technical knowledge is often scattered across manuals, PDFs, sheets, technician criteria and the experience of specific people. Talkey turns that knowledge into consistent answers, guided diagnostics and clear human handoff criteria in the channels where you support customers.",
        ticketComparison: "Ticketing software organizes conversations, priorities and statuses. Talkey focuses on solving the technical issue: it understands documentation, guides diagnosis, recommends next steps and provides context when a human needs to take over. It can work alongside ticketing software.",
        elevenLabsComparison: "ElevenLabs is very strong in voice and conversational agents. Talkey can also have a voice version, but the central difference is not speaking: it is answering from your company's technical knowledge. The experience feels closer to speaking with a senior support agent: patient, consistent and guided by manuals, procedures, troubleshooting flows, operational history when available and human handoff criteria. That enables more coherent answers and a stronger ability to resolve cases or hand off to the right human expert with proper context.",
        zendeskComparison: "Zendesk is excellent for managing tickets, conversations and support workflows. Talkey covers another layer: helping resolve technical issues using structured knowledge, procedures, troubleshooting and human handoff criteria.",
        intercomComparison: "Intercom is excellent for customer communication, messaging and general support automation. Talkey is built for specialized technical support: products, manuals, symptoms, diagnostics, procedures and handoff with technical context.",
        supportLeader: "For a technical support leader, Talkey reduces variability: more consistent answers, less reliance on individual memory, better remote diagnosis, more visibility into which cases are handed off and why, and clearer metrics around resolution, time and cost per case.",
        noManuals: "If your manuals are not organized, that is not an automatic blocker. Talkey can start from internal expert interviews, historical tickets, FAQs, partial technical sheets or existing documents. Implementation can structure that information into a useful, maintainable knowledge base.",
        noTroubleshootings: "If troubleshooting procedures are not documented, Talkey can help build them. The usual starting point is the most frequent or expensive issues, then defining questions, safety criteria and when to hand off to a person.",
        noManualsOrTroubleshootings: "If you do not have organized manuals or troubleshooting procedures, that is not an automatic blocker. Talkey can start from internal expert interviews, historical tickets, FAQs, partial technical sheets or existing documents. During implementation, that knowledge is structured and troubleshooting flows are built for the most frequent or expensive cases.",
        peopleDependency: "When support depends on specific people, the operation becomes fragile. If that person is not available, response quality changes. Talkey helps capture that knowledge and turn it into shared criteria so the team responds more consistently.",
        supportMetrics: "Talkey can help improve customer satisfaction by reducing contradictory answers, guiding diagnostics step by step, and handing off complex cases with more context. It does not replace every human interaction, but it helps make support clearer, more consistent, and more timely. To measure that impact, the key metrics are usually the percentage of cases resolved on first contact, average handling time, total time to resolution, human handoff percentage, cost per supported case and customer satisfaction. Customer satisfaction measures how satisfied a person is after receiving support. If you want to review how this would apply to your operation, you can request an evaluation.",
        humanRole: "Not necessarily, but it is possible if that is your operating decision. Talkey can absorb repetitive questions and shallow-knowledge cases; still, it is wise to keep people with deep technical knowledge for complex cases, validation, exceptions and sensitive decisions.",
        directChatGpt: "ChatGPT can answer general questions. Talkey is built to operate technical support with your company's approved knowledge, procedures, history when available, handoff criteria and customer or product context. The difference is not only conversation: it is answering with your post-sale operating standard.",
        expensive: "Talkey is not positioned as a cheap tool. It is a premium technical support solution: it is usually estimated close to the current operating cost, with a reference range around 10% to 15% below an equivalent human operation, because it aims to improve consistency, availability and resolution capacity.",
        guarantee75: "A high reduction in cases handled by humans may be possible, but it should not be promised without an evaluation. It depends on documentation, case types, channels, products, volume, implementation quality and handoff criteria.",
        wrongAnswers: "Talkey, like any system, can be wrong if it is poorly configured or if the knowledge base is incomplete. Properly implemented, it should make fewer mistakes than an informal human operation because it answers from approved knowledge, keeps criteria consistent, preserves traceability and hands off when confidence is low or risk appears.",
        dataTraining: "No. One company's information should not be used to train responses for other customers. Talkey is designed with customer-level separation, approved knowledge and technical/contractual review to protect manuals, procedures and sensitive data.",
        customerMemory: "Yes, when it is integrated with the customer's available history. That way support does not start from zero: Talkey can consider previous issues, associated products, data already collected and past handoffs to continue with more context.",
        productPhotoRecognition: "Yes, as a configurable capability depending on implementation. The customer can send a phone photo of the label, QR code or serial number; Talkey identifies the product or model and speeds up diagnosis from the first message.",
        whatsapp: "Yes, it can work with WhatsApp, but it must be evaluated and configured according to the flow, volume, required data, handoff rules and the company's current channels.",
        voiceVersion: "Yes. Talkey can have a voice version: an experience similar to speaking with a senior support agent, patient, consistent and grounded in approved company knowledge.",
        industryFit: "Talkey can be implemented when support depends on products or services with documentation, procedures, FAQs, case history or technical criteria. It is not limited to one industry: it applies wherever solving well requires structured knowledge.",
        negativeChallenge: "What makes you think that? If your concern is pricing, accuracy, implementation or how Talkey differs from a common chatbot, I can answer directly from Talkey's approach.",
        absurd: "No, Talkey is not designed for that. It is designed for technical support for products and services: understanding symptoms, using documentation, guiding diagnosis and handing off with context when needed.",
        unsafeTechnical: "I cannot guide dangerous actions or actions that bypass safety measures. In a real case, Talkey should stop self-service, collect the relevant data and hand off to an authorized technician or channel.",
        truthfulSupport: "No. Talkey should not invent, hide information or close tickets deceptively. The goal is accuracy, traceability and human handoff when there is not enough certainty.",
        competitorComparison: "The right comparison is by problem layer. Tools like Zendesk, Intercom or Freshdesk organize conversations and tickets; ElevenLabs is strong in voice; ChatGPT answers general questions. Talkey focuses on resolving technical support with structured knowledge, procedures, history when available and handoff with context.",
        fallback: "I can explain what problem Talkey solves, compare it with Zendesk, Intercom or ElevenLabs, discuss implementation, integration, security, metrics or show a simulated technical support case.",
      },
    },
    metrics: [
      { value: "24/7", label: "availability evaluated by channel" },
      { value: "1", label: "shared criterion for repeated cases" },
      { value: "N", label: "products and models with structured knowledge" },
      { value: "Human", label: "handoff when needed" },
    ],
    always: {
      kicker: "An experience that protects your brand",
      first: "ALWAYS",
      firstValue: "KIND",
      second: "ALWAYS",
      secondValue: "SOLVES",
      body: "Your tone of voice, your approved information and your criteria for knowing when a person should step in.",
    },
    capabilities: {
      kicker: "Built for real technical support",
      title: "Far more than automated answers.",
      body: "Talkey understands the product, follows procedures and provides full context whenever your team needs to take over.",
      items: [
        { title: "Controlled knowledge", text: "Answers from manuals, troubleshooting and policies approved by your company." },
        { title: "Guided diagnosis", text: "Asks one question at a time and adapts the next step to every answer." },
        { title: "Smart handoff", text: "Detects risk, frustration or uncertainty and hands off with complete context." },
        { title: "Simple integration", text: "Works on your website, product QR, portal, CRM or booking calendar through an API." },
      ],
    },
    how: {
      kicker: "How it works",
      title: "From manual to solution, without losing control.",
      steps: [
        { number: "01", title: "Load your knowledge", text: "Manuals, protocols, frequently asked questions and safety rules." },
        { number: "02", title: "Talkey identifies intent", text: "Recognizes the product, symptom, urgency and context before answering." },
        { number: "03", title: "Resolve or hand off", text: "Guides the customer and gives your team a documented case when needed." },
      ],
    },
    impact: {
      kicker: "Measurable impact",
      title: "Improve support consistency and reduce repetitive load on your team",
      body: "Less time searching for information. Fewer different criteria for the same issue. More cases with context before reaching a specialist.",
      cta: "Talk about your operation",
      notes: ["Faster first response", "Consistent resolutions", "Conversation-level traceability"],
    },
    pricing: {
      kicker: "Pricing simulator",
      title: "How much could your technical support cost using only Talkey?",
      body: "Talkey is not priced like generic software. Pricing depends on operation size, support volume, channels, products and the work required to turn technical knowledge into reliable support.",
      sections: {
        operation: "1. Current operation",
        scope: "2. Support needs",
        readiness: "3. Technical preparation",
        channels: "4. Channels Talkey will handle",
      },
      fields: {
        agents: "Number of human agents",
        monthlyTickets: "Monthly inquiries/tickets",
        products: "Number of products (specific models)",
        variantsPerProduct: "Average number of versions/variants per product",
        documents: "Number of existing documents",
        cleanDocs: "Is document cleaning required?",
        troubleshootingStatus: "Troubleshooting status",
        protocolStatus: "Protocol status",
        interviewExperts: "Should Talkey interview internal experts to build the knowledge base?",
        channels: "Channels included in Talkey",
      },
      help: {
        agents: "People currently handling technical or phone support.",
        monthlyTickets: "Estimated monthly volume of calls, messages or support requests.",
        products: "Count each specific model as an independent product. For example, if you have three different heater models, enter 3. An approximate number is enough to get a pricing estimate for Talkey.",
        variantsPerProduct: "Example: yearly versions, power variants, sizes or configurations.",
        readinessIntro: "These activities help Talkey work correctly and improve the overall quality of technical support.",
        documents: "Count each source file as an independent document: PDF, Word, Excel, technical sheet, manual, presentation, etc.",
        channelsIntro: "Select the channels you want Talkey to handle. These are not your current channels, but the channels included in the Talkey solution.",
      },
      options: {
        monthlyTickets: ["Up to 500", "501 to 1,500", "1,501 to 3,000", "3,001 to 7,000", "More than 7,000", "I don't know"],
        cleanDocs: ["No", "Yes"],
        troubleshootingStatus: ["They exist and are structured", "They exist partially", "They do not exist"],
        protocolStatus: ["They exist", "They exist partially", "They do not exist"],
        interviewExperts: ["No", "Yes"],
        channels: ["Web", "WhatsApp", "Email", "Phone voice"],
      },
      results: {
        monthlyRange: "Estimated monthly Talkey price",
        rangePrefix: "Between",
        rangeConnector: "and",
        estimateBadge: "CLP · monthly reference estimate",
        implementationRange: "Estimated fixed implementation cost",
        demoButton: "Request a demo",
        legal: "These values are estimates and must be validated through a commercial and technical evaluation.",
        monthlySuffix: "/ month",
        implementationSuffix: "Paid only once",
        notes: [
          "Selected channels can modify the estimated monthly cost.",
          "Implementation depends on products, documents, protocols and technical preparation.",
        ],
      },
      warnings: {
        title: "Simulator notes",
        noChannels: "Select at least one channel that Talkey will handle.",
        manyProducts: "High number of models: a specific technical evaluation is recommended.",
        manyDocuments: "High document volume: preparing the knowledge base may require additional review.",
        missingTroubleshooting: "Troubleshooting procedures are incomplete: Talkey can help create or complete the missing troubleshootings as part of implementation.",
        missingProtocols: "Protocols are incomplete: Talkey can help generate or structure the missing protocols as part of implementation.",
        phoneSelected: "Phone voice requires additional latency, fallback and conversational quality testing.",
        lowCurrentCost: "The estimated current cost is low for a complete B2B solution. Final pricing should be commercially validated.",
      },
    },
    security: {
      kicker: "Trust by design",
      title: "Consistent answers. Your company stays in control.",
      body: "Talkey separates knowledge by company and product, exposes the sources used and stops self-service when it detects critical risk.",
      items: [
        { title: "Visible sources", text: "Every instruction can preserve its manual and original reference." },
        { title: "Role permissions", text: "Customers, human agents, supervisors and administrators see what they should." },
        { title: "Deterministic rules", text: "Emergencies never depend on a model producing a creative response." },
      ],
    },
    scheduler: {
      kicker: "Request evaluation",
      title: "Let us review whether Talkey fits your technical support operation",
      body: "Tell us how your support works, what products and services you handle, what documentation exists and which channels you need to cover. In 30 minutes, we will review whether Talkey can help and what implementation would require.",
      duration: "30 minutes",
      channel: "Booking page",
      name: "Your name",
      company: "Company",
      email: "Work email",
      date: "Date",
      time: "Time",
      submit: "See available times",
      note: "Choose an available time on Talkey's booking page. You will receive the confirmation and meeting details.",
      success: "Booking confirmed.",
      subject: "Talkey evaluation",
      details: "A 30-minute meeting to review the technical support operation and evaluate whether Talkey fits the company.",
    },
    footer: { line: "Technical solutions that build loyalty.", product: "Try support", admin: "Manage knowledge", support: "Email Talkey" },
  },
  it: {
    languageName: "Italiano",
    nav: { product: "Prodotto", how: "Come funziona", impact: "Impatto", pricing: "Simulatore prezzi", security: "Sicurezza", quote: "Prenota una consulenza", menu: "Apri menu" },
    hero: {
      eyebrow: "Supporto tecnico coerente · Disponibile 24/7",
      lead: "Supporto tecnico coerente",
      emphasis: "CON CONOSCENZA STRUTTURATA",
      tail: "per operazioni postvendita",
      body: "Talkey trasforma manuali, procedure e competenze tecniche in risposte chiare, verificabili e sempre disponibili.",
      primary: "Richiedi valutazione",
      secondary: "Prova demo",
      proof: ["Senza sostituire il team", "Passaggio umano", "Risposte verificabili"],
    },
    chat: {
      live: "Demo dal vivo · Provala ora",
      open: "Apri la dimostrazione dal vivo",
      minimize: "Riduci la dimostrazione",
      welcome: "Ciao, sono Talkey. Posso spiegarti quale problema risolve Talkey, come si differenzia da altri strumenti, come si implementa o mostrarti un caso simulato di supporto tecnico. Cosa vuoi sapere?",
      prompts: [],
      placeholder: "Chiedimi di Talkey",
      send: "Invia messaggio",
      typing: "Talkey sta preparando una risposta",
      danger: "Supporto tecnico Talkey",
      actions: {
        pricingSimulator: "Vai al simulatore prezzi",
        tryAnotherCase: "Prova un altro caso",
        bookReview: "Prenota una revisione Talkey",
        bookDemo: "Prenota una demo",
      },
      responses: {
        pricing: "Il prezzo dipende dalle dimensioni dell'operazione, prodotti, documenti, canali e preparazione tecnica. Per non inventare un numero, usa il simulatore prezzi per una stima referenziale in CLP.",
        implementation: "L'implementazione di solito avanza in cinque passaggi: comprensione dell'operazione di supporto attuale, revisione di manuali e FAQ, strutturazione di protocolli e troubleshooting, configurazione di canali e regole di passaggio a una persona, e test con casi reali prima del lancio. Se mancano documenti o procedure, Talkey può aiutare a crearli. Cosa vuoi sapere in dettaglio sull'implementazione?",
        implementationFollowUp: "Le fasi tipiche sono: 1. comprendere l'operazione di supporto; 2. revisionare manuali, FAQ e documenti tecnici; 3. costruire o adattare protocolli e troubleshooting; 4. configurare canali, regole di sicurezza e passaggio a una persona; 5. testare casi reali prima del lancio. Quali altre cose vuoi sapere sull'implementazione?",
        integration: "Puoi inserire Talkey nel sito web, nel portale clienti, nei QR di prodotto o in canali come WhatsApp ed email. Può anche integrarsi con il CRM, calendario di prenotazione o sistema interno che l'azienda usa già. Per le visite tecniche, Google Calendar è il primo connettore previsto, e lo stesso flusso può adattarsi ad altri sistemi di prenotazione. Può inoltre rilevare il modello del prodotto quando l'utente scatta una foto con il cellulare di un QR, numero di serie o etichetta, accelerando il supporto dal primo messaggio.",
        security: "Talkey risponde usando conoscenza approvata dall'azienda, mantiene tracciabilità e passa a un umano quando rileva rischio, bassa certezza o frustrazione.",
        technical: "Dato che questo è un demo, possiamo usare un caso simulato per mostrare come Talkey diagnosticherebbe un problema di supporto tecnico. Scegli un problema simulato per provarlo.",
        troubleshootingPicker: "Scegli uno di questi problemi simulati per vedere come Talkey organizzerebbe la diagnosi, proporrebbe una soluzione o passerebbe il caso a una persona quando serve.",
        problemSolved: "Talkey risolve un problema operativo concreto: la conoscenza tecnica spesso è dispersa tra manuali, PDF, schede, criteri dei tecnici ed esperienza di persone specifiche. Talkey trasforma quella conoscenza in risposte coerenti, diagnosi guidate e criteri chiari di passaggio a una persona nei canali di supporto.",
        ticketComparison: "Un software ticket organizza conversazioni, priorità e stati. Talkey si concentra sulla risoluzione del problema tecnico: comprende documentazione, guida la diagnosi, raccomanda passi successivi e fornisce contesto quando serve una persona. Può convivere con un software ticket.",
        elevenLabsComparison: "ElevenLabs è molto forte su voce e agenti conversazionali. Anche Talkey può avere una versione vocale, ma la differenza centrale non è parlare: è rispondere usando la conoscenza tecnica dell'azienda. L'esperienza è più simile a parlare con un agente senior di supporto: paziente, coerente e guidato da manuali, procedure, troubleshooting, storico operativo quando disponibile e criteri di passaggio a una persona. Questo permette risposte più coerenti e più capacità reale di risolvere casi o passarli all'esperto umano giusto con buon contesto.",
        zendeskComparison: "Zendesk è eccellente per gestire ticket, conversazioni e flussi di supporto. Talkey copre un altro livello: aiutare a risolvere problemi tecnici usando conoscenza strutturata, procedure, troubleshooting e criteri di passaggio a una persona.",
        intercomComparison: "Intercom è eccellente per comunicazione clienti, messaggistica e automazione generale. Talkey è pensato per supporto tecnico specializzato: prodotti, manuali, sintomi, diagnosi, procedure e passaggio con contesto tecnico.",
        supportLeader: "Per un responsabile supporto tecnico, Talkey riduce variabilità: risposte più coerenti, meno dipendenza dalla memoria individuale, migliore diagnosi remota, più visibilità su quali casi vengono passati a specialisti e perché, e metriche più chiare su risoluzione, tempi e costo per caso.",
        noManuals: "Se i manuali non sono ordinati, non è un blocco automatico. Talkey può partire da interviste a esperti interni, ticket storici, FAQ, schede parziali o documenti esistenti. L'implementazione può strutturare queste informazioni in una base di conoscenza utile e mantenibile.",
        noTroubleshootings: "Se i troubleshooting non sono documentati, Talkey può aiutare a costruirli. Di solito si parte dai problemi più frequenti o costosi, poi si definiscono domande, criteri di sicurezza e quando passare il caso a una persona.",
        noManualsOrTroubleshootings: "Se non hai manuali ordinati o troubleshooting, non è un blocco automatico. Talkey può partire da interviste a esperti interni, ticket storici, FAQ, schede parziali o documenti esistenti. Durante l'implementazione questa conoscenza viene strutturata e si costruiscono troubleshooting per i casi più frequenti o costosi.",
        peopleDependency: "Quando il supporto dipende da persone specifiche, l'operazione diventa fragile. Se quella persona non è disponibile, cambia la qualità della risposta. Talkey aiuta a catturare quella conoscenza e trasformarla in criteri condivisi.",
        supportMetrics: "Talkey può aiutare a migliorare la soddisfazione dei clienti riducendo risposte contraddittorie, guidando la diagnosi passo dopo passo e passando i casi complessi con più contesto. Non sostituisce ogni interazione umana, ma aiuta a rendere il supporto più chiaro, coerente e tempestivo. Per misurarlo, le metriche principali sono spesso percentuale di casi risolti al primo contatto, tempo medio di gestione, tempo totale fino alla soluzione, percentuale di passaggi a persone, costo per caso gestito e soddisfazione dei clienti. La soddisfazione dei clienti misura quanto una persona resta soddisfatta dopo aver ricevuto supporto. Se vuoi valutare come si applicherebbe alla tua operazione, puoi richiedere una valutazione.",
        humanRole: "Non necessariamente, ma è possibile se questa è la decisione operativa. Talkey può assorbire domande ripetitive e casi di conoscenza superficiale; conviene comunque mantenere persone con conoscenza tecnica profonda per casi complessi, validazione, eccezioni e decisioni sensibili.",
        directChatGpt: "ChatGPT può rispondere a domande generali. Talkey è pensato per operare supporto tecnico con conoscenza approvata dall'azienda, procedure, storico quando disponibile, criteri di passaggio a una persona e contesto per cliente o prodotto. La differenza non è solo conversare: è rispondere con lo standard operativo della post-vendita.",
        expensive: "Talkey non si posiziona come uno strumento economico. È una soluzione premium per supporto tecnico: di solito viene stimato vicino al costo operativo attuale, con un riferimento tra il 10% e il 15% sotto un'operazione umana equivalente, perché punta a migliorare coerenza, disponibilità e capacità di risoluzione.",
        guarantee75: "Una riduzione alta dei casi gestiti da persone può essere possibile, ma non va promessa senza valutazione. Dipende da documentazione, tipo di casi, canali, prodotti, volume, qualità dell'implementazione e criteri di passaggio a una persona.",
        wrongAnswers: "Talkey, come qualsiasi sistema, può sbagliare se è configurato male o se la base di conoscenza è incompleta. Implementato correttamente, dovrebbe sbagliare meno di un'operazione umana informale perché risponde da conoscenza approvata, mantiene criteri coerenti, lascia tracciabilità e passa il caso a una persona quando c'è bassa certezza o rischio.",
        dataTraining: "No. Le informazioni di un'azienda non devono essere usate per addestrare risposte di altri clienti. Talkey è progettato con separazione per cliente, conoscenza approvata e revisione tecnica/contrattuale per proteggere manuali, procedure e dati sensibili.",
        customerMemory: "Sì, quando è integrato con lo storico disponibile del cliente. Così il supporto non riparte da zero: Talkey può considerare problemi precedenti, prodotto associato, dati già raccolti e passaggi precedenti per continuare con più contesto.",
        productPhotoRecognition: "Sì, come capacità configurabile secondo l'implementazione. Il cliente può inviare una foto scattata con il cellulare dell'etichetta, QR o numero di serie; Talkey identifica prodotto o modello e accelera la diagnosi dal primo messaggio.",
        whatsapp: "Sì, può funzionare con WhatsApp, ma va valutato e configurato secondo flusso, volume, dati necessari, regole di passaggio e canali attuali dell'azienda.",
        voiceVersion: "Sì. Talkey può avere una versione vocale: un'esperienza simile a parlare con un agente senior di supporto, paziente, coerente e basato sulla conoscenza approvata dall'azienda.",
        industryFit: "Talkey può essere implementato quando il supporto dipende da prodotti o servizi con documentazione, procedure, FAQ, storico casi o criteri tecnici. Non è limitato a una sola industria: si applica dove risolvere bene richiede conoscenza strutturata.",
        negativeChallenge: "Cosa ti fa pensare questo? Se il dubbio riguarda prezzo, precisione, implementazione o differenza con un chatbot comune, posso rispondere direttamente con l'approccio di Talkey.",
        absurd: "No, Talkey non è progettato per questo. È progettato per supporto tecnico di prodotti e servizi: capire sintomi, usare documentazione, guidare diagnosi e passare il caso con contesto quando serve.",
        unsafeTechnical: "Non posso guidare azioni pericolose o che aggirano misure di sicurezza. In un caso reale, Talkey dovrebbe interrompere il self-service, raccogliere i dati rilevanti e passare il caso a un tecnico o canale autorizzato.",
        truthfulSupport: "No. Talkey non deve inventare, nascondere informazioni o chiudere ticket in modo ingannevole. L'obiettivo è precisione, tracciabilità e passaggio a una persona quando non c'è abbastanza certezza.",
        competitorComparison: "Il confronto corretto è per livello di problema. Strumenti come Zendesk, Intercom o Freshdesk ordinano conversazioni e ticket; ElevenLabs è forte sulla voce; ChatGPT risponde a domande generali. Talkey si concentra sulla risoluzione del supporto tecnico con conoscenza strutturata, procedure, storico quando disponibile e passaggio con contesto.",
        fallback: "Posso spiegarti quale problema risolve Talkey, confrontarlo con Zendesk, Intercom o ElevenLabs, parlare di implementazione, integrazione, sicurezza, metriche o mostrarti un caso simulato di supporto tecnico.",
      },
    },
    metrics: [
      { value: "24/7", label: "disponibilità valutabile per canale" },
      { value: "1", label: "criterio condiviso per casi ripetuti" },
      { value: "N", label: "prodotti e modelli con conoscenza strutturata" },
      { value: "Umano", label: "passaggio quando serve" },
    ],
    always: {
      kicker: "Un'esperienza che protegge il tuo marchio",
      first: "SEMPRE",
      firstValue: "GENTILE",
      second: "SEMPRE",
      secondValue: "RISOLVE",
      body: "Il tono che hai definito, le informazioni che hai approvato e i criteri per sapere quando deve intervenire una persona.",
    },
    capabilities: {
      kicker: "Progettato per il vero supporto tecnico",
      title: "Molto più di risposte automatiche.",
      body: "Talkey comprende il prodotto, segue le procedure e fornisce tutto il contesto quando il team deve intervenire.",
      items: [
        { title: "Conoscenza controllata", text: "Risponde usando manuali, troubleshooting e politiche approvati dall'azienda." },
        { title: "Diagnosi guidata", text: "Fa una domanda alla volta e adatta ogni passaggio alla risposta ricevuta." },
        { title: "Passaggio intelligente", text: "Rileva rischio, frustrazione o incertezza e passa il caso con tutto il contesto." },
        { title: "Integrazione semplice", text: "Si integra nel sito, nel QR del prodotto, nel portale, nel CRM o nel calendario di prenotazione tramite API." },
      ],
    },
    how: {
      kicker: "Come funziona",
      title: "Dal manuale alla soluzione, senza perdere il controllo.",
      steps: [
        { number: "01", title: "Carica la conoscenza", text: "Manuali, protocolli, domande frequenti e regole di sicurezza." },
        { number: "02", title: "Talkey identifica l'intento", text: "Riconosce prodotto, sintomo, urgenza e contesto prima di rispondere." },
        { number: "03", title: "Risolve o inoltra", text: "Guida il cliente e consegna al team un caso documentato quando serve." },
      ],
    },
    impact: {
      kicker: "Impatto misurabile",
      title: "Migliora la coerenza del supporto e riduci il carico ripetitivo del team",
      body: "Meno tempo perso cercando informazioni. Meno criteri diversi per lo stesso problema. Più casi con contesto prima di arrivare a uno specialista.",
      cta: "Parliamo della tua operatività",
      notes: ["Prima risposta più rapida", "Soluzioni coerenti", "Tracciabilità per conversazione"],
    },
    pricing: {
      kicker: "Simulatore prezzi",
      title: "Quanto potrebbe costare il tuo supporto tecnico usando solo Talkey?",
      body: "Talkey non si calcola come un software generico. Il prezzo dipende da dimensione dell'operazione, volume di supporto, canali, prodotti e lavoro necessario per trasformare conoscenza tecnica in supporto affidabile.",
      sections: {
        operation: "1. Operazione attuale",
        scope: "2. Esigenze di supporto",
        readiness: "3. Preparazione tecnica",
        channels: "4. Canali gestiti da Talkey",
      },
      fields: {
        agents: "Numero di operatori umani",
        monthlyTickets: "Richieste/ticket mensili",
        products: "Numero di prodotti (modelli specifici)",
        variantsPerProduct: "Numero medio di versioni/varianti per prodotto",
        documents: "Numero di documenti esistenti",
        cleanDocs: "Serve pulire i documenti?",
        troubleshootingStatus: "Stato dei troubleshooting",
        protocolStatus: "Stato dei protocolli",
        interviewExperts: "Talkey deve intervistare esperti interni per costruire la base di conoscenza?",
        channels: "Canali inclusi in Talkey",
      },
      help: {
        agents: "Persone che oggi gestiscono supporto tecnico o telefonico.",
        monthlyTickets: "Stima del volume mensile di chiamate, messaggi o richieste di supporto.",
        products: "Conta ogni modello specifico come prodotto indipendente. Per esempio, se hai tre modelli diversi di caldaie, inserisci 3. Può essere un numero approssimativo per avere un'idea del prezzo di Talkey.",
        variantsPerProduct: "Esempio: versioni per anno, varianti di potenza, dimensioni o configurazioni.",
        readinessIntro: "Queste attività aiutano Talkey a funzionare correttamente e migliorano la qualità complessiva del supporto tecnico.",
        documents: "Conta ogni file sorgente come documento indipendente: PDF, Word, Excel, scheda tecnica, manuale, presentazione, ecc.",
        channelsIntro: "Seleziona i canali che vuoi far gestire a Talkey. Non sono i tuoi canali attuali, ma i canali inclusi nella soluzione Talkey.",
      },
      options: {
        monthlyTickets: ["Fino a 500", "501 a 1.500", "1.501 a 3.000", "3.001 a 7.000", "Più di 7.000", "Non lo so"],
        cleanDocs: ["No", "Sì"],
        troubleshootingStatus: ["Esistono e sono strutturati", "Esistono parzialmente", "Non esistono"],
        protocolStatus: ["Esistono", "Esistono parzialmente", "Non esistono"],
        interviewExperts: ["No", "Sì"],
        channels: ["Web", "WhatsApp", "Email", "Voce telefonica"],
      },
      results: {
        monthlyRange: "Prezzo mensile stimato di Talkey",
        rangePrefix: "Tra",
        rangeConnector: "e",
        estimateBadge: "CLP · stima mensile indicativa",
        implementationRange: "Costo fisso stimato di implementazione",
        demoButton: "Richiedi una demo",
        legal: "Questi valori sono stime e devono essere validati tramite una valutazione commerciale e tecnica.",
        monthlySuffix: "/ mese",
        implementationSuffix: "Si paga una sola volta",
        notes: [
          "I canali selezionati possono modificare il costo mensile stimato.",
          "L'implementazione dipende da prodotti, documenti, protocolli e preparazione tecnica.",
        ],
      },
      warnings: {
        title: "Note del simulatore",
        noChannels: "Seleziona almeno un canale che Talkey gestirà.",
        manyProducts: "Numero elevato di modelli: si consiglia una valutazione tecnica specifica.",
        manyDocuments: "Alto volume documentale: la preparazione della base di conoscenza può richiedere revisione aggiuntiva.",
        missingTroubleshooting: "I troubleshooting non sono completi: Talkey può aiutare a creare o completare quelli mancanti come parte dell'implementazione.",
        missingProtocols: "I protocolli non sono completi: Talkey può aiutare a generare o strutturare quelli mancanti come parte dell'implementazione.",
        phoneSelected: "La voce telefonica richiede test aggiuntivi di latenza, fallback e qualità conversazionale.",
        lowCurrentCost: "Il costo attuale stimato è basso per una soluzione B2B completa. Il prezzo finale deve essere validato commercialmente.",
      },
    },
    security: {
      kicker: "Fiducia fin dalla progettazione",
      title: "Risposte coerenti. La tua azienda mantiene il controllo.",
      body: "Talkey separa la conoscenza per azienda e prodotto, mostra le fonti usate e interrompe il self-service in caso di rischio critico.",
      items: [
        { title: "Fonti visibili", text: "Ogni indicazione può conservare il manuale e il riferimento originale." },
        { title: "Permessi per ruolo", text: "Clienti, operatori umani, supervisori e amministratori vedono ciò che compete loro." },
        { title: "Regole deterministiche", text: "Le emergenze non dipendono mai dalla creatività del modello." },
      ],
    },
    scheduler: {
      kicker: "Richiedi valutazione",
      title: "Verifichiamo se Talkey si adatta alla tua operazione di supporto tecnico",
      body: "Raccontaci come funziona il supporto, quali prodotti e servizi gestisci, quale documentazione esiste e quali canali vuoi coprire. In 30 minuti valuteremo se Talkey può aiutare e cosa servirebbe per implementarlo.",
      duration: "30 minuti",
      channel: "Pagina di prenotazione",
      name: "Il tuo nome",
      company: "Azienda",
      email: "Email di lavoro",
      date: "Data",
      time: "Ora",
      submit: "Vedi orari disponibili",
      note: "Scegli un orario disponibile nella pagina di prenotazione di Talkey. Riceverai conferma e dettagli della riunione.",
      success: "Prenotazione confermata.",
      subject: "Valutazione Talkey",
      details: "Riunione di 30 minuti per esaminare l'operazione di supporto tecnico e valutare se Talkey è adatto all'azienda.",
    },
    footer: { line: "Soluzioni tecniche che fidelizzano.", product: "Prova il supporto", admin: "Gestisci conoscenza", support: "Scrivi a Talkey" },
  },
};

const spanishCountries = new Set(["AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ", "GT", "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE"]);
const italianCountries = new Set(["IT", "SM", "VA"]);

export function detectMarketingLocale(country: string | null, acceptLanguage: string | null): MarketingLocale {
  const normalizedCountry = country?.trim().toUpperCase();
  if (normalizedCountry && italianCountries.has(normalizedCountry)) return "it";
  if (normalizedCountry && spanishCountries.has(normalizedCountry)) return "es";

  const languages = (acceptLanguage ?? "").toLowerCase();
  if (languages.startsWith("it") || languages.includes(",it")) return "it";
  if (languages.startsWith("es") || languages.includes(",es")) return "es";
  return "en";
}
