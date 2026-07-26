"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

type ProblemSolutionItem = {
  title: string;
  solution: string;
};

type ProblemSolutionAccordionProps = {
  items: ProblemSolutionItem[];
  variant: "sales" | "support";
};

export function ProblemSolutionAccordion({
  items,
  variant,
}: ProblemSolutionAccordionProps) {
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className={`mk-problem-accordion mk-problem-accordion-${variant}`}>
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
                <span>{item.title}</span>
                <ChevronDown aria-hidden="true" size={22} strokeWidth={2.4} />
              </button>
            </h3>
            <div
              id={panelId}
              className="mk-problem-accordion-panel"
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
            >
              <span>Solución Talkey</span>
              <p>{item.solution}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
