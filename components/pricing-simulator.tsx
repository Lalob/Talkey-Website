"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowUpRight, Calculator, ChevronDown, ChevronUp, Info } from "lucide-react";
import type { PricingSimulatorCopy } from "@/lib/marketing-copy";
import { trackEvent } from "@/lib/analytics";

const REAL_AGENT_MONTHLY_COST_CLP = 900000;
const TOOLS_BASE_MONTHLY_COST_CLP = 160000;
const TOOLS_MONTHLY_COST_PER_EFFECTIVE_AGENT_CLP = 80000;
const SUPERVISION_BASE_MONTHLY_COST_IF_ACTIVE_CLP = 250000;
const SUPERVISION_MONTHLY_COST_PER_EFFECTIVE_AGENT_CLP = 90000;
const LABOR_COST_PER_SUPPORT_TICKET_CLP = 1300;
const TICKETS_PER_EFFECTIVE_AGENT_MONTH = 700;
const TALKEY_CENTER_DISCOUNT_FACTOR = 0.85;
const TALKEY_LOW_DISCOUNT_FACTOR = 0.8;
const TALKEY_HIGH_DISCOUNT_FACTOR = 0.9;
const PRICING_ROUNDING_STEP_CLP = 10000;
const MIN_MONTHLY_WARNING_THRESHOLD_CLP = 480000;

const MONTHLY_TICKET_REPRESENTATIVE_VALUES = [500, 1000, 2250, 5000, 10000] as const;
const UNKNOWN_MONTHLY_TICKETS_OPTION = MONTHLY_TICKET_REPRESENTATIVE_VALUES.length;

const BASE_IMPLEMENTATION = 500000;
const PRODUCT_SCOPE_SETUP_COST = 60000;
const VARIANT_SETUP_COST = 30000;
const DOCUMENT_INGESTION_COST = 25000;
const DOCUMENT_CLEANING_COST = 35000;
const EXPERT_INTERVIEW_BASE_COST = 600000;
const EXPERT_INTERVIEW_PRODUCT_COST = 80000;
const EXPERT_INTERVIEW_MAX_COST = 3600000;

const TROUBLESHOOTING_COSTS = {
  structured: 0,
  partial: 90000,
  missing: 180000,
} as const;

const PROTOCOL_COSTS = {
  existing: 0,
  partial: 70000,
  missing: 140000,
} as const;

const CHANNEL_IMPLEMENTATION_COSTS = {
  web: 150000,
  whatsapp: 650000,
  email: 350000,
  phone: 1800000,
} as const;

const CHANNEL_MONTHLY_COSTS_CLP = {
  web: {
    base: 60000,
    variablePerInteraction: 20,
    weight: 1,
  },
  whatsapp: {
    base: 180000,
    variablePerInteraction: 100,
    weight: 1.2,
  },
  email: {
    base: 90000,
    variablePerInteraction: 40,
    weight: 1,
  },
  phone: {
    base: 350000,
    variablePerInteraction: 250,
    weight: 1.5,
  },
} as const;

const CHANNEL_KEYS = ["web", "whatsapp", "email", "phone"] as const;

type ChannelKey = (typeof CHANNEL_KEYS)[number];
type TroubleshootingStatus = keyof typeof TROUBLESHOOTING_COSTS;
type ProtocolStatus = keyof typeof PROTOCOL_COSTS;
type YesNo = "no" | "yes";
type PricingBasis = "agents" | "tickets";

type SimulatorInput = {
  agents: number;
  monthlyTickets: number;
  products: number;
  variantsPerProduct: number;
  documents: number;
  cleanDocs: YesNo;
  troubleshootingStatus: TroubleshootingStatus;
  protocolStatus: ProtocolStatus;
  interviewExperts: YesNo;
  channels: ChannelKey[];
};

type EstimatedCurrentSupportCost = {
  calculationByAgents: number;
  calculationByTickets: number;
  estimatedCurrentSupportCost: number;
  selectedPricingBasis: PricingBasis;
};

type MonthlyRange = {
  monthlyLow: number;
  monthlyCenter: number;
  monthlyHigh: number;
};

type OptionFieldProps<TValue extends string | number> = {
  label: string;
  options: string[];
  value: TValue;
  values?: readonly TValue[];
  help?: string;
  onChange: (value: TValue) => void;
};

type NumberFieldProps = {
  label: string;
  value: number;
  help: string;
  min?: number;
  step?: number;
  onChange: (value: number) => void;
};

function formatClp(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function roundToPricingStep(value: number) {
  return Math.round(value / PRICING_ROUNDING_STEP_CLP) * PRICING_ROUNDING_STEP_CLP;
}

function getRepresentativeMonthlyTickets(monthlyTicketsOption: number) {
  if (Math.round(monthlyTicketsOption) === UNKNOWN_MONTHLY_TICKETS_OPTION) return 0;

  const index = Math.min(Math.max(Math.round(monthlyTicketsOption), 0), MONTHLY_TICKET_REPRESENTATIVE_VALUES.length - 1);
  return MONTHLY_TICKET_REPRESENTATIVE_VALUES[index];
}

function calculateHiddenToolsCost(effectiveAgents: number) {
  if (effectiveAgents <= 0) return 0;
  return Math.max(TOOLS_BASE_MONTHLY_COST_CLP, effectiveAgents * TOOLS_MONTHLY_COST_PER_EFFECTIVE_AGENT_CLP);
}

function calculateHiddenSupervisionCost(effectiveAgents: number) {
  if (effectiveAgents <= 0) return 0;
  return SUPERVISION_BASE_MONTHLY_COST_IF_ACTIVE_CLP + effectiveAgents * SUPERVISION_MONTHLY_COST_PER_EFFECTIVE_AGENT_CLP;
}

function calculateMonthlyChannelCost(selectedChannels: ChannelKey[], representativeMonthlyTickets: number) {
  if (selectedChannels.length === 0) return 0;

  const totalWeight = selectedChannels.reduce((sum, channel) => sum + CHANNEL_MONTHLY_COSTS_CLP[channel].weight, 0);
  const channelCost = selectedChannels.reduce((sum, channel) => {
    const channelPricing = CHANNEL_MONTHLY_COSTS_CLP[channel];
    const channelTicketShare = representativeMonthlyTickets * (channelPricing.weight / totalWeight);
    return sum + channelPricing.base + channelTicketShare * channelPricing.variablePerInteraction;
  }, 0);

  return roundToPricingStep(channelCost);
}

function calculateMonthlyCostByAgents(input: SimulatorInput) {
  const effectiveAgentsByAgents = Math.max(0, input.agents);
  const representativeMonthlyTickets = getRepresentativeMonthlyTickets(input.monthlyTickets);
  const agentsLaborCost = effectiveAgentsByAgents * REAL_AGENT_MONTHLY_COST_CLP;
  const toolsCost = calculateHiddenToolsCost(effectiveAgentsByAgents);
  const supervisionCost = calculateHiddenSupervisionCost(effectiveAgentsByAgents);
  const channelCost =
    Math.round(input.monthlyTickets) === UNKNOWN_MONTHLY_TICKETS_OPTION
      ? 0
      : calculateMonthlyChannelCost(input.channels, representativeMonthlyTickets);

  return agentsLaborCost + toolsCost + supervisionCost + channelCost;
}

function calculateMonthlyCostByTickets(input: SimulatorInput) {
  if (Math.round(input.monthlyTickets) === UNKNOWN_MONTHLY_TICKETS_OPTION) return 0;

  const representativeMonthlyTickets = getRepresentativeMonthlyTickets(input.monthlyTickets);
  const effectiveAgentsByTickets =
    representativeMonthlyTickets <= 0
      ? 0
      : Math.max(1, Math.ceil(representativeMonthlyTickets / TICKETS_PER_EFFECTIVE_AGENT_MONTH));
  const ticketLaborCost = representativeMonthlyTickets * LABOR_COST_PER_SUPPORT_TICKET_CLP;
  const toolsCost = calculateHiddenToolsCost(effectiveAgentsByTickets);
  const supervisionCost = calculateHiddenSupervisionCost(effectiveAgentsByTickets);
  const channelCost = calculateMonthlyChannelCost(input.channels, representativeMonthlyTickets);

  return ticketLaborCost + toolsCost + supervisionCost + channelCost;
}

function calculateEstimatedCurrentSupportCost(input: SimulatorInput): EstimatedCurrentSupportCost {
  const calculationByAgents = calculateMonthlyCostByAgents(input);
  const calculationByTickets = calculateMonthlyCostByTickets(input);
  const selectedPricingBasis = calculationByAgents >= calculationByTickets ? "agents" : "tickets";
  const estimatedCurrentSupportCost = Math.max(calculationByAgents, calculationByTickets);

  return {
    calculationByAgents,
    calculationByTickets,
    estimatedCurrentSupportCost,
    selectedPricingBasis,
  };
}

function calculateTalkeyMonthlyPriceRange(estimatedCurrentSupportCost: number): MonthlyRange {
  return {
    monthlyLow: roundToPricingStep(estimatedCurrentSupportCost * TALKEY_LOW_DISCOUNT_FACTOR),
    monthlyCenter: roundToPricingStep(estimatedCurrentSupportCost * TALKEY_CENTER_DISCOUNT_FACTOR),
    monthlyHigh: roundToPricingStep(estimatedCurrentSupportCost * TALKEY_HIGH_DISCOUNT_FACTOR),
  };
}

function calculateExpertInterviewCost(input: SimulatorInput) {
  if (input.interviewExperts === "no") return 0;
  return Math.min(EXPERT_INTERVIEW_BASE_COST + Math.max(0, input.products) * EXPERT_INTERVIEW_PRODUCT_COST, EXPERT_INTERVIEW_MAX_COST);
}

function calculateImplementationCost(input: SimulatorInput) {
  const productCount = Math.max(0, input.products);
  const documentCount = Math.max(0, input.documents);
  const variantCount = Math.max(0, input.variantsPerProduct - 1);
  const selectedChannelImplementationCosts = input.channels.reduce((sum, channel) => sum + CHANNEL_IMPLEMENTATION_COSTS[channel], 0);

  const implementationBase =
    BASE_IMPLEMENTATION +
    productCount * PRODUCT_SCOPE_SETUP_COST +
    productCount * variantCount * VARIANT_SETUP_COST +
    documentCount * DOCUMENT_INGESTION_COST +
    (input.cleanDocs === "yes" ? documentCount * DOCUMENT_CLEANING_COST : 0) +
    TROUBLESHOOTING_COSTS[input.troubleshootingStatus] +
    PROTOCOL_COSTS[input.protocolStatus] +
    selectedChannelImplementationCosts +
    calculateExpertInterviewCost(input);

  return {
    implementationLow: roundToPricingStep(implementationBase * 0.85),
    implementationHigh: roundToPricingStep(implementationBase * 1.2),
  };
}

function getWarnings(input: SimulatorInput, estimatedCurrentSupportCost: number) {
  return [
    input.channels.length === 0 ? "noChannels" : null,
    input.products > 50 ? "manyProducts" : null,
    input.documents > 100 ? "manyDocuments" : null,
    input.troubleshootingStatus !== "structured" ? "missingTroubleshooting" : null,
    input.protocolStatus !== "existing" ? "missingProtocols" : null,
    input.channels.includes("phone") ? "phoneSelected" : null,
    estimatedCurrentSupportCost < MIN_MONTHLY_WARNING_THRESHOLD_CLP ? "lowCurrentCost" : null,
  ].filter(Boolean) as Array<keyof PricingSimulatorCopy["warnings"]>;
}

function OptionField<TValue extends string | number>({ label, options, value, values, help, onChange }: OptionFieldProps<TValue>) {
  const selectValue = values ? values.indexOf(value) : value;

  return (
    <label className="mk-pricing-field">
      <span>{label}</span>
      <select value={selectValue} onChange={(event) => onChange((values ? values[Number(event.target.value)] : Number(event.target.value)) as TValue)}>
        {options.map((option, index) => (
          <option key={option} value={values ? index : index}>
            {option}
          </option>
        ))}
      </select>
      {help && <small>{help}</small>}
    </label>
  );
}

function NumberField({ label, value, help, min = 0, step = 1, onChange }: NumberFieldProps) {
  function clamp(nextValue: number) {
    return Number.isFinite(nextValue) ? Math.max(min, nextValue) : min;
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(clamp(Number(event.target.value)));
  }

  function adjustValue(delta: number) {
    onChange(clamp(value + delta));
  }

  return (
    <label className="mk-pricing-field">
      <span>{label}</span>
      <div className="mk-number-control">
        <input min={min} step={step} type="number" inputMode="numeric" value={value} onChange={handleInputChange} />
        <div className="mk-number-steppers" aria-hidden={false}>
          <button type="button" aria-label={`${label} +${step}`} onClick={() => adjustValue(step)}>
            <ChevronUp size={18} strokeWidth={2.8} />
          </button>
          <button type="button" aria-label={`${label} -${step}`} disabled={value <= min} onClick={() => adjustValue(-step)}>
            <ChevronDown size={18} strokeWidth={2.8} />
          </button>
        </div>
      </div>
      <small>{help}</small>
    </label>
  );
}

export function PricingSimulator({ copy }: { copy: PricingSimulatorCopy }) {
  const [agents, setAgents] = useState(1);
  const [monthlyTickets, setMonthlyTickets] = useState(1);
  const [products, setProducts] = useState(5);
  const [variantsPerProduct, setVariantsPerProduct] = useState(1);
  const [documents, setDocuments] = useState(10);
  const [cleanDocs, setCleanDocs] = useState<YesNo>("no");
  const [troubleshootingStatus, setTroubleshootingStatus] = useState<TroubleshootingStatus>("partial");
  const [protocolStatus, setProtocolStatus] = useState<ProtocolStatus>("partial");
  const [interviewExperts, setInterviewExperts] = useState<YesNo>("no");
  const [channels, setChannels] = useState<ChannelKey[]>(["web"]);
  const simulatorUsedRef = useRef(false);

  const result = useMemo(() => {
    const input: SimulatorInput = {
      agents,
      monthlyTickets,
      products,
      variantsPerProduct,
      documents,
      cleanDocs,
      troubleshootingStatus,
      protocolStatus,
      interviewExperts,
      channels,
    };
    const supportCostEstimate = calculateEstimatedCurrentSupportCost(input);
    const monthlyRange = calculateTalkeyMonthlyPriceRange(supportCostEstimate.estimatedCurrentSupportCost);
    const implementation = calculateImplementationCost(input);
    const warnings = getWarnings(input, supportCostEstimate.estimatedCurrentSupportCost);

    return {
      monthlyRange,
      implementation,
      warnings,
    };
  }, [
    agents,
    monthlyTickets,
    products,
    variantsPerProduct,
    documents,
    cleanDocs,
    troubleshootingStatus,
    protocolStatus,
    interviewExperts,
    channels,
  ]);

  const cleanDocValues = ["no", "yes"] as const;
  const troubleshootingValues = ["structured", "partial", "missing"] as const;
  const protocolValues = ["existing", "partial", "missing"] as const;
  const interviewValues = ["no", "yes"] as const;

  function markSimulatorUsed() {
    if (simulatorUsedRef.current) return;
    simulatorUsedRef.current = true;
    trackEvent("pricing_simulator_used", { source: "pricing_simulator" });
  }

  function updateNumericValue(setter: (value: number) => void, value: number) {
    markSimulatorUsed();
    setter(value);
  }

  function toggleChannel(channel: ChannelKey) {
    markSimulatorUsed();
    setChannels((current) =>
      current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel],
    );
  }

  return (
    <section id="precios" className="mk-section mk-pricing">
      <div className="mk-container">
        <div className="mk-pricing-heading">
          <div>
            <div className="mk-section-label"><span>07</span>{copy.kicker}</div>
            <h2>{copy.title}</h2>
          </div>
          {copy.body && <p>{copy.body}</p>}
        </div>

        <div className="mk-pricing-layout">
          <div className="mk-pricing-panel">
            <div className="mk-pricing-section">
              <h3>{copy.sections.operation}</h3>
              <div className="mk-pricing-fields">
                <NumberField label={copy.fields.agents} value={agents} help={copy.help.agents} onChange={(value) => updateNumericValue(setAgents, value)} />
                <OptionField label={copy.fields.monthlyTickets} options={copy.options.monthlyTickets} value={monthlyTickets} help={copy.help.monthlyTickets} onChange={(value) => { markSimulatorUsed(); setMonthlyTickets(value); }} />
              </div>
            </div>

            <div className="mk-pricing-section">
              <h3>{copy.sections.scope}</h3>
              <div className="mk-pricing-fields">
                <NumberField label={copy.fields.products} value={products} help={copy.help.products} onChange={(value) => updateNumericValue(setProducts, value)} />
                <NumberField label={copy.fields.variantsPerProduct} value={variantsPerProduct} help={copy.help.variantsPerProduct} onChange={(value) => updateNumericValue(setVariantsPerProduct, value)} />
              </div>
            </div>

            <div className="mk-pricing-section">
              <h3>{copy.sections.readiness}</h3>
              <p className="mk-pricing-section-note">{copy.help.readinessIntro}</p>
              <div className="mk-pricing-fields">
                <NumberField label={copy.fields.documents} value={documents} help={copy.help.documents} onChange={(value) => updateNumericValue(setDocuments, value)} />
                <OptionField label={copy.fields.cleanDocs} options={copy.options.cleanDocs} value={cleanDocs} values={cleanDocValues} onChange={(value) => { markSimulatorUsed(); setCleanDocs(value); }} />
                <OptionField label={copy.fields.troubleshootingStatus} options={copy.options.troubleshootingStatus} value={troubleshootingStatus} values={troubleshootingValues} onChange={(value) => { markSimulatorUsed(); setTroubleshootingStatus(value); }} />
                <OptionField label={copy.fields.protocolStatus} options={copy.options.protocolStatus} value={protocolStatus} values={protocolValues} onChange={(value) => { markSimulatorUsed(); setProtocolStatus(value); }} />
                <OptionField label={copy.fields.interviewExperts} options={copy.options.interviewExperts} value={interviewExperts} values={interviewValues} onChange={(value) => { markSimulatorUsed(); setInterviewExperts(value); }} />
              </div>
            </div>

            <div className="mk-pricing-section">
              <h3>{copy.sections.channels}</h3>
              <p className="mk-pricing-section-note">{copy.help.channelsIntro}</p>
              <fieldset className="mk-pricing-field mk-pricing-checkboxes">
                <legend>{copy.fields.channels}</legend>
                <div>
                  {copy.options.channels.map((channel, index) => {
                    const channelKey = CHANNEL_KEYS[index];
                    return (
                      <label key={channelKey}>
                        <input type="checkbox" checked={channels.includes(channelKey)} onChange={() => toggleChannel(channelKey)} />
                        <span>{channel}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          <aside className="mk-pricing-result" aria-live="polite">
            <div className="mk-pricing-result-top">
              <span><Calculator size={18} />{copy.results.estimateBadge}</span>
              <strong>{copy.results.monthlyRange}</strong>
              <p>{copy.results.rangePrefix} {formatClp(result.monthlyRange.monthlyLow)} {copy.results.rangeConnector} {formatClp(result.monthlyRange.monthlyHigh)}</p>
              <small>{copy.results.monthlySuffix}</small>
            </div>

            <div className="mk-pricing-cards">
              <article className="mk-pricing-wide-card">
                <span>{copy.results.implementationRange}</span>
                <strong>{copy.results.rangePrefix} {formatClp(result.implementation.implementationLow)} {copy.results.rangeConnector} {formatClp(result.implementation.implementationHigh)}</strong>
                <small>{copy.results.implementationSuffix}</small>
              </article>
            </div>

            <div className="mk-pricing-warnings">
              <strong><AlertTriangle size={16} />{copy.warnings.title}</strong>
              {copy.results.notes.map((note) => <p key={note}>{note}</p>)}
              {result.warnings.map((warning) => <p key={warning}>{copy.warnings[warning]}</p>)}
            </div>

            <a className="mk-pricing-demo" href="#agenda" onClick={() => trackEvent("pricing_request_demo_click", { source: "pricing_simulator" })}>
              {copy.results.demoButton}<ArrowUpRight size={18} />
            </a>

            <p className="mk-pricing-legal"><Info size={16} />{copy.results.legal}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
