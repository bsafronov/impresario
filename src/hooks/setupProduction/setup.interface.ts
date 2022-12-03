import { IProductCalculations } from "../productCalculations/productCalculations.interface";

export interface ISetupProduction {
  costs: number;
  calc: IProductCalculations;
  salary: number;
  managingProductId: number;
  managingCompanyId: number;
  gameDay: number;
}
