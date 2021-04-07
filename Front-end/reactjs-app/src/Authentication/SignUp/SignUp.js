import React from "react";
import axios from "axios";

import SignUpHeader from "./SignUpHeader"
import SignUpBody from "./SignUpBody"
import SignUpFooter from "./SignUpFooter"

function SignUp(){
    const submitInfo = (info) => {
        console.log(info)
        axios.post("http://localhost:8080/user/signup", info)
            .then(response => {
                console.log("response: ", response.data)
            })
    }

    return(
        <div className="signup">
            <SignUpHeader />
            <SignUpBody submitInfo={submitInfo}/>
            <SignUpFooter />
        </div>
    )
}

export default SignUp;