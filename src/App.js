import React from "react";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router from "routing/router";
import LoginScreen from "views/LoginScreen";
import { Provider } from "react-redux";
import store from "redux/store";
import "./index.css";

function App() {
  const [user] = useAuthState(auth);

  console.log("MUA", user);

  return (
    <Provider store={store}>
      {user ? <Router user={user} /> : <LoginScreen auth={auth} />}
    </Provider>
  );
}

export default App;
