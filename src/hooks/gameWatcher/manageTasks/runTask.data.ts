import {
  ICompany,
  ICompanyMoney,
} from "../../../store/reducers/company/company.interface";
import { IOperationForm } from "../../../store/reducers/operation/operation.interface";
import {
  ITask,
  ITaskPendingToActive,
} from "../../../store/reducers/task/task.interface";

export function runNextTaskData(
  nextTask: ITask,
  company: ICompany,
  prevTaskFinishedByDay: number
) {
  const taskData: ITaskPendingToActive = {
    id: nextTask.id as number,
  };

  const moneyData: ICompanyMoney = {
    amount: nextTask.costs * 0.5 + nextTask.salary,
    companyId: nextTask.companyId,
  };

  const operationData: IOperationForm = {
    gameDay: prevTaskFinishedByDay,
    productId: nextTask.productId,
    companyId: nextTask.companyId,
    amount: moneyData.amount,
    type: "costs",
  };

  return { taskData, moneyData, operationData };
}
