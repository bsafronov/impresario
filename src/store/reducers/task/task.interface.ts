export interface ITasks {
  totalCreated: number;
  tasks: ITask[];
}

export interface ITask {
  startedByDay: number;
  finishedByDay: number;
  id?: number;
  productId: number;
  companyId: number;
  priceModifier: number;
  salaryModifier: number;
  adLvlUp: number;
  costs: number;
  salary: number;
  expectedIncome: number;
  profitPercent: number;
  type: ITaskType;
}

export type ITaskType = "active" | "pending";
