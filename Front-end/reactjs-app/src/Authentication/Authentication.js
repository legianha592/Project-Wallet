import React, { useState } from "react";

import LoginBody from "./Login/LoginBody";
import SignUpBody from "./SignUp/SignUpBody";
import ChangePasswordBody from "./ChangePassword/ChangePasswordBody"
import Header from "./Header-Footer/Header";
import Footer from "./Header-Footer/Footer";
import { USER_ROOT_URL } from "../utils/constants";
import {
  Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import ListRecords from "../Record/ListRecords";
import { makeStyles } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));
export default function Authentication(props) {
  const classes = useStyles()
  let history = useHistory()
  const [state, setState] = useState({
    header: "",
    footer: "",
  });

  const submitLogin = (data) => {
    axios.post(USER_ROOT_URL + "/login", data).then((response) => {
      console.log(response.data)
      if (response.data.result != null) {
        history.push("/wallet/list/" + response.data.result.id);
      }
      else {
        window.alert(response.data.message)
      }
    });
  };

  const submitSignUp = (data) => {
    axios.post(USER_ROOT_URL + "/signup", data).then((response) => {
      console.log(response.data);
      setState({
        header: state.header,
        footer: response.data.message,
      });
    });
  };

  const submitChangePassword = (data) => {
    axios.post(USER_ROOT_URL + "/changepassword", data).then((response) => {
      console.log(response.data);
      setState({
        header: state.header,
        footer: response.data.message,
      })
    })
  }

  const setHeaderAndFooter = (title) => {
    setState({
      header: title.header,
      footer: title.footer,
    });
  };

  return (
    <Router history={history}>
      <>
        <div className={classes.root}>
          <Switch>
            <Route exact path="/user/login">
              <Header header={state.header} />
            </Route>
            <Route exact path="/user/signup">
              <Header header={state.header} />
            </Route>
            <Route exact path="/user/changepassword">
              <Header header={state.header} />
            </Route>
          </Switch>

          <main className={classes.main}>
            <Switch>
              <Route exact path="/user/login">
                <LoginBody setHeaderAndFooter={setHeaderAndFooter} submitLogin={submitLogin} />
              </Route>
              <Route exact path="/user/signup">
                <SignUpBody setHeaderAndFooter={setHeaderAndFooter} submitSignUp={submitSignUp} />
              </Route>
              <Route exact path="/user/changepassword">
                <ChangePasswordBody setHeaderAndFooter={setHeaderAndFooter} submitChangePassword={submitChangePassword} />
              </Route>
              <Route exact path="/wallet/list/:userId"> <Dashboard /></Route>
              <Route exact path="/record/list/:walletId">
                <ListRecords />
              </Route>
              <Route exact path="/dashboard"> <Dashboard /> </Route>
            </Switch>
          </main>
          <Footer footer={state.footer} />
        </div>
      </>
    </Router>
  );
}
