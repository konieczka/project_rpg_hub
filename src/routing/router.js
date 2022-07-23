import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameSystemsDashboard from "views/GameSystemsDashboard";

export const ROUTES = {
  mainDashboard: "/",
};

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.mainDashboard} element={<GameSystemsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
