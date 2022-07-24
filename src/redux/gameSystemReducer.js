import { createSlice } from "@reduxjs/toolkit";

const systemMetadataEmptyState = {
  skills: null,
  statusEffects: null,
  perks: null,
  inventory: null,
  nonPlayableCharacters: null,
  characterClasses: null,
};

export const gameSystemSlice = createSlice({
  name: "activeSystem",
  initialState: {
    isSystemSelected: false,
    activeSystem: null,
    metadataSet: false,
    activeSystemMetadata: systemMetadataEmptyState,
  },
  reducers: {
    setActiveSystem: (state, action) => {
      state.activeSystem = action.payload;
      state.isSystemSelected = true;
    },
    resetActiveSystem: (state) => {
      state.activeSystem = null;
      state.isSystemSelected = false;
      state.metadataSet = false;
      state.activeSystemMetadata = systemMetadataEmptyState;
    },
    setMetadata: (state, action) => {
      state.activeSystemMetadata[action.payload.type] = action.payload.content;
      state.metadataSet = true;
    },
  },
});

export const { setActiveSystem, resetActiveSystem, setMetadata } =
  gameSystemSlice.actions;

export default gameSystemSlice.reducer;
