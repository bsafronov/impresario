import { getRandomByPercent, getRandomUpTo } from "../../functions/random";
import { ISetupRandom } from "./setupProduction.interface";

export function randomProduction(data: ISetupRandom) {
  const tasksAdLvlUpSum = data.tasks.reduce(
    (sum, task) => (sum += task.adLvlUp),
    0
  );

  const randomProductionTime = Math.round(
    data.calc.finalState.productionTime +
      data.calc.finalState.productionTime * getRandomByPercent(15)
  );

  const maxSalesPercent =
    90 +
    10 *
      (data.calc.modifier.priceModifier + data.companyAdLvl + tasksAdLvlUpSum);

  const randomProductionPercentValue = getRandomUpTo(maxSalesPercent);

  const randomProductionPercent =
    randomProductionPercentValue > 100
      ? 100
      : Math.round(randomProductionPercentValue);
  const expectedIncome =
    data.calc.expected.netProfit > 0 ? data.calc.expected.afterTaxes : 0;

  return { randomProductionTime, randomProductionPercent, expectedIncome };
}
