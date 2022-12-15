import { ITask } from "../../store/reducers/task/task.interface";
import { IProductCalculations } from "../productCalculations/productCalculations.interface";

export interface ISetupRandom {
  costs: number;
  calc: IProductCalculations;
  tasks: ITask[];
  companyAdLvl: number;
}
