import React, { useState } from "react";

import LoginBody from "./Login/LoginBody";
import SignUpBody from "./SignUp/SignUpBody";
import ChangePasswordBody from "./ChangePassword/ChangePasswordBody"
import Header from "./Header-Footer/Header";
import Footer from "./Header-Footer/Footer";
import ListWallets from "../Wallet/ListWallets"

import {
  BrowserRouter,
  Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import axios from "axios";

function Authentication() {
  // let match = useRouteMatch();
  let history = useHistory()
  const [state, setState] = useState({
    header: "",
    footer: "",
  });

  const submitLogin = (data) => {
    axios.post("http://localhost:8080/user/login", data).then((response) => {
      console.log(response.data);
      if (response.data.result !== null){
        // window.alert(response.data.result.id)
        history.push("/wallet/list/" + response.data.result.id) 
      }
      else{
        window.alert(response.data.message)
      }
    });
  };

  const submitSignUp = (data) => {
    axios.post("http://localhost:8080/user/signup", data).then((response) => {
      console.log(response.data);
      setState({
        header: state.header,
        footer: response.data.message,
      });
    });
  };

  const submitChangePassword = (data) => {
    axios.post("http://localhost:8080/user/changepassword", data).then((response) => {
      console.log(response.data);
      setState({
        header : state.header,
        footer : response.data.message,
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
    <BrowserRouter>
      <div>
        <div>
          <ul>
            <li>
              <Link to="/user/login">Login</Link>
            </li>
            <li>
              <Link to="/user/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/user/changepassword">Change Password</Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route exact path="/user/login">
            <Header header={state.header} />
            <LoginBody
              setHeaderAndFooter={setHeaderAndFooter}
              submitLogin={submitLogin}
            />
            <Footer footer={state.footer} />
          </Route>
          <Route exact path="/user/signup">
            <Header header={state.header} />
            <SignUpBody
              setHeaderAndFooter={setHeaderAndFooter}
              submitSignUp={submitSignUp}
            />
            <Footer footer={state.footer} />
          </Route>
          <Route exact path="/user/changepassword">
            <Header header={state.header} />
            <ChangePasswordBody
              setHeaderAndFooter={setHeaderAndFooter}
              submitChangePassword={submitChangePassword}
            />
            <Footer footer={state.footer} />
          </Route>
          <Route exact path="/wallet/list/:userId">
            <ListWallets />
          </Route>
          <Route exact path="/">Inside home page!</Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Authentication;
