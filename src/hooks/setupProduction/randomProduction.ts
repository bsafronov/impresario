import { getRandomByPercent, getRandomUpTo } from "../../functions/random";
import { IProductCalculations } from "../productCalculations/productCalculations.interface";

export function randomProduction(calc: IProductCalculations, costs: number) {
  const randomProductionTime = Math.round(
    calc.finalState.productionTime +
      calc.finalState.productionTime * getRandomByPercent(15)
  );
  const randomProductionPercentValue = getRandomUpTo(
    calc.conditions.productionMaxPercent
  );
  const randomProductionPercent =
    randomProductionPercentValue > 100
      ? 100
      : Math.round(randomProductionPercentValue);
  const expectedIncome =
    calc.expected.netProfit > 0 ? calc.expected.afterTaxes : 0;

  return { randomProductionTime, randomProductionPercent, expectedIncome };
}
