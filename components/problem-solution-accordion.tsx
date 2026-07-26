"use client";

import { ArrowRight, Minus, Plus } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type ProblemSolutionItem = {
  title: string;
  solution: string;
  action?: {
    label: string;
    href: string;
    external?: boolean;
  };
};

type ProblemSolutionAccordionProps = {
  items: ProblemSolutionItem[];
  variant: "sales" | "support";
  panelLabel?: string;
  openLabel?: string;
  closeLabel?: string;
  onAction?: (href: string) => void;
};

export function ProblemSolutionAccordion({
  items,
  variant,
  panelLabel,
  openLabel = "Ver solución",
  closeLabel = "Ocultar solución",
  onAction,
}: ProblemSolutionAccordionProps) {
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const baseId = useId();
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openTitle) return;

    function closeOutside(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node) || accordionRef.current?.contains(target)) return;
      setOpenTitle(null);
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenTitle(null);
    }

    document.addEventListener("pointerdown", closeOutside, true);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside, true);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [openTitle]);

  return (
    <div
      ref={accordionRef}
      className={`mk-problem-accordion mk-problem-accordion-${variant}`}
    >
      {items.map((item, index) => {
        const isOpen = openTitle === item.title;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <article
            className={`mk-problem-accordion-item${isOpen ? " is-open" : ""}`}
            key={item.title}
          >
            <h3>
              <button
                id={triggerId}
                className="mk-problem-accordion-trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenTitle(isOpen ? null : item.title)}
              >
                <span className="mk-problem-accordion-title">{item.title}</span>
                <span className="mk-problem-accordion-affordance" aria-hidden="true">
                  <span>{isOpen ? closeLabel : openLabel}</span>
                  {isOpen ? <Minus size={16} strokeWidth={2.6} /> : <Plus size={16} strokeWidth={2.6} />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              className="mk-problem-accordion-panel"
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              onClick={(event) => {
                const target = event.target;
                if (target instanceof Element && target.closest("a")) return;
                setOpenTitle(null);
              }}
            >
              {panelLabel ? <span>{panelLabel}</span> : null}
              <p>{item.solution}</p>
              {item.action ? (
                <a
                  className="mk-faq-cta"
                  href={item.action.href}
                  target={item.action.external ? "_blank" : undefined}
                  rel={item.action.external ? "noopener noreferrer" : undefined}
                  onClick={() => onAction?.(item.action?.href ?? "")}
                >
                  {item.action.label}
                  <ArrowRight size={16} />
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
