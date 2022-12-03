import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, ITaskPendingToActive, ITasks } from "./task.interface";

const initialState: ITasks = {
  totalCreated: 0,
  tasksActive: [],
  tasksPending: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setStateTasks(state, action: PayloadAction<ITasks | null>) {
      if (action.payload) {
        state.totalCreated = action.payload.totalCreated;
        state.tasksActive = action.payload.tasksActive;
        state.tasksPending = action.payload.tasksPending;
      } else {
        state.totalCreated = initialState.totalCreated;
        state.tasksActive = initialState.tasksActive;
        state.tasksPending = initialState.tasksPending;
      }
    },
    createTaskActive(state, action: PayloadAction<ITask>) {
      state.totalCreated += 1;
      const data: ITask = {
        id: state.totalCreated,
        ...action.payload,
      };
      state.tasksActive = [...state.tasksActive, data];
    },
    createTaskPending(state, action: PayloadAction<ITask>) {
      state.totalCreated += 1;
      const data: ITask = {
        id: state.totalCreated,
        ...action.payload,
      };
      state.tasksPending = [...state.tasksPending, data];
    },
    finishActiveTasks(state, action: PayloadAction<ITask[]>) {
      state.tasksActive = action.payload;
    },
    pendingToActive(state, action: PayloadAction<ITaskPendingToActive>) {
      const managingTask = state.tasksPending.find(
        task => task.id === action.payload.id
      ) as ITask;
      state.tasksPending = state.tasksPending.filter(
        task => task.id !== action.payload.id
      );
      state.tasksActive = [...state.tasksActive, managingTask];
    },
  },
});

export default taskSlice.reducer;
