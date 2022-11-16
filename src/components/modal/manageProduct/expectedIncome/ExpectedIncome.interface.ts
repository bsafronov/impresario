import { IProductExpected } from "../../../../hooks/productCalculations/productCalculations.interface"

export interface IExpectedIncome {
  calc: IProductExpected,
  isLoader: boolean
}

export interface IExpectedIncomeContent {
  text: string,
  value: number,
  sign?: string
}