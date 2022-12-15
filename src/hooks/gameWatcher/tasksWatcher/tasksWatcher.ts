import { useEffect } from "react";
import {
  ICompanyAd,
  ICompanyMoney,
} from "../../../store/reducers/company/company.interface";
import { companySlice } from "../../../store/reducers/company/companySlice";
import { INewsItemForm } from "../../../store/reducers/news/news.interface";
import { newsSlice } from "../../../store/reducers/news/newsSlice";
import { IOperationForm } from "../../../store/reducers/operation/operation.interface";
import { operationSlice } from "../../../store/reducers/operation/operationSlice";
import { taskSlice } from "../../../store/reducers/task/taskSlice";
import { useAppDispatch, useAppSelector } from "../../redux";

export function useTasksWatcher() {
  const { deleteTaskById, setTaskActiveById } = taskSlice.actions;
  const { moneyFromCompany, moneyToCompany, setAdLvl } = companySlice.actions;
  const { addOperation } = operationSlice.actions;
  const { createNewsItem } = newsSlice.actions;
  const { tasks } = useAppSelector(state => state.tasksReducer);
  const { gameDay } = useAppSelector(state => state.rulesReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    function checkTasksProgress() {
      tasks.forEach(task => {
        if (task.startedByDay > gameDay) return;

        if (task.type === "pending") {
          const remainingCosts: IOperationForm = {
            amount: task.costs * 0.5 + task.salary,
            companyId: task.companyId,
            gameDay: task.startedByDay,
            type: "costs",
          };

          const moneyData: ICompanyMoney = {
            amount: remainingCosts.amount,
            companyId: task.companyId,
          };

          dispatch(addOperation(remainingCosts));
          dispatch(moneyFromCompany(moneyData));
          dispatch(setTaskActiveById(task.id as number));
        }

        if (task.finishedByDay - gameDay < 1) {
          const moneyData: ICompanyMoney = {
            amount: Math.round(
              (task.expectedIncome * task.profitPercent) / 100
            ),
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
            percent: Math.round(task.profitPercent),
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

          dispatch(moneyToCompany(moneyData));
          dispatch(setAdLvl(adData));
          dispatch(createNewsItem(newsData));
          dispatch(addOperation(operationData));
          dispatch(deleteTaskById(task.id as number));
        }
      });
    }

    checkTasksProgress();
    // eslint-disable-next-line
  }, [gameDay]);
}
