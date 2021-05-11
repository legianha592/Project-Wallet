import React, { useState, useEffect } from "react";

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
import { isLoggedIn, setUser } from "../utils/UserManager";
import { myHistory } from '../App';
import { setCurrentWalletId } from "../utils/WalletManager";


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
const Authentication = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    header: "",
    footer: "",
  });

  const submitLogin = (data) => {
    axios.post(USER_ROOT_URL + "/login", data).then(function (response) {
      console.log(response.data)
      let user = response.data.result
      if (user != null) {
        // if (response.data.result.remember_me){
        //   setUser(response.data.result)
        // }
        setUser(user)
        console.log("user", user);
        console.log("wallet", user.list_wallet)
        if (user.list_wallet[0] !== undefined) {
          if (user.list_wallet[0].id !== undefined){
            setCurrentWalletId(user.list_wallet[0].id)
          }
        }
        myHistory.push("/dashboard/records")
      }
      else {
        window.alert(response.data.message)
      }
    });
  };

  const submitSignUp = (data) => {
    axios.post(USER_ROOT_URL + "/signup", data).then((response) => {
      console.log(response.data);
      let user = response.data.result;
      if (user != null){
        setUser(user)
        console.log("user", user);
        console.log("wallet", user.list_wallet)
        if (user.list_wallet[0] !== undefined) {
          if (user.list_wallet[0].id !== undefined){
            setCurrentWalletId(user.list_wallet[0].id)
          }
        }
        myHistory.push("/dashboard/records")
      }
      else{
        window.alert(response.data.message)
      }
    });
  };

  useEffect(() => {
    const checkLogin = async () => {
      let islogin = await isLoggedIn()
      if (islogin) {
        console.log(islogin)
        myHistory.push("/dashboard/records")
      }
    }

    checkLogin()
  }, [])
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