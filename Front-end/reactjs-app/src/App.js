import React from "react"
import {BrowserRouter, Switch, Route } from "react-router-dom"

import SignUp from "./Authentication/SignUp/SignUp"
import Login from "./Authentication/Login/Login"

function App(){
    return(
        <div>
            <Switch>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    Home!!!
                </Route>
            </Switch>
        </div>
    )
}

export default App;