import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOperation, IOperationForm, IOperations } from "./operation.interface";

export const initialState: IOperations = {
  totalCreated: 0,
  operations: [],
};

export const operationSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {
    setStateOperations(state, action: PayloadAction<IOperations | null>) {
      if (action.payload) {
        state.totalCreated = action.payload.totalCreated;
        state.operations = action.payload.operations;
      } else {
        state.totalCreated = initialState.totalCreated;
        state.operations = initialState.operations;
      }
    },
    addOperation(state, action: PayloadAction<IOperationForm>) {
      state.totalCreated += 1;
      const data: IOperation = {
        id: state.totalCreated,
        ...action.payload,
      };
      state.operations = [data, ...state.operations];
    },
  },
});

export default operationSlice.reducer;
