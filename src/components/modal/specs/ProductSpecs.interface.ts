import { ICompany } from "../../../store/reducers/company/company.interface";
import { IProduct } from "../../../store/reducers/product/product.interface";

export interface IProductSpecs {
  company: ICompany;
  product: IProduct;
}
