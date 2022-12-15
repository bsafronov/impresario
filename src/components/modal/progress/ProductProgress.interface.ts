import { IProductCalculations } from "../../../hooks/productCalculations/productCalculations.interface";

export interface IProductProgress {
  costs: number;
  salary: number;
  calc: IProductCalculations;
  isLoader: boolean;
}

export interface IProductProgressContent {
  property: string;
  prompt: string | string[];
  value: string | number;
}
