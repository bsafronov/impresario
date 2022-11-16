import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRules } from "./rules.interface";

const initialState: IRules = {
  inflation: 0,
  gameDay: 1,
  createdAt: Date.now()
}

export const RulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setInflation(state, action:PayloadAction<number>) {
      state.inflation = +(action.payload / 365 * state.gameDay).toFixed(2);
    },
    setGameDay(state, action:PayloadAction) {
      const minutesAfterCreated = (Date.now() - state.createdAt) / 60000;
      state.gameDay = 1 + Math.floor(minutesAfterCreated);
    }
  }
})

export default RulesSlice.reducer;