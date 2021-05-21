import React, { useState } from "react"
import { Button, Container, Typography } from "@material-ui/core"
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function LoginBody(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        user_name: "",
        password: "",
        remember_me: false
    })

    const onChangeUsername = (e) => {
        setState({
            user_name: e.target.value,
            password: state.password,
            remember_me: state.remember_me,
        })
    }

    const onChangePassword = (e) => {
        setState({
            user_name: state.user_name,
            password: e.target.value,
            remember_me: state.remember_me
        })
    }

    const onChangeRememberMe = (e) => {
        setState({
            user_name: state.user_name,
            password: state.password,
            remember_me: !state.remember_me
        })
    }

    const submitLogin = (e) => {
        e.preventDefault();
        console.log(state)
        props.submitLogin(state);
        // setState({
        //     user_name : "",
        //     password : "",
        // })
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={submitLogin} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User name"
                        name="username"
                        autoComplete="username"
                        value={state.user_name}
                        onChange={onChangeUsername}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={state.password}
                        onChange={onChangePassword}
                    />
                    <FormControlLabel
                        control={<Checkbox value={state.remember_me} color="primary" onChange={onChangeRememberMe} />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log in
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link to="/user/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
                <Copyright />
            </Box> */}
        </Container>
    );
}