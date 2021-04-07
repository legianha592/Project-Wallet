import React, {useState} from "react";

function SignUpBody(props){
    const [state, setState] = useState({
        user_name : "",
        password : "",
        confirm_password: ""
    })

    const onChangeUsername = (e) => {
        setState({
            user_name : e.target.value,
            password : state.password,
            confirm_password : state.confirm_password
        })
    }

    const onChangePassword = (e) => {
        setState({
            user_name : state.user_name,
            password : e.target.value,
            confirm_password : state.confirm_password
        })
    }

    const onChangeConfirmPassword = (e) => {
        setState({
            user_name : state.user_name,
            password : state.password,
            confirm_password : e.target.value
        })
    }

    const submitInfo = (e) => {
        e.preventDefault();
        props.submitInfo(state);
        setState({
            user_name : "",
            password : "",
            confirm_password: ""
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
                <input type="text"
                    placeholder="Confirm Password"
                    value={state.confirm_password}
                    onChange={onChangeConfirmPassword}/>
                <input type="submit"
                    value="Submit"/>
            </form>
        </div>
    )
}

export default SignUpBody;