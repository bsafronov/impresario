import { ICompanyMoney } from "../../store/reducers/company/company.interface";
import { IOperationForm } from "../../store/reducers/operation/operation.interface";
import { IProductSetStatus } from "../../store/reducers/product/product.interface";
import { ITask } from "../../store/reducers/task/task.interface";
import { randomProduction } from "./randomProduction";
import { ISetupProduction } from "./setup.interface";

export function setupActive(props: ISetupProduction) {
  const { expectedIncome, randomProductionPercent, randomProductionTime } =
    randomProduction(props.calc, props.costs);

  const taskData: ITask = {
    productId: props.managingProductId,
    companyId: props.managingCompanyId,
    finishedByDay: props.gameDay + randomProductionTime,
    costs: props.costs,
    salary: props.salary,
    adLvlUp: props.calc.finalState.adLvlUp,
    priceModifier: props.calc.modifier.priceModifier,
    salaryModifier: props.calc.modifier.salaryModifier,
    profitPercent: randomProductionPercent,
    expectedIncome: expectedIncome,
  };

  const moneyData: ICompanyMoney = {
    companyId: props.managingCompanyId,
    amount: props.costs + props.salary,
  };

  const productStatusData: IProductSetStatus = {
    id: props.managingProductId,
    status: "in progress",
  };

  const operationData: IOperationForm = {
    gameDay: props.gameDay,
    productId: props.managingProductId,
    companyId: props.managingCompanyId,
    amount: props.costs + props.salary,
    type: "costs",
  };

  return { taskData, moneyData, productStatusData, operationData };
}
