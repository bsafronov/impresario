import {
  ICompanyAd,
  ICompanyMoney,
} from "../../../store/reducers/company/company.interface";
import { INewsItemForm } from "../../../store/reducers/news/news.interface";
import { IOperationForm } from "../../../store/reducers/operation/operation.interface";
import { ITask } from "../../../store/reducers/task/task.interface";

export function finishTaskData(task: ITask, gameDay: number) {
  const moneyData: ICompanyMoney = {
    amount: Math.round((task.expectedIncome * task.profitPercent) / 100),
    companyId: task.companyId,
  };

  const adData: ICompanyAd = {
    companyId: task.companyId,
    amount: task.adLvlUp,
  };

  const newsData: INewsItemForm = {
    gameDay: task.finishedByDay,
    companyId: task.companyId,
    productId: task.productId,
    percent: task.profitPercent,
    adLvlUp: parseFloat(adData.amount.toFixed(2)),
    income: moneyData.amount - (task.costs + task.salary),
  };

  const operationData: IOperationForm = {
    gameDay: task.finishedByDay,
    productId: task.productId,
    companyId: task.companyId,
    amount: moneyData.amount,
    type: "income",
  };

  return { moneyData, adData, newsData, operationData };
}
