"use client";

import { useRef, useState } from "react";

type SalesComparison = {
  title: string;
  text: string;
};

const previewItemCount = 3;

export function SalesComparisonTable({ items }: { items: SalesComparison[] }) {
  const [expanded, setExpanded] = useState(false);
  const openScrollY = useRef(0);
  const visibleItems = expanded ? items : items.slice(0, previewItemCount);

  function toggleExpanded() {
    if (!expanded) {
      openScrollY.current = window.scrollY;
      setExpanded(true);
      return;
    }

    const targetScrollY = openScrollY.current;
    setExpanded(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: Math.max(0, targetScrollY), behavior: "auto" });
      });
    });
  }

  return (
    <div className="mk-comparison-stack">
      <div className="mk-comparison-table" role="table" aria-label="Comparación Talkey Ventas">
        <div className="mk-comparison-table-head" role="row">
          <span role="columnheader">Opción</span>
          <span role="columnheader">Ventaja de Talkey</span>
        </div>
        {visibleItems.map((item) => (
          <article className="mk-comparison-table-row" key={item.title} role="row">
            <h3 role="cell">{item.title}</h3>
            <p role="cell">{item.text}</p>
          </article>
        ))}
      </div>
      {items.length > previewItemCount && (
        <button className="mk-list-toggle mk-sales-list-toggle" type="button" onClick={toggleExpanded}>
          {expanded ? "Ver menos..." : "Ver más comparaciones..."}
        </button>
      )}
    </div>
  );
}
