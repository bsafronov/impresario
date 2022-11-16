import { IProductExpected } from "../../../../hooks/productCalculations/productCalculations.interface";
import { IExpectedIncomeContent } from "./ExpectedIncome.interface";

export const expectedIncomeData = (calc: IProductExpected) => {
  const content: IExpectedIncomeContent[] = [
    { text: "Поток (до налогов)", value: calc.beforeTaxes },
    { text: "Поток (после налогов)", value: calc.afterTaxes },
    { text: "Прибыль (без зарплаты)", value: calc.profit },
    { text: "Чистая прибыль", value: calc.netProfit },
    { text: "Рекомендуемая з/п", value: calc.recommendedSalary},
    { text: "Эффективность работников", value: calc.workersEfficiency, sign: "%"},
  ];

  return {content}
}