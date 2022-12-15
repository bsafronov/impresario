import { ICompanyMoney } from "../../store/reducers/company/company.interface";
import { companySlice } from "../../store/reducers/company/companySlice";
import { IOperationForm } from "../../store/reducers/operation/operation.interface";
import { operationSlice } from "../../store/reducers/operation/operationSlice";
import { ITask } from "../../store/reducers/task/task.interface";
import { taskSlice } from "../../store/reducers/task/taskSlice";
import { useCurrentCompany } from "../findCurrent/findCurrent";

import { IProductCalculations } from "../productCalculations/productCalculations.interface";
import { useAppDispatch, useAppSelector } from "../redux";

import { randomProduction } from "./randomProduction";
import { ISetupRandom } from "./setupProduction.interface";

export const useSetupProduction = (
  calc: IProductCalculations,
  costs: number,
  salary: number
) => {
  const { moneyFromCompany } = companySlice.actions;
  const { addOperation } = operationSlice.actions;
  const { createTask } = taskSlice.actions;
  const { managingProductId, managingCompanyId } = useAppSelector(
    state => state.modalReducer
  );
  const { gameDay } = useAppSelector(state => state.rulesReducer);
  const { tasks } = useAppSelector(state => state.tasksReducer);
  const company = useCurrentCompany();
  const dispatch = useAppDispatch();

  function createNewTask() {
    const tasksQueue = tasks.filter(
      task => task.productId === managingProductId
    );

    const setupRandom: ISetupRandom = {
      calc,
      costs,
      tasks,
      companyAdLvl: company.adLevel,
    };

    const { expectedIncome, randomProductionPercent, randomProductionTime } =
      randomProduction(setupRandom);

    const taskData: ITask = {
      companyId: managingCompanyId as number,
      productId: managingProductId as number,
      salary: salary,
      adLvlUp: calc.finalState.adLvlUp,
      expectedIncome: expectedIncome,
      priceModifier: calc.modifier.priceModifier,
      salaryModifier: calc.modifier.salaryModifier,
      profitPercent: randomProductionPercent,

      // Above depends on queue
      finishedByDay: gameDay + randomProductionTime,
      startedByDay: gameDay,
      costs: costs,
      type: "active",
    };

    const isQueue = tasksQueue.length > 0;

    if (isQueue) {
      const finishByDayList = tasksQueue.map(task => task.finishedByDay);
      const newTaskStartingTime = Math.max(...finishByDayList);

      taskData.startedByDay = newTaskStartingTime;
      taskData.finishedByDay = newTaskStartingTime + randomProductionTime;
      taskData.type = "pending";
    }

    const moneyData: ICompanyMoney = {
      amount:
        taskData.type === "active"
          ? taskData.costs + taskData.salary
          : taskData.costs * 0.5,
      companyId: taskData.companyId,
    };

    const operationData: IOperationForm = {
      amount: moneyData.amount,
      companyId: taskData.companyId,
      gameDay: taskData.startedByDay,
      type: "costs",
      productId: taskData.productId,
    };

    dispatch(moneyFromCompany(moneyData));
    dispatch(addOperation(operationData));
    dispatch(createTask(taskData));
  }

  return { createNewTask };
};
