import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ITaskActive,
  ITaskPending,
  ITaskPendingToActive,
  ITasks,
} from "./task.interface";

const initialState: ITasks = {
  totalCreated: 0,
  minProductionTime: null,
  tasksActive: [],
  tasksPending: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTaskActive(state, action: PayloadAction<ITaskActive>) {
      state.totalCreated += 1;
      const data: ITaskActive = {
        id: state.totalCreated,
        ...action.payload,
      };
      state.tasksActive = [...state.tasksActive, data];
    },
    createTaskPending(state, action: PayloadAction<ITaskPending>) {
      state.totalCreated += 1;
      const data: ITaskPending = {
        id: state.totalCreated,
        ...action.payload,
      };
      state.tasksPending = [...state.tasksPending, data];
    },
    finishActiveTasks(state, action: PayloadAction<ITaskActive[]>) {
      state.tasksActive = action.payload;
    },
    pendingToActive(state, action: PayloadAction<ITaskPendingToActive>) {
      const managingTask = state.tasksPending.find(
        task => task.id === action.payload.id
      ) as ITaskPending;
      const taskData: ITaskActive = {
        ...managingTask,
        profitPercent: action.payload.profitPercent,
        startedAtDay: action.payload.startedAtDay,
      };
      state.tasksPending = state.tasksPending.filter(
        task => task.id !== action.payload.id
      );
      state.tasksActive = [...state.tasksActive, taskData];
    },
  },
});

export default taskSlice.reducer;
