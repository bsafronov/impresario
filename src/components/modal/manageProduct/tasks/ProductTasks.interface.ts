import { ITaskActive, ITaskPending } from "../../../../store/reducers/task/task.interface";

export interface IProductTasks {
  tasks: IProductTasksTypes
}

interface IProductTasksTypes {
  activeTasks: ITaskActive[],
  pendingTasks: ITaskPending[]
}