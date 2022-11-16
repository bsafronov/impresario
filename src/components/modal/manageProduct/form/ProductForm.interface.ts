import { SetStateAction } from "react";
import { IProductCalculations } from "../../../../hooks/productCalculations/productCalculations.interface";

export interface IProductForm {
  calc: IProductCalculations,
  balance: number,
  costs: string,
  setCosts: (value:SetStateAction<string>) => void,
  salary: string,
  setSalary: (value:SetStateAction<string>) => void,
  addedValue: string,
  setAddedValue: (value:SetStateAction<string>) => void
}