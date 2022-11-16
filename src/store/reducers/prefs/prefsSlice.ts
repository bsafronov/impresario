import { createSlice } from "@reduxjs/toolkit";
import { IPrefs } from "./prefs.interface";

const initialState: IPrefs = {
  name: '',
  difficulty: "medium",
}

export const PrefsSlice = createSlice({
  name: "prefs",
  initialState,
  reducers: {
    
  }
})

export default PrefsSlice.reducer;