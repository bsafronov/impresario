import { ICompanies } from "../../../store/reducers/company/company.interface";
import { IModals } from "../../../store/reducers/modal/modal.interface";
import { INews } from "../../../store/reducers/news/news.interface";
import { IOperations } from "../../../store/reducers/operation/operation.interface";
import { IPlaces } from "../../../store/reducers/place/place.interface";
import { IPrefs } from "../../../store/reducers/prefs/prefs.interface";
import { IProducts } from "../../../store/reducers/product/product.interface";
import { IRules } from "../../../store/reducers/rules/rules.interface";
import { ITasks } from "../../../store/reducers/task/task.interface";

export interface ISynchronizerData {
  company: ICompanies;
  modal: IModals;
  news: INews;
  operation: IOperations;
  place: IPlaces;
  prefs: IPrefs;
  product: IProducts;
  rules: IRules;
  tasks: ITasks;
}
