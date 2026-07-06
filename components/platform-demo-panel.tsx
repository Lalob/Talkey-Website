"use client";

import { useMemo, useState } from "react";

export type DemoOption = {
  label: string;
  messages: Array<["visitor" | "assistant", string]>;
  cards: string[];
};

export function DemoPanel({ title, body, options }: { title: string; body: string; options: DemoOption[] }) {
  const [activeLabel, setActiveLabel] = useState(options[0]?.label ?? "");
  const active = useMemo(
    () => options.find((option) => option.label === activeLabel) ?? options[0],
    [activeLabel, options],
  );

  return (
    <article className="mk-platform-demo">
      <div className="mk-chat-topline">
        <span className="mk-live-dot" />
        <strong>{title}</strong>
      </div>
      <div className="mk-platform-demo-body">
        <p className="mk-platform-demo-subtitle">{body}</p>
        <div className="mk-platform-demo-options">
          {options.map((option) => (
            <button
              className={option.label === active.label ? "is-active" : ""}
              key={option.label}
              type="button"
              onClick={() => setActiveLabel(option.label)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="mk-platform-demo-thread">
          {active.messages.map(([sender, text], index) => (
            <div className={`mk-demo-message ${sender === "visitor" ? "is-visitor" : "is-assistant"}`} key={`${active.label}-${index}`}>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="mk-platform-demo-cards">
          {active.cards.map((card) => <span key={card}>{card}</span>)}
        </div>
      </div>
    </article>
  );
}
