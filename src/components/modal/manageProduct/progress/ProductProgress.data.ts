import { IProductCalculations } from "../../../../hooks/productCalculations/productCalculations.interface";
import { IProductProgressContent } from "./ProductProgress.interface";

export const productProgressData = (calc: IProductCalculations) => {
  const content: IProductProgressContent[] = [
    {
      property: "Модификатор стоимости",
      prompt: [
        "Зависит от добавочной стоимости",
        "Влияет на % реализации продукции",
        "Увеличивает % инвестиций извне",
      ],
      value: calc.modifier.priceModifier,
    },
    {
      property: "Модификатор з/п",
      prompt: [
        "Зависит от зарплаты работникам",
        "Влияет на качество продукции",
        "Увеличивает % инвестиций извне",
      ],
      value: (calc.modifier.salaryModifier * 10).toFixed(2),
    },
    {
      property: "Время на реализацию",
      prompt: "Зависит от эффективности работников",
      value: "~" + Math.round(calc.finalState.productionTime) + " дней",
    },
    {
      property: "Мин.необх.реализация",
      prompt: "Необходимо реализовать, чтобы достичь точки безубытка",
      value: (calc.conditions.minCoefficient * 100).toFixed(1) + "%",
    },
  ];

  const income: IProductProgressContent[] = [
    {
      property: "Уровень рекламы",
      prompt: [
        "Зависит от объёма производства и качества продукции",
        "Влияет на % реализации продукции",
      ],
      value: "+" + calc.finalState.adLvlUp.toFixed(2) + " ед.",
    },
    {
      property: "Вероятность дохода",
      prompt: "Фактическая вероятность достичь точки безубытка",
      value: (calc.finalState.profitChance * 100).toFixed(1) + " %",
    },
  ];

  return {content, income};
}
