export interface ITasks {
  totalCreated: number,
  minProductionTime: number | null,
  tasksActive: ITaskActive[],
  tasksPending: ITaskPending[]
}

export interface ITaskActive extends ITaskPending {
  startedAtDay: number,
  profitPercent: number,
  expectedIncome: number
}

export interface ITaskPending {
  id?: number,
  productId: number,
  companyId: number,
  productionTime: number,
  priceModifier: number,
  salaryModifier: number,
  adLvlUp: number,
  costs: number,
}