import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route } from 'react-router';
import ListRecord from './Record/ListRecords';
import Home from './HomePage/Home'
import Report from './HomePage/Report';
import MainAppBar from './View/AppBar';
import { useEffect } from 'react';
import { myHistory } from '../App';
import { isLoggedIn } from '../utils/UserManager';
import FormCreateWallet from './Form/FormCreateWallet';
import FormCreateRecord from './Form/FormCreateRecord'

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
        <Route path="/dashboard/report"><Report /></Route>
        <Route path="/dashboard/createWallet"><FormCreateWallet /></Route>
        <Route path="/dashboard/createRecord"><FormCreateRecord /></Route>
        <Route path="/dashboard/records"><ListRecord /></Route>
      </main>
    </div>
  );
}
