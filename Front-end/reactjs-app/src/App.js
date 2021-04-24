import React from "react";
import { Redirect, Route, Router, Switch, useHistory } from "react-router";
import { createBrowserHistory } from 'history'
import Authentication from "./Authentication/Authentication";
import Dashboard from "./Dashboard/Dashboard";

export const myHistory = createBrowserHistory()

function App() {

  const openDashboard = () => {
    myHistory.push("/dashboard")
  }

  return (
    <Router history={myHistory}>
      <Switch>
        <Redirect exact from="/" to="/user/login" />
        <Route path="/user" > <Authentication onLoginSuccess={openDashboard} history={myHistory} /></Route>
        <Route path="/dashboard" > <Dashboard /></Route>
      </Switch>
    </Router>
  );
}

export default App;