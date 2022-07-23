import { configureStore } from "@reduxjs/toolkit";
import gameSystemReducer from "./gameSystemReducer";

export default configureStore({
  reducer: {
    gameSystems: gameSystemReducer,
  },
});
