import React, { useState } from "react";

import LoginBody from "./Login/LoginBody";
import SignUpBody from "./SignUp/SignUpBody";
import Header from "./Header-Footer/Header";
import Footer from "./Header-Footer/Footer";

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

function Authentication() {
  let match = useRouteMatch();

  const [state, setState] = useState({
    header: "",
    footer: "",
  });

  const setHeaderAndFooter = (title) => {
    setState({
      header: title.header,
      footer: title.footer,
    });
  };

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`${match.url}/login`}>Login</Link>
            </li>
            <li>
              <Link to={`${match.url}/signup`}>Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={`${match.path}/login`}>
            <Header header={state.header} />
            <LoginBody setHeaderAndFooter={setHeaderAndFooter} />
            <Footer footer={state.footer} />
          </Route>
          <Route path={`${match.path}/signup`}>
            <Header header={state.header} />
            <SignUpBody setHeaderAndFooter={setHeaderAndFooter} />
            <Footer footer={state.footer} />
          </Route>
          <Route path={match.path}>Inside home page!</Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Authentication;
