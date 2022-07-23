import { BrowserRouter, Routes, Route } from "react-router-dom";
import SystemSelectionDashboard from "views/SystemSelectionDashboard";
import MainGameView from "views/MainGameView";
import CharacterCreationScreen from "views/CharacterCreationScreen";

export const ROUTES = {
  systemSelectionDashboard: "/",
  mainGameView: "/ingame",
  characterCreation: "/character-creator",
};

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.systemSelectionDashboard}
          element={<SystemSelectionDashboard />}
        />
        <Route
          path={ROUTES.characterCreation}
          element={<CharacterCreationScreen />}
        />
        <Route path={ROUTES.mainGameView} element={<MainGameView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
