import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameSystemsDashboard from "views/GameSystemsDashboard";
import MainGameView from "views/MainGameView";

export const ROUTES = {
  mainDashboard: "/",
  mainGameView: "/ingame",
};

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.mainDashboard} element={<GameSystemsDashboard />} />
        <Route path={ROUTES.mainGameView} element={<MainGameView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
