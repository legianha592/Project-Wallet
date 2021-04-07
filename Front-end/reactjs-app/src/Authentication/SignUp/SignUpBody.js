import React, {useState} from "react";

function SignUpBody(props){
    const [state, setState] = useState({
        user_name : "",
        password : "",
    })

    const onChangeUsername = (e) => {
        setState({
            user_name : e.target.value,
            password : state.password
        })
    }

    const onChangePassword = (e) => {
        setState({
            user_name : state.user_name,
            password : e.target.value
        })
    }

    const submitInfo = (e) => {
        e.preventDefault();
        props.submitInfo(state);
        setState({
            user_name : "",
            password : ""
        })
    }

    return(
        <div className="signup-body">
            <form onSubmit={submitInfo}>
                <input type="text"
                    placeholder="User name"
                    value={state.user_name}
                    onChange={onChangeUsername}/>
                <input type="text"
                    placeholder="Password"
                    value={state.password}
                    onChange={onChangePassword}/>
                <input type="submit"
                    value="Submit"/>
            </form>
        </div>
    )
}

export default SignUpBody;