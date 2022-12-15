import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../../functions/representation";
import { IProductForm } from "./ProductForm.interface";

export const useProductTaskData = (props: IProductForm) => {
  const { t } = useTranslation();
  const { shortBalance } = useRepresentation();
  const minSalary = Math.round(props.calc.conditions.minSalary);
  const maxSalary = Math.round(
    Math.min(
      props.balance - +props.costs,
      props.balance - props.calc.conditions.minCosts
    )
  );
  const maxCosts = Math.round(
    Math.min(props.calc.conditions.maxCosts, props.balance - +props.salary)
  );
  const content = [
    {
      text: t("title.material_costs"),
      max: maxCosts,
      min: props.calc.conditions.minCosts,
      placeholder:
        props.balance >= props.calc.conditions.minCosts &&
        maxCosts >= props.calc.conditions.minCosts
          ? `${t("text.from")} ${props.calc.conditions.minCosts} ${t(
              "text.to"
            )} ${shortBalance(maxCosts)} $`
          : t("text.insufficient_funds"),
      value: props.costs,
      set: props.setCosts,
      prompt: t("prompt.limited_by_balance_area"),
    },
    {
      text: t("title.workers_salary"),
      min: minSalary,
      max: maxSalary,
      placeholder:
        props.balance >= props.calc.conditions.minCosts
          ? `${t("text.from")} ${minSalary} ${t("text.to")} ${shortBalance(
              maxSalary
            )} $`
          : t("text.top_up_balance"),
      value: props.salary,
      set: props.setSalary,
      prompt: t("prompt.limited_by_balance"),
    },
    {
      text: t("title.add_value"),
      value: props.addedValue,
      placeholder:
        props.balance >= props.calc.conditions.minCosts
          ? `${t("text.from")} 0 ${t("text.to")} ${
              props.calc.conditions.maxAddedValue
            }%`
          : t("text.otherwise_null_balance"),
      set: props.setAddedValue,
      max: props.calc.conditions.maxAddedValue,
      min: 0,
      prompt: t("prompt.limited_by_ad_lvl"),
    },
  ];

  return { content };
};
