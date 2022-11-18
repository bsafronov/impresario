import { useEffect } from "react";
import {
  ICompany,
  ICompanyAd,
  ICompanyMoney,
} from "../store/reducers/company/company.interface";
import { companySlice } from "../store/reducers/company/companySlice";
import {
  IProduct,
  IProductSetStatus,
} from "../store/reducers/product/product.interface";
import { productSlice } from "../store/reducers/product/productSlice";
import { RulesSlice } from "../store/reducers/rules/rulesSlice";
import {
  ITaskActive,
  ITaskPendingToActive,
} from "../store/reducers/task/task.interface";
import { taskSlice } from "../store/reducers/task/taskSlice";
import { getRandomUpTo } from "./random";

import { useAppDispatch, useAppSelector } from "./redux";

export function useGameLogic() {
  const INFLATION = 10;
  const MINUTE = 60000;

  const dispatch = useAppDispatch();
  const { setGameDay, setInflation } = RulesSlice.actions;
  const { finishActiveTasks, pendingToActive } = taskSlice.actions;
  const { moneyToCompany, moneyFromCompany, setAdLvl } = companySlice.actions;
  const { setProductStatus } = productSlice.actions;

  const { companies } = useAppSelector(state => state.companyReducer);
  const { gameDay } = useAppSelector(state => state.rulesReducer);

  const { tasksActive, tasksPending } = useAppSelector(
    state => state.tasksReducer
  );

  // Initialize game states
  useEffect(() => {
    dispatch(setGameDay());
    dispatch(setInflation(INFLATION));
    manageTasks();
  }, []);

  // Update days and inflation
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setGameDay());
      dispatch(setInflation(INFLATION));
      manageTasks();
    }, MINUTE);

    return () => clearInterval(interval);
  });

  function manageTasks() {
    if (tasksActive.length === 0) return;

    const finishedTasks = tasksActive.filter(
      task => task.productionTime - (gameDay - task.startedAtDay) <= 1
    );

    if (finishedTasks.length === 0) return;

    const unfinishedTasks = tasksActive.filter(
      task => task.productionTime - (gameDay - task.startedAtDay) > 1
    );

    dispatch(finishActiveTasks(unfinishedTasks));

    for (let task of finishedTasks) {
      setNextTaskActive(task);

      const moneyData: ICompanyMoney = {
        amount: Math.round((task.expectedIncome * task.profitPercent) / 100),
        companyId: task.companyId,
      };

      const adData: ICompanyAd = {
        companyId: task.companyId,
        amount: task.adLvlUp,
      };
      dispatch(setAdLvl(adData));
      dispatch(moneyToCompany(moneyData));
    }
  }

  function setNextTaskActive(finishedTask: ITaskActive) {
    const nextTask = tasksPending.find(
      task => task.productId === finishedTask.productId
    );

    if (nextTask) {
      const company = companies.find(
        company => company.id === nextTask.companyId
      ) as ICompany;
      const productionMaxPercent =
        90 + 10 * (nextTask.priceModifier + company.adLevel);
      const randomProductionPercentValue = getRandomUpTo(productionMaxPercent);
      const profitPercent =
        randomProductionPercentValue > 100 ? 100 : randomProductionPercentValue;
      const data: ITaskPendingToActive = {
        id: nextTask.id as number,
        startedAtDay: gameDay,
        profitPercent: profitPercent,
      };

      const moneyData: ICompanyMoney = {
        amount: nextTask.costs,
        companyId: nextTask.companyId,
      };

      dispatch(moneyFromCompany(moneyData));
      dispatch(pendingToActive(data));
    } else {
      const status: IProductSetStatus = {
        id: finishedTask.productId,
        status: "await",
      };
      dispatch(setProductStatus(status));
    }
  }
}

export function useCurrentCompany() {
  const { companies } = useAppSelector(state => state.companyReducer);

  const { managingCompanyId } = useAppSelector(state => state.modalReducer);
  const company = companies.find(
    company => company.id === managingCompanyId
  ) as ICompany;

  return company;
}

export function useCurrentProduct() {
  const { products } = useAppSelector(state => state.productReducer);
  const { managingProductId } = useAppSelector(state => state.modalReducer);

  const product = products.find(
    product => product.id === managingProductId
  ) as IProduct;

  return product;
}

export function useCurrentTasks() {
  const { tasksActive, tasksPending } = useAppSelector(
    state => state.tasksReducer
  );
  const { managingProductId } = useAppSelector(state => state.modalReducer);

  const activeTasks = tasksActive.filter(
    task => task.productId === managingProductId
  );
  const pendingTasks = tasksPending.filter(
    task => task.productId === managingProductId
  );

  return { activeTasks, pendingTasks };
}
