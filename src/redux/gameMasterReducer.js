import { createSlice } from "@reduxjs/toolkit";

export const gameMasterReducer = createSlice({
  name: "gameMaster",
  initialState: {
    isPlayerLoggedInAsGm: false,
  },
  reducers: {
    setPlayerAsGameMaster: (state) => {
      state.isPlayerLoggedInAsGm = true;
    },
    unsetPlayerAsGameMaster: (state) => {
      state.isPlayerLoggedInAsGm = false;
    },
  },
});

export const { setPlayerAsGameMaster, unsetPlayerAsGameMaster } =
  gameMasterReducer.actions;

export default gameMasterReducer.reducer;
