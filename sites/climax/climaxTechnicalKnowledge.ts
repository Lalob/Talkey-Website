export type ClimaxIssue = "heat" | "stability" | "flow" | "error" | "heatingZone" | null;

export type ClimaxTechnicalModel = {
  model: string;
  title: string;
  reference: string;
  sourceUrl: string;
  sourceType: string;
  aliases: string[];
  family: "ACS";
  combustion: "Atmosférico" | "Estanco";
  gas: "Butano" | "Gas Natural";
  chamber: "Abierta" | "Cerrada";
  capacityLiters: number;
  flowRate: string;
  power: string;
  waterPoints: number;
  efficiency: string;
  ignition: string;
  exhaustDiameter: string;
  pressureMin: string;
  pressureMax: string;
  modulating: boolean;
  placeOfUse: string;
  dimensions: string;
  weight: string;
  operation: string[];
};

export const climaxKnowledgeSources = [
  {
    label: "Ficha pública Leroy Merlin - CLIMAXAT06B",
    url: "https://www.leroymerlin.es/productos/calentador-de-gas-atmosferico-climax-gas-butano-6-l-94344420.html",
  },
  {
    label: "Ficha pública Leroy Merlin - CLIMAXAT06N",
    url: "https://www.leroymerlin.es/productos/calentador-de-gas-atmosferico-climax-gas-natural-6-l-94344419.html",
  },
  {
    label: "Ficha pública Leroy Merlin - CLIMAXAT10B",
    url: "https://www.leroymerlin.es/productos/calentador-de-gas-atmosferico-climax-gas-butano-10-l-94344416.html",
  },
  {
    label: "Ficha pública Leroy Merlin - CLIMAXAT10N",
    url: "https://www.leroymerlin.es/productos/calentador-de-gas-atmosferico-climax-gas-natural-10-l-94344418.html",
  },
  {
    label: "Ficha pública Leroy Merlin - CLIMAX311B",
    url: "https://www.leroymerlin.es/productos/calentador-de-gas-estanco-climax-gas-butano-11-l-94344417.html",
  },
  {
    label: "Ficha pública Leroy Merlin - CLIMAX311N",
    url: "https://www.leroymerlin.es/productos/calentador-de-gas-estanco-climax-gas-natural-11-l-94344415.html",
  },
];

const publicDataSource =
  "Ficha pública de producto; no se encontró manual PDF público indexado para este modelo en la búsqueda actual.";

export const climaxTechnicalModels: ClimaxTechnicalModel[] = [
  {
    model: "CLIMAXAT06B",
    title: "Calentador atmosférico Climax gas butano 6 L",
    reference: "94344420",
    sourceUrl: climaxKnowledgeSources[0].url,
    sourceType: publicDataSource,
    aliases: ["climax at06b", "at06b", "06b", "94344420", "6 litros butano", "6 l butano", "atmosferico butano 6"],
    family: "ACS",
    combustion: "Atmosférico",
    gas: "Butano",
    chamber: "Abierta",
    capacityLiters: 6,
    flowRate: "6 l/min",
    power: "10 kW",
    waterPoints: 2,
    efficiency: "78%",
    ignition: "Alimentación por pilas no suministradas, sin luz piloto",
    exhaustDiameter: "Conducto de chimenea de 100 mm",
    pressureMin: "0,3 bar",
    pressureMax: "10 bar",
    modulating: false,
    placeOfUse: "Exterior",
    dimensions: "28 x 55 x 19 cm",
    weight: "9,36 kg",
    operation: [
      "Regulación manual con mandos de potencia de llama y caudal de agua.",
      "Sensor de temperatura y encendido automático al abrir demanda de ACS.",
      "Cámara abierta: la ventilación y la evacuación deben respetar normativa.",
    ],
  },
  {
    model: "CLIMAXAT06N",
    title: "Calentador atmosférico Climax gas natural 6 L",
    reference: "94344419",
    sourceUrl: climaxKnowledgeSources[1].url,
    sourceType: publicDataSource,
    aliases: ["climax at06n", "at06n", "06n", "94344419", "6 litros natural", "6 l natural", "atmosferico natural 6"],
    family: "ACS",
    combustion: "Atmosférico",
    gas: "Gas Natural",
    chamber: "Abierta",
    capacityLiters: 6,
    flowRate: "6 l/min",
    power: "10 kW",
    waterPoints: 2,
    efficiency: "78%",
    ignition: "Alimentación por pilas no suministradas, sin luz piloto",
    exhaustDiameter: "Conducto de chimenea de 100 mm",
    pressureMin: "0,3 bar",
    pressureMax: "10 bar",
    modulating: false,
    placeOfUse: "Exterior",
    dimensions: "28 x 55 x 19 cm",
    weight: "9,37 kg",
    operation: [
      "Regulación manual con mandos de potencia de llama y caudal de agua.",
      "Sensor de temperatura y encendido automático al abrir demanda de ACS.",
      "Debe corresponder a instalación de gas natural; no usar con butano.",
    ],
  },
  {
    model: "CLIMAXAT10B",
    title: "Calentador atmosférico Climax gas butano 10 L",
    reference: "94344416",
    sourceUrl: climaxKnowledgeSources[2].url,
    sourceType: publicDataSource,
    aliases: ["climax at10b", "at10b", "10b", "94344416", "10 litros butano", "10 l butano", "atmosferico butano 10"],
    family: "ACS",
    combustion: "Atmosférico",
    gas: "Butano",
    chamber: "Abierta",
    capacityLiters: 10,
    flowRate: "10 l/min",
    power: "16,8 kW",
    waterPoints: 2,
    efficiency: "77%",
    ignition: "Alimentación por pilas no suministradas, sin luz piloto",
    exhaustDiameter: "Conducto de chimenea de 110 mm",
    pressureMin: "0,3 bar",
    pressureMax: "10 bar",
    modulating: false,
    placeOfUse: "Exterior",
    dimensions: "32 x 55 x 19 cm",
    weight: "11,25 kg",
    operation: [
      "Regulación manual con mandos de potencia de llama y caudal de agua.",
      "Sensor de temperatura; el caudal nominal declarado es 10 l/min.",
      "Cámara abierta para exterior y evacuación de 110 mm.",
    ],
  },
  {
    model: "CLIMAXAT10N",
    title: "Calentador atmosférico Climax gas natural 10 L",
    reference: "94344418",
    sourceUrl: climaxKnowledgeSources[3].url,
    sourceType: publicDataSource,
    aliases: ["climax at10n", "at10n", "10n", "94344418", "10 litros natural", "10 l natural", "atmosferico natural 10"],
    family: "ACS",
    combustion: "Atmosférico",
    gas: "Gas Natural",
    chamber: "Abierta",
    capacityLiters: 10,
    flowRate: "10 l/min",
    power: "16,8 kW",
    waterPoints: 2,
    efficiency: "77%",
    ignition: "Alimentación por pilas no suministradas, sin luz piloto",
    exhaustDiameter: "Conducto de chimenea de 110 mm",
    pressureMin: "0,3 bar",
    pressureMax: "10 bar",
    modulating: false,
    placeOfUse: "Exterior",
    dimensions: "32 x 55 x 19 cm",
    weight: "9,5 kg",
    operation: [
      "Regulación manual con mandos de potencia de llama y caudal de agua.",
      "Sensor de temperatura; el caudal nominal declarado es 10 l/min.",
      "Debe corresponder a instalación de gas natural; no usar con butano.",
    ],
  },
  {
    model: "CLIMAX311B",
    title: "Calentador estanco Climax gas butano 11 L",
    reference: "94344417",
    sourceUrl: climaxKnowledgeSources[4].url,
    sourceType: publicDataSource,
    aliases: ["climax 311b", "311b", "94344417", "11 litros butano", "11 l butano", "estanco butano 11"],
    family: "ACS",
    combustion: "Estanco",
    gas: "Butano",
    chamber: "Cerrada",
    capacityLiters: 11,
    flowRate: "11 l/min",
    power: "19,6 kW",
    waterPoints: 2,
    efficiency: "83%",
    ignition: "Encendido electrónico, sin luz piloto",
    exhaustDiameter: "Conducto de chimenea de 100 mm",
    pressureMin: "0,02 bar",
    pressureMax: "10 bar",
    modulating: true,
    placeOfUse: "Interior / exterior",
    dimensions: "35 x 58 x 16 cm",
    weight: "14,25 kg",
    operation: [
      "Cámara cerrada con potencia modulante para ajustar entrega térmica.",
      "Encendido electrónico y caudal nominal declarado de 11 l/min.",
      "Apto para interior/exterior según ficha, siempre con evacuación reglamentaria.",
    ],
  },
  {
    model: "CLIMAX311N",
    title: "Calentador estanco Climax gas natural 11 L",
    reference: "94344415",
    sourceUrl: climaxKnowledgeSources[5].url,
    sourceType: publicDataSource,
    aliases: ["climax 311n", "311n", "94344415", "11 litros natural", "11 l natural", "estanco natural 11"],
    family: "ACS",
    combustion: "Estanco",
    gas: "Gas Natural",
    chamber: "Cerrada",
    capacityLiters: 11,
    flowRate: "11 l/min",
    power: "19,6 kW",
    waterPoints: 2,
    efficiency: "83%",
    ignition: "Encendido electrónico, sin luz piloto",
    exhaustDiameter: "Conducto de chimenea de 100 mm",
    pressureMin: "0,02 bar",
    pressureMax: "10 bar",
    modulating: true,
    placeOfUse: "Interior / exterior",
    dimensions: "35 x 58 x 16 cm",
    weight: "14,25 kg",
    operation: [
      "Cámara cerrada con potencia modulante para ajustar entrega térmica.",
      "Encendido electrónico y caudal nominal declarado de 11 l/min.",
      "Debe corresponder a instalación de gas natural; no usar con butano.",
    ],
  },
];

const modelList = climaxTechnicalModels.map((item) => item.model).join(", ");

function normalized(value: string) {
  return value
    .toLocaleLowerCase("es-CL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function findClimaxTechnicalModel(value: string) {
  const text = normalized(value);
  return climaxTechnicalModels.find((model) => {
    const direct = normalized(model.model);
    return text.includes(direct) || model.aliases.some((alias) => text.includes(normalized(alias)));
  });
}

export function buildClimaxKnowledgeOverview() {
  const grouped = [
    "Modelos ACS verificados en fuentes públicas: " + modelList + ".",
    "Atmosféricos 6/10 L: cámara abierta, uso exterior, encendido por pilas no suministradas, sin luz piloto, presión mínima 0,3 bar y evacuación 100 mm en 6 L / 110 mm en 10 L.",
    "Estancos 11 L: cámara cerrada, uso interior/exterior, encendido electrónico, potencia modulante, presión mínima 0,02 bar y evacuación 100 mm.",
    "KB alimentada con fichas públicas verificadas y preparada para sumar manuales PDF cuando estén disponibles.",
  ];

  return grouped.join("\n");
}

export function describeClimaxModel(model: ClimaxTechnicalModel) {
  return `${model.model}: ${model.combustion}, ${model.gas}, ${model.capacityLiters} L (${model.flowRate}), ${model.power}, cámara ${model.chamber.toLowerCase()}, encendido: ${model.ignition}, presión mínima ${model.pressureMin}, salida ${model.exhaustDiameter}, uso ${model.placeOfUse}.`;
}

function modelSpecificChecks(model: ClimaxTechnicalModel, issue: ClimaxIssue) {
  const checks: string[] = [];

  if (issue === "heat") {
    checks.push("Confirma que el gas del equipo coincide con la instalación: " + model.gas + ".");
    checks.push("Verifica que la demanda de agua supere la presión mínima de ficha: " + model.pressureMin + ".");
    if (model.ignition.includes("pilas")) {
      checks.push("En este modelo el encendido depende de pilas no suministradas: revisa carga, polaridad y contactos sin abrir componentes internos.");
    } else {
      checks.push("En este modelo el encendido es electrónico: observa si aparece código, luz o intento de arranque al abrir ACS.");
    }
    checks.push("Revisa si ocurre en todos los puntos de agua o solo en uno para separar grifería/caudal de equipo.");
  } else if (issue === "stability") {
    if (!model.modulating) {
      checks.push("Este modelo no declara potencia modulante; los mandos de llama y caudal influyen más en la estabilidad percibida.");
    } else {
      checks.push("Este modelo declara potencia modulante; si la temperatura oscila, interesa saber caudal real y uso simultáneo.");
    }
    checks.push("Prueba con un solo punto de agua abierto y luego con uso simultáneo para identificar caída de caudal.");
    checks.push("Dime si el síntoma aparece al inicio, después de varios minutos o solo cuando cambia la demanda.");
  } else if (issue === "flow") {
    checks.push("La presión mínima declarada para este modelo es " + model.pressureMin + "; bajo ese umbral puede fallar encendido o estabilidad.");
    checks.push("Compara todos los puntos de agua: si falla uno, revisa aireador/filtro de la grifería; si fallan todos, apunta a suministro/instalación.");
    checks.push("No desmontes válvulas internas ni componentes de gas.");
  } else if (issue === "error") {
    checks.push("Escríbeme el código exacto o describe la luz/parpadeo; con ese dato el diagnóstico cambia.");
    checks.push("Indica si el equipo vuelve a funcionar al cerrar y abrir ACS una vez, sin forzar ni puentear seguridad.");
  } else {
    checks.push("Dime síntoma principal, cuándo ocurre, si afecta a todos los puntos y si aparece código o luz.");
    checks.push("Para este modelo necesito confirmar gas, presión/caudal y condición de evacuación: " + model.exhaustDiameter + ".");
  }

  return checks;
}

export function buildClimaxModelSupportReply(model: ClimaxTechnicalModel, issue: ClimaxIssue) {
  const checks = modelSpecificChecks(model, issue);
  return [
    model.title,
    "",
    describeClimaxModel(model),
    "",
    "Para avanzar:",
    ...checks.map((check, index) => `${index + 1}. ${check}`),
    "",
    "Seguridad: si hay olor a gas, humo, chispa, fuga, llama anormal o sospecha de mala evacuación, detén el uso, ventila si corresponde y contacta a un técnico autorizado. No abras el equipo ni manipules gas, electricidad o sensores.",
  ].join("\n");
}

export function buildClimaxAcsModelPrompt() {
  return [
    "Tengo KB técnica para estos calentadores Climax reales: " + modelList + ".",
    "Si no tienes el modelo, dime si es atmosférico o estanco, butano o gas natural, y si es de 6, 10 u 11 litros.",
    "Con eso puedo acotar presión mínima, encendido, evacuación y pasos de diagnóstico sin repetir preguntas.",
  ].join("\n\n");
}
