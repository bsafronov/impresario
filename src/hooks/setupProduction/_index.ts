import { companySlice } from "../../store/reducers/company/companySlice";
import { operationSlice } from "../../store/reducers/operation/operationSlice";
import { productSlice } from "../../store/reducers/product/productSlice";
import { taskSlice } from "../../store/reducers/task/taskSlice";
import {
  useCurrentCompany,
  useCurrentProduct,
} from "../findCurrent/findCurrent";

import { IProductCalculations } from "../productCalculations/productCalculations.interface";
import { useAppDispatch, useAppSelector } from "../redux";
import { setupActive } from "./active";
import { setupPending } from "./pending";
import { ISetupProduction } from "./setup.interface";

export const useSetupProduction = (
  calc: IProductCalculations,
  costs: number,
  salary: number
) => {
  const { moneyFromCompany } = companySlice.actions;
  const { addOperation } = operationSlice.actions;
  const { setProductStatus } = productSlice.actions;
  const { createTaskActive, createTaskPending } = taskSlice.actions;
  const { managingProductId, managingCompanyId } = useAppSelector(
    state => state.modalReducer
  );
  const { gameDay } = useAppSelector(state => state.rulesReducer);
  const { tasksActive, tasksPending } = useAppSelector(
    state => state.tasksReducer
  );
  const product = useCurrentProduct();
  const company = useCurrentCompany();
  const dispatch = useAppDispatch();

  const data: ISetupProduction = {
    calc,
    costs,
    gameDay,
    managingCompanyId: managingCompanyId as number,
    managingProductId: managingProductId as number,
    salary,
  };

  function createNewTask() {
    if (product.status === "await" || product.status === "fulfilled") {
      const { moneyData, operationData, productStatusData, taskData } =
        setupActive(data);

      dispatch(moneyFromCompany(moneyData));
      dispatch(addOperation(operationData));
      dispatch(createTaskActive(taskData));
      dispatch(setProductStatus(productStatusData));
    }

    if (product.status === "in progress") {
      const { taskData, moneyData, operationData } = setupPending(
        data,
        tasksActive,
        tasksPending,
        company
      );

      dispatch(moneyFromCompany(moneyData));
      dispatch(addOperation(operationData));
      dispatch(createTaskPending(taskData));
    }
  }

  return { createNewTask };
};
