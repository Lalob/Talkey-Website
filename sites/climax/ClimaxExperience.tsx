"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, ArrowUp, Mail, MessageCircleMore, Minus } from "lucide-react";
import { ClimaxMenu } from "./ClimaxMenu";
import styles from "./ClimaxPage.module.css";
import { climaxProducts } from "./climaxProducts";
import { ClimaxRevealController } from "./ClimaxRevealController";

type Particle = {
  x: number;
  y: number;
  base: number;
  thermal: number;
  speed: number;
  phase: number;
  size: number;
};

type ClimaxStyle = CSSProperties & {
  "--scroll": string;
  "--temp-angle": string;
};

type SupportMessage = {
  id: string;
  sender: "assistant" | "visitor";
  text: string;
  danger?: boolean;
};

const supportPrompts = [
  "Tengo un problema con ACS",
  "La calefacción no calienta",
];

const systems = [
  {
    title: "ACS",
    body: "Agua caliente sanitaria como familia real confirmada para soporte, reposición y diagnóstico técnico.",
  },
  {
    title: "Calefacción",
    body: "Confort térmico y entrega de calor para viviendas, oficinas y proyectos de reposición.",
  },
  {
    title: "Diagnóstico",
    body: "La marca se apoya en datos concretos: etiqueta, síntoma, código de error y contexto de uso.",
  },
  {
    title: "Postventa",
    body: "Talkey organiza el caso para resolver primero y escalar solo cuando hay riesgo o falta información.",
  },
];

const applications = [
  ["Residencial", "Confort estable para ciclos diarios."],
  ["Retail", "Respuesta rápida ante puertas, flujo y carga variable."],
  ["Oficinas", "Zonas legibles para equipos que trabajan muchas horas."],
  ["Proyectos", "Argumentos técnicos para arquitectura e instalación."],
];

function normalizeSupportText(value: string) {
  return value
    .toLocaleLowerCase("es-CL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(normalizeSupportText(term)));
}

function findProductInText(value: string) {
  const normalized = normalizeSupportText(value);
  const familyMatchers = [
    {
      slug: "agua-caliente-sanitaria-acs",
      terms: ["acs", "agua caliente sanitaria", "agua caliente", "sanitaria", "ducha", "calentador", "termo"],
    },
    {
      slug: "calefaccion",
      terms: ["calefacción", "calefaccion", "radiador", "termostato", "piso radiante"],
    },
  ];
  const matched = familyMatchers.find((item) => item.terms.some((term) => normalized.includes(normalizeSupportText(term))));

  return matched ? climaxProducts.find((item) => item.slug === matched.slug) : undefined;
}

function findProductInHistory(history: SupportMessage[]) {
  return [...history]
    .reverse()
    .filter((message) => message.sender === "visitor")
    .map((message) => findProductInText(message.text))
    .find(Boolean);
}

function detectSupportIssue(message: string) {
  const normalized = normalizeSupportText(message);

  if (
    includesAny(normalized, [
      "no sale agua caliente",
      "sin agua caliente",
      "agua fria",
      "ducha fria",
      "no calienta",
      "no enciende",
      "no prende",
      "solo sale fria",
    ])
  ) {
    return "heat";
  }

  if (
    includesAny(normalized, [
      "intermitente",
      "fluctua",
      "fluctúa",
      "se corta",
      "se apaga",
      "temperatura inestable",
      "cambia la temperatura",
    ])
  ) {
    return "stability";
  }

  if (includesAny(normalized, ["caudal", "presion", "presión", "poca agua", "bajo flujo", "poco flujo"])) {
    return "flow";
  }

  if (includesAny(normalized, ["codigo", "código", "error", "alarma", "luz", "led", "parpadea"])) {
    return "error";
  }

  if (includesAny(normalized, ["termostato", "radiador", "circuito", "zona", "piso radiante"])) {
    return "heatingZone";
  }

  return null;
}

function buildIssueGuidance(issue: ReturnType<typeof detectSupportIssue>, productName: string) {
  if (issue === "heat") {
    return productName.includes("ACS")
      ? "Entiendo: el problema está en el agua caliente. Sin abrir ni manipular el equipo, revisa si ocurre en todos los puntos de agua o solo en uno, si el caudal sale normal y si aparece algún código o luz de error."
      : "Entiendo: el equipo no está entregando calor. Sin abrir el equipo, revisa si el termostato está pidiendo temperatura, si la zona afectada es una sola o toda la instalación y si aparece algún código o alerta.";
  }

  if (issue === "stability") {
    return "Entiendo: el síntoma es intermitente o inestable. Para acotarlo, dime si pasa siempre o solo en ciertos horarios, si cambia con el uso simultáneo de otros puntos y si el equipo muestra algún código.";
  }

  if (issue === "flow") {
    return "Entiendo: hay un problema de caudal o presión. Para separar instalación de equipo, dime si afecta a todos los puntos, si empezó de golpe o fue empeorando, y si hay filtros, llaves o válvulas intervenidas recientemente.";
  }

  if (issue === "error") {
    return "Perfecto: si hay código, alarma o luz de error, ese dato manda el diagnóstico. Escríbeme el código exacto, cuándo aparece y si el equipo vuelve a funcionar después de reiniciar sin forzarlo.";
  }

  if (issue === "heatingZone") {
    return "Entiendo: parece ligado a calefacción por zona, termostato o circuito. Dime qué zona falla, qué marca el termostato y si otros circuitos siguen funcionando.";
  }

  return "Entendido. Para no repetir preguntas, partamos por el síntoma principal: dime qué dejó de hacer el equipo, cuándo ocurre y si aparece algún código o señal visible.";
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const amount = clamp01((value - edge0) / (edge1 - edge0));
  return amount * amount * (3 - 2 * amount);
}

function mixChannel(from: number, to: number, amount: number) {
  return Math.round(from + (to - from) * amount);
}

function thermalColorFor(temperature: number, thermalSeed: number) {
  const temperatureMix = clamp01((temperature - 16) / 12);
  const cold: [number, number, number] = [125, 231, 255];
  const warm: [number, number, number] = [240, 173, 78];

  if (temperatureMix <= 0.001) return `rgb(${cold[0]}, ${cold[1]}, ${cold[2]})`;
  if (temperatureMix >= 0.999) return `rgb(${warm[0]}, ${warm[1]}, ${warm[2]})`;

  const transitionWidth = 0.08;
  const warmAmount = smoothstep(thermalSeed - transitionWidth, thermalSeed + transitionWidth, temperatureMix);

  return `rgb(${mixChannel(cold[0], warm[0], warmAmount)}, ${mixChannel(cold[1], warm[1], warmAmount)}, ${mixChannel(
    cold[2],
    warm[2],
    warmAmount,
  )})`;
}

function colorFor(particle: Particle, temperature: number) {
  return thermalColorFor(temperature, particle.thermal);
}

type ClimaxExperienceProps = {
  standalone?: boolean;
};

export function ClimaxExperience({ standalone = false }: ClimaxExperienceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantTyping, setAssistantTyping] = useState(false);
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text:
        "Hola, soy Talkey, el asistente de soporte para Climax y estoy aquí para ayudarte con tus productos de Agua Caliente Sanitaria (ACS) y Calefacción. ¿Qué problema presenta tu equipo?",
    },
  ]);
  const [scroll, setScroll] = useState(0);
  const [temperature, setTemperature] = useState(22);
  const [flow, setFlow] = useState(64);
  const [shell, setShell] = useState(76);
  const controlsRef = useRef({ temperature, flow, shell });
  const productsHref = standalone ? "/productos" : "/climax/productos";

  const comfort = useMemo(() => {
    const tempComfort = 100 - Math.abs(temperature - 21.5) * 9;
    return Math.min(99, Math.max(24, Math.round(tempComfort * 0.42 + flow * 0.23 + shell * 0.35)));
  }, [flow, shell, temperature]);

  useEffect(() => {
    controlsRef.current = { temperature, flow, shell };
  }, [flow, shell, temperature]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [supportMessages, assistantTyping, assistantOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let animationStartTime = 0;
    let animationTime = 0;
    let particles: Particle[] = [];
    const mouse = { x: 0.74, y: 0.36, active: false, energy: 0, lastMoveAt: -20 };
    const supportsPointer = "PointerEvent" in window;
    const lineSpeedMultiplier = 2.8;
    const horizontalFlowSpeed = 1.18 * lineSpeedMultiplier;

    const deterministicValue = (index: number, salt: number) => {
      let value = Math.imul(index + 1, 0x9e3779b1) ^ Math.imul(salt + 1, 0x85ebca6b);
      value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
      value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
      return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
    };

    const seedParticles = () => {
      const baseCount = Math.round(Math.min(170, Math.max(64, width / 9)));
      particles = Array.from({ length: baseCount }, (_, index) => ({
        x: deterministicValue(index, 1) * width,
        y: deterministicValue(index, 2) * height,
        base: deterministicValue(index, 3),
        thermal: deterministicValue(index, 4),
        speed: 0.28 + deterministicValue(index, 5) * 0.84,
        phase: deterministicValue(index, 6) * Math.PI * 2,
        size: 0.8 + deterministicValue(index, 7) * 2.6,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.lineCap = "round";
      animationStartTime = 0;
      animationTime = 0;
      seedParticles();
    };

    const drawAmbientBands = (flowTime: number) => {
      const controls = controlsRef.current;
      const shellStrength = clamp01((controls.shell - 20) / 80);
      const looseness = 1 - shellStrength;
      const bandCount = 5;
      for (let index = 0; index < bandCount; index += 1) {
        const y =
          ((index + 1) / (bandCount + 1)) * height +
          Math.sin(flowTime * (0.64 + looseness * 0.18) + index) * (18 + looseness * 42);
        const startX = (flowTime * (50 + looseness * 18) + index * width * 0.23) % (width + 260) - 130;
        const length = Math.max(250, width * (0.3 + shellStrength * 0.1));
        context.globalAlpha = 0.08 + shellStrength * 0.08;
        context.strokeStyle = thermalColorFor(controls.temperature, (index + 0.35) / bandCount);
        context.lineWidth = 1 + shellStrength * 0.8;
        context.beginPath();
        context.moveTo(startX, y);
        context.bezierCurveTo(
          startX + length * 0.28,
          y - (18 + looseness * 34),
          startX + length * 0.68,
          y + (22 + looseness * 38),
          startX + length,
          y + Math.sin(flowTime + index) * (10 + looseness * 26),
        );
        context.stroke();
      }
    };

    const renderParticles = (seconds: number, flowTime: number) => {
      const controls = controlsRef.current;
      const flowStrength = controls.flow / 100;
      const shellStrength = clamp01((controls.shell - 20) / 80);
      const looseness = 1 - shellStrength;
      const travelWidth = width + 96;
      const pointerAge = Math.max(0, seconds - mouse.lastMoveAt);
      const pointerEnergy = mouse.energy * Math.exp(-pointerAge * 2.25);
      const envelopeDrift = 7 + looseness * 46;
      const envelopeWave = 7 + looseness * 30;
      const lineStretch = 0.82 + shellStrength * 0.56;
      const particleAlpha = 0.38 + shellStrength * 0.3;
      const particleColorFor = (particle: Particle) => colorFor(particle, controls.temperature);

      particles.forEach((particle, index) => {
        const baseVelocity = (0.38 + flowStrength * 1.45) * particle.speed * horizontalFlowSpeed * 60;
        const baseX = ((particle.x + seconds * baseVelocity) % travelWidth) - 48;
        const turbulence = Math.sin(seconds * (1.08 + particle.speed * 0.86) + particle.phase * 1.7) * looseness * 26;
        const baseY =
          particle.y +
          Math.sin(seconds * 0.44 + particle.phase) * envelopeDrift +
          Math.cos(flowTime * 0.9 + particle.phase) * (5 + flowStrength * 7 + looseness * 15) +
          turbulence;
        const wave = Math.sin(flowTime * particle.speed + particle.phase + baseY * 0.006);
        const mouseDx = mouse.x * width - baseX;
        const mouseDy = mouse.y * height - baseY;
        const mouseDistance = Math.max(24, Math.hypot(mouseDx, mouseDy));
        const pointerInfluence = mouse.active ? Math.max(0, 1 - mouseDistance / 460) : 0;
        const pointerWake = pointerInfluence * (0.52 + pointerEnergy * 0.36);
        const wakeX = -mouseDy / mouseDistance;
        const wakeY = mouseDx / mouseDistance;
        const x =
          baseX +
          wave * envelopeWave +
          Math.sin(seconds * 1.7 + particle.phase) * looseness * 14 +
          wakeX * pointerWake * 18 +
          mouseDx * pointerWake * 0.011;
        const y = ((baseY + wakeY * pointerWake * 13 + mouseDy * pointerWake * 0.007 + 40) % (height + 80)) - 40;
        const length = (28 + flowStrength * 86 + particle.base * 42) * lineStretch;
        context.strokeStyle = particleColorFor(particle);
        context.lineWidth = particle.size * (0.82 + shellStrength * 0.58);
        context.globalAlpha = particleAlpha + particle.base * 0.04;
        context.beginPath();
        context.moveTo(x, y);
        context.bezierCurveTo(
          x - length * 0.28,
          y + wave * (8 + looseness * 18),
          x - length * 0.72,
          y - wave * (12 + looseness * 24),
          x - length,
          y + Math.sin(flowTime + index) * (8 + looseness * 24),
        );
        context.stroke();
      });
    };

    const draw = (time: number) => {
      if (!animationStartTime) animationStartTime = time;
      animationTime = (time - animationStartTime) * 0.001;
      const flowTime = animationTime * lineSpeedMultiplier;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      drawAmbientBands(flowTime);
      renderParticles(animationTime, flowTime);

      if (mouse.active || mouse.energy > 0.04) {
        const x = mouse.x * width;
        const y = mouse.y * height;
        const pointerAge = Math.max(0, animationTime - mouse.lastMoveAt);
        const pointerEnergy = mouse.energy * Math.exp(-pointerAge * 2.25);
        const radius = 102 + pointerEnergy * 32;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, "rgba(125, 231, 255, 0.24)");
        gradient.addColorStop(0.48, "rgba(217, 121, 56, 0.13)");
        gradient.addColorStop(1, "rgba(125, 231, 255, 0)");
        context.fillStyle = gradient;
        context.globalAlpha = 1;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "rgba(125, 231, 255, 0.26)";
        context.lineWidth = 1;
        context.beginPath();
        context.arc(x, y, 25 + Math.sin(animationTime * 5) * 4.5, 0, Math.PI * 2);
        context.stroke();
      }

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(draw);
    };

    const updatePointer = (clientX: number, clientY: number, boost = 0.12) => {
      mouse.x = clientX / Math.max(1, width);
      mouse.y = clientY / Math.max(1, height);
      mouse.active = true;
      mouse.energy = Math.min(1.45, 1 + boost);
      mouse.lastMoveAt = animationTime;
    };

    const onPointerMove = (event: PointerEvent) => updatePointer(event.clientX, event.clientY);
    const onMouseMove = (event: MouseEvent) => updatePointer(event.clientX, event.clientY);
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY, 0.18);
    };
    const onPointerLeave = () => {
      mouse.active = false;
    };
    const onVisibilityChange = () => {
      animationStartTime = 0;
      animationTime = 0;
      if (document.hidden) mouse.active = false;
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    if (supportsPointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      if (supportsPointer) {
        window.removeEventListener("pointermove", onPointerMove);
      } else {
        window.removeEventListener("mousemove", onMouseMove);
      }
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const rootStyle: ClimaxStyle = {
    "--scroll": scroll.toFixed(4),
    "--temp-angle": `${(temperature - 16) * 30 + 20}deg`,
  };

  function resolveSupportReply(message: string, history: SupportMessage[]): SupportMessage {
    const normalized = normalizeSupportText(message);

    if (/(gas|olor|humo|chispa|fuga|quemado|incendio|cortocircuito|electrico|seguridad|bypass|puentear)/i.test(normalized)) {
      return {
        id: crypto.randomUUID(),
        sender: "assistant",
        danger: true,
        text:
          "Eso requiere derivación segura. No puentees sensores, no abras el equipo y no manipules gas ni componentes eléctricos. Si hay olor a gas, humo, chispa, fuga o calentamiento anormal, detén el uso, ventila si corresponde y contacta a un técnico autorizado.",
      };
    }

    if (/(producto|productos|catalogo|cubre|kb|base|conocimiento|real|reales)/i.test(normalized)) {
      return {
        id: crypto.randomUUID(),
        sender: "assistant",
        text: `La base de conocimiento usa las familias reales confirmadas para Davaterm/Climax:\n\n${climaxProducts
          .map((product, index) => `${index + 1}. ${product.name}: ${product.summary}`)
          .join(
            "\n",
          )}\n\nNo tengo modelos públicos verificables de Climax, así que no invento códigos de producto. Si me das modelo, etiqueta, manual o código de error, puedo guiar el caso con más precisión.`,
      };
    }

    const matched = findProductInText(message) ?? findProductInHistory(history);
    const issue = detectSupportIssue(message);

    if (matched) {
      return {
        id: crypto.randomUUID(),
        sender: "assistant",
        text: `${matched.name}\n\n${buildIssueGuidance(issue, matched.name)}\n\nSi todavía no lo enviaste, agrega modelo o foto de etiqueta. Con eso intento acotar la causa probable antes de cualquier escalamiento.`,
      };
    }

    if (/(tecnico|técnico|derivar|humano|garantia|garantía|instalador|visita|urgente)/i.test(normalized)) {
      return {
        id: crypto.randomUUID(),
        sender: "assistant",
        text:
          "Antes de escalar el caso, intentemos resolverlo con diagnóstico guiado. Dime la familia del equipo (ACS o calefacción), modelo/etiqueta, síntoma, código de error, ciudad y fotos si existen. Si no queda resuelto o hay riesgo de seguridad, Talkey deja el caso preparado para postventa Davaterm/Climax.",
      };
    }

    return {
      id: crypto.randomUUID(),
      sender: "assistant",
      text: issue
        ? "Detecto un síntoma, pero me falta saber la familia del equipo. ¿Es Agua Caliente Sanitaria (ACS) o calefacción? Con eso sigo el diagnóstico sin hacerte repetir lo que ya contaste."
        : "Puedo ayudarte con soporte Climax en ACS o calefacción. Cuéntame el síntoma con el mayor detalle posible: qué equipo es, qué dejó de hacer, cuándo ocurre y si aparece código de error. Si buscas catálogo, puedo mostrarte las familias reales confirmadas.",
    };
  }

  function sendSupportMessage(message: string) {
    const content = message.trim();
    if (!content || assistantTyping) return;
    setSupportMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), sender: "visitor", text: content },
    ]);
    setAssistantInput("");
    setAssistantTyping(true);
    window.setTimeout(() => {
      setSupportMessages((current) => [...current, resolveSupportReply(content, current)]);
      setAssistantTyping(false);
    }, 520);
  }

  function submitSupport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendSupportMessage(assistantInput);
  }

  return (
    <div ref={rootRef} className={styles.climaxSite} style={rootStyle}>
      <ClimaxRevealController />
      <div className={styles.heroImageLayer} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.climateField} aria-hidden="true" />
      <div className={styles.scrollMeter} aria-hidden="true">
        <span />
      </div>
      <ClimaxMenu standalone={standalone} />

      <main id="inicio">
        <section className={styles.hero}>
          <div className={`${styles.heroCopy} ${styles.reveal}`} data-climax-reveal="left">
            <h1>
              <span>Climax</span>
              <em>clima al punto exacto.</em>
            </h1>
            <p className={styles.heroLede}>
              Sistemas térmicos para edificios, locales y hogares que necesitan frío, calor y control estable sin
              perder eficiencia ni presencia arquitectónica.
            </p>
          </div>

          <div
            className={`${styles.labPanel} ${styles.heroControlPanel} ${styles.reveal}`}
            aria-label="Ajustes de animación Climax"
            data-climax-reveal="up"
          >
            <div className={styles.dialWrap} aria-hidden="true">
              <div className={styles.climateDial}>
                <span className={styles.dialCore} />
                <span className={`${styles.dialRing} ${styles.ringCold}`} />
                <span className={`${styles.dialRing} ${styles.ringWarm}`} />
                <strong>{comfort}</strong>
              </div>
            </div>
            <form className={styles.controls} aria-label="Ajustes de animación Climax">
              <label>
                Temperatura
                <input
                  type="range"
                  min="16"
                  max="28"
                  value={temperature}
                  onChange={(event) => setTemperature(Number(event.currentTarget.value))}
                />
                <span>{temperature} °C</span>
              </label>
              <label>
                Flujo de aire
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={flow}
                  onChange={(event) => setFlow(Number(event.currentTarget.value))}
                />
                <span>{flow}%</span>
              </label>
              <label>
                Envolvente
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={shell}
                  onChange={(event) => setShell(Number(event.currentTarget.value))}
                />
                <span>{shell}%</span>
              </label>
            </form>
          </div>

          <div className={`${styles.heroActions} ${styles.reveal}`} aria-label="Acciones principales" data-climax-reveal="up">
            <a className={`${styles.button} ${styles.buttonSecondary}`} href="#sistemas">
              <span>Ver sistemas</span>
              <ArrowRight className={styles.buttonArrow} size={20} strokeWidth={1.9} aria-hidden="true" />
            </a>
            <a className={`${styles.button} ${styles.buttonSecondary}`} href="#productos">
              <span>Ver productos</span>
              <ArrowRight className={styles.buttonArrow} size={20} strokeWidth={1.9} aria-hidden="true" />
            </a>
          </div>

          <a className={styles.scrollCue} href="#direccion" aria-label="Ir a dirección de diseño">
            <span />
          </a>
        </section>

        <section className={`${styles.signalStrip} ${styles.reveal}`} aria-label="Señales de marca" data-climax-reveal="scale">
          {[
            ["Frío", "respuesta precisa"],
            ["Calor", "impulso eficiente"],
            ["Aire", "movimiento silencioso"],
            ["Control", "lectura continua"],
          ].map(([title, body]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{body}</span>
            </div>
          ))}
        </section>

        <section className={styles.designDirection} id="direccion">
          <div className={`${styles.sectionKicker} ${styles.reveal}`} data-climax-reveal="left">
            Dirección propia de marca
          </div>
          <div className={`${styles.sectionHeading} ${styles.reveal}`} data-climax-reveal="up">
            <h2>Una identidad construida como un campo térmico</h2>
            <p>
              Climax toma distancia del lenguaje pesado de maquinaria y se mueve hacia una estética de precisión:
              superficies oscuras, luz fría, cobre funcional y capas de aire visible.
            </p>
          </div>

          <div className={styles.directionGrid}>
            {[
              ["01", "Precisión polar", "Blancos técnicos, cian eléctrico y bordes finos para comunicar control."],
              ["02", "Pulso cobre", "El metal del intercambio térmico aparece como acento premium y funcional."],
              ["03", "Aire silencioso", "Líneas de flujo y micro movimientos para mostrar confort sin ruido."],
              ["04", "Grilla adaptable", "Una estructura modular para vivienda, retail, oficinas y proyectos."],
            ].map(([index, title, body], itemIndex) => (
              <article
                className={`${styles.directionTile} ${itemIndex === 1 ? styles.warm : ""} ${
                  itemIndex === 2 ? styles.flow : ""
                } ${itemIndex === 3 ? styles.grid : ""} ${styles.reveal}`}
                data-climax-reveal={itemIndex % 2 === 0 ? "up" : "scale"}
                key={title}
              >
                <span className={styles.tileIndex}>{index}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.systems} id="sistemas">
          <div className={`${styles.sectionHeading} ${styles.compact} ${styles.reveal}`} data-climax-reveal="left">
            <h2>Sistemas pensados para durar y con soporte inteligente</h2>
          </div>

          <div className={`${styles.systemStage} ${styles.reveal}`} data-climax-reveal="scale">
            <div className={styles.systemRail} aria-hidden="true">
              <span className={styles.railOne} />
              <span className={styles.railTwo} />
              <span className={styles.railThree} />
            </div>
            {systems.map((system, index) => (
              <article className={`${styles.systemItem} ${index === 0 ? styles.active : ""}`} key={system.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{system.title}</h3>
                <p>{system.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.products} id="productos">
          <div className={`${styles.sectionHeading} ${styles.reveal}`} data-climax-reveal="left">
            <h2>Productos Climax</h2>
          </div>
          <div className={styles.productGrid}>
            {climaxProducts.map((product) => (
              <Link
                className={`${styles.productCard} ${styles.reveal}`}
                data-climax-reveal="up"
                href={`${productsHref}#${product.slug}`}
                key={product.slug}
              >
                <h3>{product.name}</h3>
                <p>{product.summary}</p>
                <span className={styles.productCardCta}>Ver detalle</span>
              </Link>
            ))}
          </div>
          <div className={`${styles.productActions} ${styles.reveal}`} data-climax-reveal="up">
            <Link className={`${styles.button} ${styles.buttonSecondary}`} href={productsHref}>
              Ver productos
            </Link>
          </div>
        </section>

        <section className={styles.applications} id="aplicaciones">
          <div className={`${styles.sectionHeading} ${styles.reveal}`} data-climax-reveal="left">
            <h2>Un lenguaje para espacios con ritmos distintos</h2>
            <p>
              Climax se presenta como una marca de especificación clara: menos ruido comercial, más lectura técnica para
              decidir rápido.
            </p>
          </div>
          <div className={styles.applicationGrid}>
            {applications.map(([label, body]) => (
              <article className={styles.reveal} data-climax-reveal="up" key={label}>
                <span>{label}</span>
                <h3>{body}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className={`${styles.siteFooter} ${styles.reveal}`} data-climax-reveal="up" id="contacto">
        <div>
          <a className={`${styles.brandMark} ${styles.footerBrand}`} href="#inicio" aria-label="Climax inicio">
            <span className={styles.brandGlyph}>C</span>
            <span>CLIMAX</span>
          </a>
          <p>Marca del grupo Davaterm para soluciones de climatización y confort térmico.</p>
        </div>
        <a className={`${styles.button} ${styles.footerContact}`} href="mailto:contacto@davaterm.cl">
          <Mail size={17} />
          <span>contacto@davaterm.cl</span>
        </a>
      </footer>

      <aside className={`${styles.supportDock} ${assistantOpen ? styles.supportOpen : ""}`} aria-label="Soporte Técnico">
        {assistantOpen ? (
          <div className={styles.supportCard}>
            <div className={styles.supportTopline}>
              <span />
              Talkey Soporte
              <button type="button" onClick={() => setAssistantOpen(false)} aria-label="Minimizar asistente">
                <Minus size={18} />
              </button>
            </div>
            <div ref={chatRef} className={styles.supportConversation} aria-live="polite">
              {supportMessages.map((message) => (
                <div
                  className={`${styles.supportMessage} ${
                    message.sender === "visitor" ? styles.visitorMessage : styles.assistantMessage
                  } ${message.danger ? styles.dangerMessage : ""}`}
                  key={message.id}
                >
                  {message.danger && (
                    <span className={styles.dangerLabel}>
                      <AlertTriangle size={13} />
                      Derivar
                    </span>
                  )}
                  <p>{message.text}</p>
                </div>
              ))}
              {assistantTyping && (
                <div className={styles.supportTyping}>
                  <span />
                  <span />
                  <span />
                  <small>Talkey revisa el caso</small>
                </div>
              )}
            </div>
            <div className={styles.supportPrompts}>
              {supportPrompts.map((prompt) => (
                <button type="button" disabled={assistantTyping} onClick={() => sendSupportMessage(prompt)} key={prompt}>
                  {prompt}
                </button>
              ))}
            </div>
            <form className={styles.supportForm} onSubmit={submitSupport}>
              <input
                value={assistantInput}
                onChange={(event) => setAssistantInput(event.currentTarget.value)}
                placeholder="Describe el síntoma o modelo"
                aria-label="Describe el síntoma o modelo"
              />
              <button type="submit" disabled={!assistantInput.trim() || assistantTyping} aria-label="Enviar">
                <ArrowUp size={18} />
              </button>
            </form>
          </div>
        ) : (
          <button className={styles.supportLauncher} type="button" onClick={() => setAssistantOpen(true)}>
            <span>
              <MessageCircleMore size={22} />
            </span>
            <strong>Soporte Técnico</strong>
          </button>
        )}
      </aside>
    </div>
  );
}
