import { useTranslation } from "react-i18next";
import { IProductExpected } from "../../../hooks/productCalculations/productCalculations.interface";
import { IExpectedIncomeContent } from "./ExpectedIncome.interface";

export const useExpectedIncomeData = (calc: IProductExpected) => {
  const { t } = useTranslation();
  const content: IExpectedIncomeContent[] = [
    { text: t("stats.flow_before_taxes"), value: calc.beforeTaxes },
    { text: t("stats.flow_after_taxes"), value: calc.afterTaxes },
    { text: t("stats.profit_before_salary"), value: calc.profit },
    { text: t("stats.netprofit"), value: calc.netProfit },
    { text: t("stats.recommended_salary"), value: calc.recommendedSalary },
    {
      text: t("stats.workers_efficiency"),
      value: calc.workersEfficiency,
      sign: "%",
    },
  ];

  return { content };
};
