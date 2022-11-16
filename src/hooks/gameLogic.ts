import { useEffect } from "react";
import { ICompany } from "../store/reducers/company/company.interface";
import { IProduct } from "../store/reducers/product/product.interface";
import { RulesSlice } from "../store/reducers/rules/rulesSlice";
import { useAppDispatch, useAppSelector } from "./redux";

const inflation = 10;

export function useGameLogic() {
  const dispatch = useAppDispatch();
  const {setGameDay, setInflation} = RulesSlice.actions

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setGameDay());
      dispatch(setInflation(inflation));
    }, 60000)

    return () => clearInterval(interval)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // const statusTasks = tasks.filter()
    }, 60000)

    return () => clearInterval(interval)
  })
}

export function useCurrentCompany() {
  const { companies } = useAppSelector(state => state.companyReducer);
  const { managingCompanyId } = useAppSelector(state => state.modalReducer);

  const company = companies.find(
    company => company.id === managingCompanyId
  ) as ICompany;

  return company
}

export function useCurrentProduct() {
  const { products } = useAppSelector(state => state.productReducer);
  const { managingProductId } = useAppSelector(state => state.modalReducer);

  const product = products.find(
    product => product.id === managingProductId
  ) as IProduct;

  return product
}

export function useCurrentTasks() {
  const {tasksActive, tasksPending} = useAppSelector(state => state.tasksReducer)
  const {managingProductId } = useAppSelector(state => state.modalReducer);

  const activeTasks = tasksActive.filter(task => task.productId === managingProductId)
  const pendingTasks = tasksPending.filter(task => task.productId === managingProductId)

  return {activeTasks, pendingTasks}
}