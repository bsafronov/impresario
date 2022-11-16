export interface IProductCalculations {
  expected: IProductExpected,
  modifier: IProductModifier,
  conditions: IProductConditions,
  finalState: IProductFinalState,
  func: IProductFunc,
}

export interface IProductExpected {
  recommendedSalary: number,
  workersEfficiency: number,
  beforeTaxes: number,
  afterTaxes: number,
  profit: number,
  netProfit: number
}

export interface IProductModifier {
  priceModifier: number,
  salaryModifier: number
}

export interface IProductConditions {
  minCoefficient: number,
  minSalary: number,
  productionMaxPercent: number,
  maxAddedValue: number,
  maxCosts: number,
  minCosts:number,
}

export interface IProductFinalState {
  productionTime: number,
  adLvlUp: number,
  profitChance: number
}

export interface IProductFunc {
  isValid: () => boolean
}