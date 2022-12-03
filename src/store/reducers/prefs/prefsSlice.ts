import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPrefs } from "./prefs.interface";

const initialState: IPrefs = {
  name: "",
  difficulty: "medium",
};

export const prefsSlice = createSlice({
  name: "prefs",
  initialState,
  reducers: {
    setStatePrefs(state, action: PayloadAction<IPrefs | null>) {
      if (action.payload) {
        state.name = action.payload.name;
        state.difficulty = action.payload.difficulty;
      } else {
        state.name = initialState.name;
        state.difficulty = initialState.difficulty;
      }
    },
  },
});

export default prefsSlice.reducer;
