import React from "react";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router from "routing/router";
import "./index.css";
import LoginScreen from "views/LoginScreen";

function App() {
  const [user] = useAuthState(auth);

  return user ? <Router user={user} /> : <LoginScreen auth={auth} />;
}

export default App;
