import React, {useEffect, useState} from "react"

function LoginBody(props){
    const [state, setState] = useState({
        user_name : "",
        password : "",
    })

    const onChangeUsername = (e) => {
        setState({
            user_name : e.target.value,
            password : state.password,
        })
    }

    const onChangePassword = (e) => {
        setState({
            user_name : state.user_name,
            password : e.target.value,
        })
    }

    const submitLogin = (e) => {
        e.preventDefault();
        props.submitLogin(state);
        setState({
            user_name : "",
            password : "",
        })
    }

    useEffect(() => {
        const title = {
            header : "Login",
            footer : "Footer of Login"
        }
        props.setHeaderAndFooter(title)
    }, [])

    return(
        <div className="login-body">
            <form onSubmit={submitLogin}>
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

export default LoginBody;