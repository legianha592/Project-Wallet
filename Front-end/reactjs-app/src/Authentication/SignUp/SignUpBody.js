import React, { useState } from "react";
import { Button, Container, Typography } from "@material-ui/core"
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';


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

export default function SignUpBody(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        user_name: "",
        password: "",
        confirm_password: ""
    })

    const onChangeUsername = (e) => {
        setState({
            user_name: e.target.value,
            password: state.password,
            confirm_password: state.confirm_password
        })
    }

    const onChangePassword = (e) => {
        setState({
            user_name: state.user_name,
            password: e.target.value,
            confirm_password: state.confirm_password
        })
    }

    const onChangeConfirmPassword = (e) => {
        setState({
            user_name: state.user_name,
            password: state.password,
            confirm_password: e.target.value
        })
    }

    const submitSignUp = (e) => {
        e.preventDefault();
        props.submitSignUp(state);
        setState({
            user_name: "",
            password: "",
            confirm_password: ""
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={submitSignUp} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Confirm Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={state.confirm_password}
                        onChange={onChangeConfirmPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link to="/user/login" variant="body2">
                                {"Already have account? Sign In"}
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