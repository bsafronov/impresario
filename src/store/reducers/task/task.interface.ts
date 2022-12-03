export interface ITasks {
  totalCreated: number;
  tasksActive: ITask[];
  tasksPending: ITask[];
}

export interface ITask {
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
}

export interface ITaskPendingToActive {
  id: number;
}
