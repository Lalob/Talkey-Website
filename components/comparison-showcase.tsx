import { BadgeCheck } from "lucide-react";

type ComparisonShowcaseItem = {
  title: string;
};

export function ComparisonShowcase({
  sourceTitle,
  items,
  summaryTitle,
  summaryBody,
  advantages,
  variant,
}: {
  sourceTitle: string;
  items: ComparisonShowcaseItem[];
  summaryTitle: string;
  summaryBody?: string;
  advantages: string[];
  variant: "sales" | "support";
}) {
  return (
    <div className={`mk-comparison-showcase mk-comparison-showcase-${variant}`}>
      <div className="mk-comparison-source-card">
        <p>{sourceTitle}</p>
        <div className="mk-comparison-source-list" aria-label={sourceTitle}>
          {items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
            </article>
          ))}
        </div>
      </div>

      <article className="mk-comparison-talkey-card">
        <p className="mk-comparison-talkey-eyebrow">Talkey</p>
        <h3>{summaryTitle}</h3>
        {summaryBody ? <p className="mk-comparison-talkey-body">{summaryBody}</p> : null}
        <ul>
          {advantages.map((advantage) => (
            <li key={advantage}>
              <BadgeCheck size={18} />
              <span>{advantage}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
