import { ProblemSolutionAccordion } from "@/components/problem-solution-accordion";

type SalesProblem = {
  title: string;
  solution: string;
};

export function SalesProblemTable({ problems }: { problems: SalesProblem[] }) {
  return (
    <ProblemSolutionAccordion items={problems} variant="sales" />
  );
}
