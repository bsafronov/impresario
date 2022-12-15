import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, ITasks } from "./task.interface";

const initialState: ITasks = {
  totalCreated: 0,
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setStateTasks(state, action: PayloadAction<ITasks | null>) {
      if (action.payload) {
        state.totalCreated = action.payload.totalCreated;
        state.tasks = action.payload.tasks;
      } else {
        state.totalCreated = initialState.totalCreated;
        state.tasks = initialState.tasks;
      }
    },
    createTask(state, action: PayloadAction<ITask>) {
      state.totalCreated += 1;
      const data: ITask = {
        id: state.totalCreated,
        ...action.payload,
      };
      state.tasks = [...state.tasks, data];
    },
    deleteTaskById(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setTaskActiveById(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.map(task => {
        if (task.id === action.payload) {
          task.type = "active";
        }
        return task;
      });
    },
  },
});

export default taskSlice.reducer;
