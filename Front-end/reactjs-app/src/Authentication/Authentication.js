import React, { useState } from "react";

import LoginBody from "./Login/LoginBody";
import SignUpBody from "./SignUp/SignUpBody";
import Header from "./Header-Footer/Header";
import Footer from "./Header-Footer/Footer";
import { USER_ROOT_URL } from "../utils/constants";
import {
  Route,
} from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import Cookie from 'universal-cookie'


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
const Authentication = (props) => {
  const classes = useStyles()
  const cookie = new Cookie()
  const [state, setState] = useState({
    header: "",
    footer: "",
  });

  const submitLogin = (data) => {
    axios.post(USER_ROOT_URL + "/login", data).then((response) => {
      console.log(response.data)
      if (response.data.result != null) {
        cookie.set("user", response.data.result)
        props.history.push("/dashboard")
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
  console.log("haha")
  return (
    <>
      <div className={classes.root}>
        <Header header={state.header} />
        <main className={classes.main}>
          <Route exact path="/user/login">
            <LoginBody submitLogin={submitLogin} />
          </Route>
          <Route exact path="/user/signup">
            <SignUpBody submitSignUp={submitSignUp} />
          </Route>
        </main>
        <Footer footer={state.footer} />
      </div>
    </>
  );
}
export default Authentication