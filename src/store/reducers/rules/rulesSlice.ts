import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRules, IRulesStatisticBy } from "./rules.interface";

const initialState: IRules = {
  inflation: 0,
  gameDay: 1,
  createdAt: Date.now(),
  statisticBy: "month",
};

export const rulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    setStateRules(state, action: PayloadAction<IRules | null>) {
      if (action.payload) {
        state.inflation = action.payload.inflation;
        state.gameDay = action.payload.gameDay;
        state.createdAt = action.payload.createdAt;
        state.statisticBy = action.payload.statisticBy;
      } else {
        state.inflation = initialState.inflation;
        state.gameDay = initialState.gameDay;
        state.createdAt = initialState.createdAt;
        state.statisticBy = initialState.statisticBy;
      }
    },
    setInflation(state, action: PayloadAction<number>) {
      state.inflation = +((action.payload / 365) * state.gameDay).toFixed(2);
    },
    setGameDay(state, action: PayloadAction) {
      const minutesAfterCreated = (Date.now() - state.createdAt) / 60000;
      state.gameDay = 1 + Math.floor(minutesAfterCreated);
    },
    setStatisticBy(state, action: PayloadAction<IRulesStatisticBy>) {
      state.statisticBy = action.payload;
    },
  },
});

export default rulesSlice.reducer;
