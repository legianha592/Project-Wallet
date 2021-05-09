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
import FormCreateRecord from './Form/FormCreateRecord';
import { getCurrentWalletId } from '../utils/WalletManager';
import { getRecords } from '../services/RecordService';
import { getWallets } from '../services/WalletService';
import ListWallets from './Wallet/ListWallets';

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
  const [records, setRecords] = React.useState([])
  const [wallets, setWallets] = React.useState([])
  const [indexWallet, setIndexWallet] = React.useState([])
  const [listWallet, setListWallet] = React.useState([])
  useEffect(() => {
    const checkLogin = async () => {
      let isLogin = await isLoggedIn()
      if (!isLogin) {
        myHistory.push("/user/login")
      }
    }

    checkLogin()
  }, [])

  const getRecordsFromServer = async () => {
    const walletID = await getCurrentWalletId()
    const recordsFromServer = await getRecords(walletID)
    if (recordsFromServer != null) {
      setRecords(recordsFromServer)
    }
    console.log(recordsFromServer)
  }

  const getWalletsFromServer = async () => {

    let walletsFromServer = await getWallets()
    console.log("walletsFromServer", walletsFromServer)
    if (walletsFromServer !== undefined) {
      setWallets(walletsFromServer)
      setListWallet(walletsFromServer)
      let id = await getCurrentWalletId()
      setIndexWallet(walletsFromServer.find(e => e.id == id))
    }
  }



  const onPickNewWallet = async (wallet_id) => {
    setIndexWallet(listWallet.find(e => e.id == wallet_id))
    if (myHistory.location.pathname.includes("/dashboard/records")) {
      console.log(myHistory.location.pathname, wallet_id)
      getRecordsFromServer()
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainAppBar
        indexWallet={indexWallet}
        wallets={wallets}
        onPickNewWallet={onPickNewWallet}
        getWalletsFromServer={getWalletsFromServer}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Route path="/dashboard/home"><Home /></Route>
        <Route path="/dashboard/report"><Report /></Route>
        <Route path="/dashboard/createWallet"><FormCreateWallet /></Route>
        <Route path="/dashboard/createRecord"><FormCreateRecord /></Route>
        <Route path="/dashboard/records">
          <ListRecord
            records={records}
            getRecordsFromServer={getRecordsFromServer} />
        </Route>
        <Route path="/dashboard/wallets">
          <ListWallets
            indexWallet={indexWallet}
            wallets={wallets}
            getWalletsFromServer={getWalletsFromServer} />
        </Route>
      </main>
    </div>
  );
}
