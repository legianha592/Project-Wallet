import React, { useState } from "react";

import LoginBody from "./Login/LoginBody";
import SignUpBody from "./SignUp/SignUpBody";
import ChangePasswordBody from "./ChangePassword/ChangePasswordBody"
import Header from "./Header-Footer/Header";
import Footer from "./Header-Footer/Footer";

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import axios from "axios";

function Authentication() {
  let match = useRouteMatch();

  const [state, setState] = useState({
    header: "",
    footer: "",
  });

  const submitLogin = (data) => {
    axios.post("http://localhost:8080/user/login", data).then((response) => {
      console.log(response.data);
      setState({
        header: state.header,
        footer: response.data.message,
      });
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
          <Route path="/user/login">
            <Header header={state.header} />
            <LoginBody
              setHeaderAndFooter={setHeaderAndFooter}
              submitLogin={submitLogin}
            />
            <Footer footer={state.footer} />
          </Route>
          <Route path="/user/signup">
            <Header header={state.header} />
            <SignUpBody
              setHeaderAndFooter={setHeaderAndFooter}
              submitSignUp={submitSignUp}
            />
            <Footer footer={state.footer} />
          </Route>
          <Route path="/user/changepassword">
            <Header header={state.header} />
            <ChangePasswordBody
              setHeaderAndFooter={setHeaderAndFooter}
              submitChangePassword={submitChangePassword}
            />
            <Footer footer={state.footer} />
          </Route>
          <Route path="/">Inside home page!</Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Authentication;
