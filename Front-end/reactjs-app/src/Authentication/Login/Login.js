import React from "react";
import axios from "axios";

import LoginHeader from "./LoginHeader"
import LoginBody from "./LoginBody"
import LoginFooter from "./LoginFooter"

function Login(){
    const submitInfo = (info) => {
        console.log(info)
        axios.post("http://localhost:8080/user/login", info)
            .then(response => {
                console.log("response: ", response.data)
            })
    }

    return(
        <div className="login">
            <LoginHeader />
            <LoginBody submitInfo={submitInfo}/>
            <LoginFooter />
        </div>
    )
}

export default Login;