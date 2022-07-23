import { createSlice } from "@reduxjs/toolkit";

export const playerCharacterReducer = createSlice({
  name: "activeCharacter",
  initialState: {
    isPlayerCharacterSelected: false,
    activeCharacter: null,
  },
  reducers: {
    setActiveCharacter: (state, action) => {
      state.activeCharacter = action.payload;
      state.isSystemSelected = true;
    },
    resetActiveCharacter: (state) => {
      state.activeCharacter = null;
      state.isSystemSelected = false;
    },
  },
});

export const { setActiveCharacter, resetActiveCharacter } =
  playerCharacterReducer.actions;

export default playerCharacterReducer.reducer;
