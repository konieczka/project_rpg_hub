import { configureStore } from "@reduxjs/toolkit";
import gameSystemReducer from "./gameSystemReducer";
import playerCharacterReducer from "./playerCharacterReducer";

export default configureStore({
  reducer: {
    gameSystems: gameSystemReducer,
    playerCharacter: playerCharacterReducer,
  },
});
