import { getRandomUpTo } from "../../functions/random";
import {
  ICompany,
  ICompanyMoney,
} from "../../store/reducers/company/company.interface";
import { IOperationForm } from "../../store/reducers/operation/operation.interface";
import { ITask } from "../../store/reducers/task/task.interface";
import { randomProduction } from "./randomProduction";
import { ISetupProduction } from "./setup.interface";

export function setupPending(
  props: ISetupProduction,
  tasksActive: ITask[],
  tasksPending: ITask[],
  company: ICompany
) {
  function calculateFinishedByDay() {
    const activeTaskFinishedByDay = (
      tasksActive.find(
        task => task.productId === props.managingProductId
      ) as ITask
    ).finishedByDay;

    const pendingTasksFinishedByDayList = tasksPending
      .filter(task => task.productId === props.managingProductId)
      .map(task => task.finishedByDay);

    const latestFinishedByDay = Math.max(
      ...pendingTasksFinishedByDayList,
      activeTaskFinishedByDay
    );

    return latestFinishedByDay;
  }

  const { randomProductionTime, expectedIncome } = randomProduction(
    props.calc,
    props.costs
  );

  const productionMaxPercent =
    90 + 10 * (props.calc.modifier.priceModifier + company.adLevel);
  const randomProductionPercentValue = getRandomUpTo(productionMaxPercent);
  const profitPercent =
    randomProductionPercentValue > 100 ? 100 : randomProductionPercentValue;

  const moneyData: ICompanyMoney = {
    companyId: props.managingCompanyId,
    amount: props.costs * 0.5,
  };

  const operationData: IOperationForm = {
    gameDay: props.gameDay,
    productId: props.managingProductId,
    companyId: props.managingCompanyId,
    amount: moneyData.amount,
    type: "costs",
  };

  const taskData: ITask = {
    productId: props.managingProductId,
    companyId: props.managingCompanyId,
    costs: props.costs,
    salary: props.salary,
    adLvlUp: props.calc.finalState.adLvlUp,
    finishedByDay: calculateFinishedByDay() + randomProductionTime,
    priceModifier: props.calc.modifier.priceModifier,
    salaryModifier: props.calc.modifier.salaryModifier,
    expectedIncome: expectedIncome,
    profitPercent: profitPercent,
  };

  return { taskData, moneyData, operationData };
}
