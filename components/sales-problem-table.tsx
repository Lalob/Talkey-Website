"use client";

import { useRef, useState } from "react";

type SalesProblem = {
  title: string;
  problem: string;
  solution: string;
};

const previewItemCount = 3;

export function SalesProblemTable({ problems }: { problems: SalesProblem[] }) {
  const [expanded, setExpanded] = useState(false);
  const openScrollY = useRef(0);
  const visibleProblems = expanded ? problems : problems.slice(0, previewItemCount);

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
    <>
      <div className="mk-sales-problem-table">
        <div className="mk-sales-problem-table-head">
          <span>Problema</span>
          <span>Cómo lo resuelve TALKEY Ventas</span>
        </div>
        {visibleProblems.map((item) => (
          <article className="mk-sales-problem-row" key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.problem}</p>
            </div>
            <p>{item.solution}</p>
          </article>
        ))}
      </div>
      {problems.length > previewItemCount && (
        <button className="mk-list-toggle mk-sales-list-toggle" type="button" onClick={toggleExpanded}>
          {expanded ? "Ver menos..." : "Ver más problemas/soluciones..."}
        </button>
      )}
    </>
  );
}
