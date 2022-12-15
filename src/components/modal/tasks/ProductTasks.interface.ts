import { ITask } from "../../../store/reducers/task/task.interface";

export interface IProductTasks {
  tasks: IProductTasksTypes;
}

interface IProductTasksTypes {
  activeTasks: ITask[];
  pendingTasks: ITask[];
}
