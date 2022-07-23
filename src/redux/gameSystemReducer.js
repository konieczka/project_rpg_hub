import { createSlice } from "@reduxjs/toolkit";

export const gameSystemSlice = createSlice({
  name: "activeSystem",
  initialState: {
    isSystemSelected: false,
    activeSystem: null,
  },
  reducers: {
    setActiveSystem: (state, action) => {
      state.activeSystem = action.payload;
      state.isSystemSelected = true;
    },
    resetActiveSystem: (state) => {
      state.activeSystem = null;
      state.isSystemSelected = false;
    },
  },
});

export const { setActiveSystem, resetActiveSystem } = gameSystemSlice.actions;

export default gameSystemSlice.reducer;
