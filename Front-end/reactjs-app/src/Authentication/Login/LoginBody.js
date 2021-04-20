import React, { useEffect, useState } from "react"
import { Button, Container, Typography } from "@material-ui/core"
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
// function LoginBody(props) {

//     return (
//         <div>
//             <Container maxWidth="sm">
//                 <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
//                     Login Page
//               </Typography>
//                 <form className="w3-container w3-card-4" onSubmit={submitLogin}>
//                     <p>
//                         <input
//                             type="text"
//                             className="w3-input"
//                             placeholder="User name"
//                             value={state.user_name}
//                             onChange={onChangeUsername} required />
//                     </p>
//                     <p>
//                         <input
//                             type="text"
//                             className="w3-input"
//                             placeholder="Password"
//                             value={state.password}
//                             onChange={onChangePassword} required />
//                     </p>

//                     <input
//                         className="w3-right w3-button w3-section w3-teal w3-ripple"
//                         type="submit"
//                         value="Login" />
//                 </form>
//             </Container>
//         </div>
//     )
// }


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
    })

    const onChangeUsername = (e) => {
        setState({
            user_name: e.target.value,
            password: state.password,
        })
    }

    const onChangePassword = (e) => {
        setState({
            user_name: state.user_name,
            password: e.target.value,
        })
    }

    const submitLogin = (e) => {
        e.preventDefault();
        props.submitLogin(state);
        // setState({
        //     user_name : "",
        //     password : "",
        // })
    }

    useEffect(() => {
        const title = {
            header: "Login",
            footer: "Footer of Login"
        }
        props.setHeaderAndFooter(title)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
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
                            <Link href="/user/signup" variant="body2">
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