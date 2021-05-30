import { Redirect, Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Authentication from "./Authentication/Authentication";
import Dashboard from "./Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const myHistory = createBrowserHistory();

function App() {
  return (
    <Router history={myHistory}>
      <Switch>
        <Redirect exact from="/" to="/user/login" />
        <Route path="/user">
          {" "}
          <Authentication />
        </Route>
        <Route path="/dashboard">
          {" "}
          <Dashboard />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
