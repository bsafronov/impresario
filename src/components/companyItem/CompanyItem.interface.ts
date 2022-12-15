import { ICompany } from "../../store/reducers/company/company.interface";
import { IOperation } from "../../store/reducers/operation/operation.interface";

export interface ICompanyItem {
  company: ICompany;
  operations: IOperation[];
}
