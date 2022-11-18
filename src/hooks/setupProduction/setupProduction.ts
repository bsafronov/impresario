import { ICompanyMoney } from "../../store/reducers/company/company.interface";
import { companySlice } from "../../store/reducers/company/companySlice";
import { IProductSetStatus } from "../../store/reducers/product/product.interface";
import { productSlice } from "../../store/reducers/product/productSlice";
import {
  ITaskActive,
  ITaskPending,
} from "../../store/reducers/task/task.interface";
import { taskSlice } from "../../store/reducers/task/taskSlice";
import { useCurrentProduct } from "../gameLogic";
import { IProductCalculations } from "../productCalculations/productCalculations.interface";
import { getRandomByPercent, getRandomUpTo } from "../random";
import { useAppDispatch, useAppSelector } from "../redux";

export const useSetupProduction = (
  calc: IProductCalculations,
  costs: number,
  salary: number
) => {
  const dispatch = useAppDispatch();
  const product = useCurrentProduct();
  const { managingProductId, managingCompanyId } = useAppSelector(
    state => state.modalReducer
  );
  const { gameDay } = useAppSelector(state => state.rulesReducer);
  const { moneyFromCompany } = companySlice.actions;
  const { setProductStatus } = productSlice.actions;
  const { createTaskActive, createTaskPending } = taskSlice.actions;
  // const {createTask} = taskSlice.actions;

  function createNewTask() {
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
      calc.expected.netProfit > 0 ? calc.expected.netProfit + costs : 0;

    if (product.status === "await" || product.status === "fulfilled") {
      const data: ITaskActive = {
        productId: managingProductId as number,
        companyId: managingCompanyId as number,
        startedAtDay: gameDay,
        costs: costs,
        adLvlUp: calc.finalState.adLvlUp,
        productionTime: randomProductionTime,
        priceModifier: calc.modifier.priceModifier,
        salaryModifier: calc.modifier.salaryModifier,
        profitPercent: randomProductionPercent,
        expectedIncome: expectedIncome,
      };

      const money: ICompanyMoney = {
        companyId: managingCompanyId as number,
        amount: costs + salary,
      };

      const productStatus: IProductSetStatus = {
        id: managingProductId as number,
        status: "in progress",
      };

      dispatch(moneyFromCompany(money));
      dispatch(createTaskActive(data));
      dispatch(setProductStatus(productStatus));
    }

    if (product.status === "in progress") {
      const data: ITaskPending = {
        productId: managingProductId as number,
        companyId: managingCompanyId as number,
        costs: costs,
        adLvlUp: calc.finalState.adLvlUp,
        productionTime: randomProductionTime,
        priceModifier: calc.modifier.priceModifier,
        salaryModifier: calc.modifier.salaryModifier,
        expectedIncome: expectedIncome,
      };

      dispatch(createTaskPending(data));
    }
  }

  return { createNewTask };
};
