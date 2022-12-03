import { useEffect } from "react";
import { ICompany } from "../../../store/reducers/company/company.interface";
import { companySlice } from "../../../store/reducers/company/companySlice";
import { newsSlice } from "../../../store/reducers/news/newsSlice";
import { operationSlice } from "../../../store/reducers/operation/operationSlice";
import { IProductSetStatus } from "../../../store/reducers/product/product.interface";
import { productSlice } from "../../../store/reducers/product/productSlice";
import { ITask } from "../../../store/reducers/task/task.interface";
import { taskSlice } from "../../../store/reducers/task/taskSlice";
import { useAppDispatch, useAppSelector } from "../../redux";
import { finishTaskData } from "./finishTask.data";
import { runNextTaskData } from "./runTask.data";

export function useTasksWatcher() {
  const { finishActiveTasks, pendingToActive } = taskSlice.actions;
  const { moneyFromCompany, moneyToCompany, setAdLvl } = companySlice.actions;
  const { addOperation } = operationSlice.actions;
  const { setProductStatus } = productSlice.actions;
  const { createNewsItem } = newsSlice.actions;
  const { tasksActive, tasksPending } = useAppSelector(
    state => state.tasksReducer
  );
  const { companies } = useAppSelector(state => state.companyReducer);
  const { gameDay } = useAppSelector(state => state.rulesReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    checkTasksProgress();
    function checkTasksProgress() {
      // Find finished tasks
      const finishedTasks = tasksActive.filter(
        task => task.finishedByDay - gameDay < 1
      );

      if (finishedTasks.length === 0) return;

      // Clear database/active-tasks from finished tasks
      const unfinishedTasks = tasksActive.filter(
        task => task.finishedByDay - gameDay > 1
      );
      dispatch(finishActiveTasks(unfinishedTasks));

      // Actions with every finished tasks
      for (let task of finishedTasks) {
        const { adData, moneyData, newsData, operationData } = finishTaskData(
          task,
          gameDay
        );

        dispatch(setAdLvl(adData));
        dispatch(moneyToCompany(moneyData));
        dispatch(addOperation(operationData));
        dispatch(createNewsItem(newsData));
        runNextTask(task);
      }
    }

    function runNextTask(task: ITask) {
      // Check if there is pending task to continue production
      const nextTask = tasksPending.find(
        current => current.productId === task.productId
      );

      // Set product "awaiting" for next task if all pending tasks completed
      if (!nextTask) {
        const status: IProductSetStatus = {
          id: task.productId,
          status: "await",
        };
        return dispatch(setProductStatus(status));
      }

      const company = companies.find(
        company => company.id === nextTask.companyId
      ) as ICompany;

      const { taskData, moneyData, operationData } = runNextTaskData(
        nextTask,
        company,
        task.finishedByDay
      );

      dispatch(moneyFromCompany(moneyData));
      dispatch(pendingToActive(taskData));
      dispatch(addOperation(operationData));
    }
    // eslint-disable-next-line
  }, [gameDay]);
}
