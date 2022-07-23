import { createSlice } from "@reduxjs/toolkit";

export const characterClassesReducer = createSlice({
  name: "characterClasses",
  initialState: {
    classes: null,
    classesLabel: "",
    types: null,
    typesLabel: "",
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload.arr;
      state.classesLabel = action.payload.label;
    },
    setTypes: (state, action) => {
      state.types = action.payload.arr;
      state.typesLabel = action.payload.label;
    },
    unsetAllCharacterTypes: (state) => {
      state.classes = null;
      state.types = null;
    },
  },
});

export const { setClasses, setTypes, unsetAllCharacterTypes } =
  characterClassesReducer.actions;

export default characterClassesReducer.reducer;
