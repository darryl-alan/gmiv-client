import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import Logout from "./components/Logout";
import "./App.css";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={Logout} />
        <ProtectedRoute path="/" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
