import { useTranslation } from "react-i18next";
import { IProductCalculations } from "../../../hooks/productCalculations/productCalculations.interface";
import { IProductProgressContent } from "./ProductProgress.interface";

export const useProductProgressData = (calc: IProductCalculations) => {
  const { t } = useTranslation();

  const content: IProductProgressContent[] = [
    {
      property: t("stats.price_modifier"),
      prompt: [
        t("prompt.price_modifier_1"),
        t("prompt.price_modifier_2"),
        t("prompt.price_modifier_3"),
      ],
      value: calc.modifier.priceModifier,
    },
    {
      property: t("stats.salary_modifier"),
      prompt: [
        t("prompt.salary_modifier_1"),
        t("prompt.salary_modifier_2"),
        t("prompt.salary_modifier_3"),
      ],
      value: (calc.modifier.salaryModifier * 10).toFixed(2),
    },
    {
      property: t("stats.realise_time"),
      prompt: `${t("prompt.workers_efficiency_1")}`,
      value: `~${Math.round(calc.finalState.productionTime)} ${t("text.days")}`,
    },
    {
      property: t("stats.realise_min"),
      prompt: `${t("prompt.realise_min_1")}`,
      value: (calc.conditions.minCoefficient * 100).toFixed(1) + "%",
    },
  ];

  const income: IProductProgressContent[] = [
    {
      property: t("stats.ad_level"),
      prompt: [t("prompt.ad_level_1"), t("prompt.ad_level_2")],
      value: `+${calc.finalState.adLvlUp.toFixed(2)} ${t("text.units")}`,
    },
    {
      property: t("stats.breakeven"),
      prompt: `${t("prompt.breakeven_1")}`,
      value: (calc.finalState.profitChance * 100).toFixed(1) + " %",
    },
  ];

  return { content, income };
};
