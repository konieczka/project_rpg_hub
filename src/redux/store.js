import { configureStore } from "@reduxjs/toolkit";
import gameMasterReducer from "./gameMasterReducer";
import gameSystemReducer from "./gameSystemReducer";
import playerCharacterReducer from "./playerCharacterReducer";
import sessionsReducer from "./sessionsReducer";

export default configureStore({
  reducer: {
    gameSystems: gameSystemReducer,
    playerCharacter: playerCharacterReducer,
    gameMaster: gameMasterReducer,
    sessions: sessionsReducer,
  },
});
