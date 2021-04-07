import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";

import SignUpHeader from "./SignUpHeader"
import SignUpBody from "./SignUpBody"
import SignUpFooter from "./SignUpFooter"

function SignUp(){
    const [state, setState] = useState("Footer")

    let history = useHistory();

    const handleResponse = (response) => {
        console.log("response: ", response.data);
        if (response.data.result !== null){
            history.push("/login")
        }
        else{
            setState(response.data.message);
        }
    }

    const submitInfo = (info) => {
        console.log(info)
        axios.post("http://localhost:8080/user/signup", info)
            .then(response => {
                handleResponse(response)
            })
    }

    return(
        <div className="signup">
            <SignUpHeader />
            <SignUpBody submitInfo={submitInfo}/>
            <SignUpFooter footer={state}/>
        </div>
    )
}

export default SignUp;