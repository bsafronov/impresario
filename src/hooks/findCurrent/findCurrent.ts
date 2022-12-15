import { useMemo } from "react";
import { ICompany } from "../../store/reducers/company/company.interface";
import { IProduct } from "../../store/reducers/product/product.interface";
import { useAppSelector } from "../redux";

export function useCurrentCompany() {
  const { companies } = useAppSelector(state => state.companyReducer);

  const { managingCompanyId } = useAppSelector(state => state.modalReducer);
  const company = useMemo(
    () =>
      companies.find(company => company.id === managingCompanyId) as ICompany,
    [managingCompanyId, companies]
  );

  return company;
}

export function useCurrentProduct() {
  const { products } = useAppSelector(state => state.productReducer);
  const { managingProductId } = useAppSelector(state => state.modalReducer);

  const product = useMemo(
    () =>
      products.find(product => product.id === managingProductId) as IProduct,
    [products, managingProductId]
  );

  return product;
}

export function useCurrentTasks() {
  const { tasks } = useAppSelector(state => state.tasksReducer);
  const { managingProductId } = useAppSelector(state => state.modalReducer);

  const activeTasks = useMemo(
    () =>
      tasks.filter(
        task => task.productId === managingProductId && task.type === "active"
      ),
    [managingProductId, tasks]
  );

  const pendingTasks = useMemo(
    () =>
      tasks.filter(
        task => task.productId === managingProductId && task.type === "pending"
      ),
    [managingProductId, tasks]
  );

  return { activeTasks, pendingTasks };
}
