import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITaskActive, ITaskPending, ITasks } from "./task.interface";

const initialState: ITasks = {
  totalCreated: 0,
  minProductionTime: null,
  tasksActive: [],
  tasksPending: []
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTaskActive(state, action:PayloadAction<ITaskActive>) {
      state.totalCreated += 1
      const data:ITaskActive = {
        id: state.totalCreated,
        ...action.payload
      }  
      state.tasksActive = [...state.tasksActive, data]

      if (state.minProductionTime === null || state.minProductionTime > action.payload.productionTime) {
        state.minProductionTime = action.payload.productionTime;
      }
    },
    createTaskPending(state, action:PayloadAction<ITaskPending>) {
      state.totalCreated += 1
      const data:ITaskPending = {
        id: state.totalCreated,
        ...action.payload
      }  
      state.tasksPending = [...state.tasksPending, data]
    }
  },
})

export default taskSlice.reducer;