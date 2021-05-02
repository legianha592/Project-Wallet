import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { Route } from 'react-router';
import ListRecord from './HomePage/ListRecords';
import Home from './HomePage/Home'
import Report from './HomePage/Report';
import MainAppBar from './View/AppBar';
import { useEffect } from 'react';
import { myHistory } from '../App';
import { getUser, isLoggedIn } from '../utils/UserManager';
import FormCreateWallet from './Form/FormCreateWallet';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  useEffect(() => {
    const checkLogin = async () => {
      let isLogin = await isLoggedIn()
      if (!isLogin) {
        myHistory.push("/user/login")
      }
    }

    checkLogin()
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainAppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Route path="/dashboard/home"><Home /></Route>
        <Route path="/dashboard/records"><ListRecord /></Route>
        <Route path="/dashboard/report"><Report /></Route>
        <Route path="/dashboard/createWallet"><FormCreateWallet /></Route>
      </main>
    </div>
  );
}
