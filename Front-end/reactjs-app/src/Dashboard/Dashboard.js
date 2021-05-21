import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route } from 'react-router';
import ListRecord from './Record/ListRecords';
import Home from './HomePage/Home'
import Report from './HomePage/Report';
import MainAppBar from './View/MainAppBar';
import { useEffect } from 'react';
import { myHistory } from '../App';
import { isLoggedIn } from '../utils/UserManager';
import FormCreateWallet from './Form/FormCreateWallet';
import FormCreateRecord from './Form/FormCreateRecord';
import { getCurrentWalletId } from '../utils/WalletManager';
import { getRecords } from '../services/RecordService';
import { getWallets } from '../services/WalletService';
import ListWallets from './Wallet/ListWallets';
import FormUpdateWallet from './Form/FormUpdateWallet';
import FormUpdateRecord from './Form/FormUpdateRecord';
import MainSideBar from './View/MainSideBar';
import { TAB_RECORDS, TAB_WALLETS } from '../utils/constants';



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
  const [walletForUpdate, setWalletForUpdate] = React.useState([])
  const [recordForUpdate, setRecordForUpdate] = React.useState([])
  const [indexTab, setIndexTab] = React.useState([])

  useEffect(() => {
    const checkLogin = async () => {
      let isLogin = await isLoggedIn()
      if (!isLogin) {
        myHistory.push("/user/login")
      }
    }

    const initIndexItem = () => {
      let location = myHistory.location.pathname
      if (location.includes("/records") || location.includes("/createRecord")) {
        setIndexTab(TAB_RECORDS)
      } else if (location.includes("/wallets")) {
        setIndexTab(TAB_WALLETS)
      }
    }

    checkLogin()
    initIndexItem()
  }, [])

  const getRecordsFromServer = async () => {
    const walletID = await getCurrentWalletId()
    const recordsFromServer = await getRecords(walletID)
    if (recordsFromServer != null) {
      recordsFromServer.sort((record1, record2) => {
          for (let i=0; i<3; i++){
            if (record1.record_date[i] != record2.record_date[i]){
              return record1.record_date[i] - record2.record_date[i];
            }
          }
          return -1;
      })
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
      // eslint-disable-next-line eqeqeq
      setIndexWallet(walletsFromServer.find(e => e.id == id))
    }
  }



  const onPickNewWallet = async (wallet_id) => {
    // eslint-disable-next-line eqeqeq
    setIndexWallet(listWallet.find(e => e.id == wallet_id))
    if (myHistory.location.pathname.includes("/dashboard/records")) {
      console.log(myHistory.location.pathname, wallet_id)
      getRecordsFromServer()
    }
  }

  const onPickWalletForUpdate = (wallet) => {
    setWalletForUpdate(wallet)
    myHistory.push("/dashboard/updateWallet")
  }

  const onPickRecordForUpdate = (record) => {
    setRecordForUpdate(record)
    myHistory.push("/dashboard/updateRecord")
  }

  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const onChangeTab = (indexTab) => {
    setIndexTab(indexTab)
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainAppBar
        open={open}
        indexWallet={indexWallet}
        wallets={wallets}
        onPickNewWallet={onPickNewWallet}
        getWalletsFromServer={getWalletsFromServer}
        indexTab={indexTab}
        handleDrawerOpen={handleDrawerOpen}
      />

      <MainSideBar
        open={open}
        indexTab={indexTab}
        onChangeTab={onChangeTab}
        handleDrawerClose={handleDrawerClose}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Route path="/dashboard/home"><Home /></Route>
        <Route path="/dashboard/report"><Report /></Route>
        <Route path="/dashboard/createWallet"><FormCreateWallet /></Route>
        <Route path="/dashboard/createRecord"><FormCreateRecord /></Route>
        <Route path="/dashboard/updateWallet"><FormUpdateWallet wallet={walletForUpdate} /></Route>
        <Route path="/dashboard/updateRecord"><FormUpdateRecord record={recordForUpdate} /></Route>
        <Route path="/dashboard/records">
          <ListRecord
            onPickRecordForUpdate={onPickRecordForUpdate}
            records={records}
            getRecordsFromServer={getRecordsFromServer} />
        </Route>
        <Route path="/dashboard/wallets">
          <ListWallets
            onPickWalletForUpdate={onPickWalletForUpdate}
            indexWallet={indexWallet}
            wallets={wallets}
            getWalletsFromServer={getWalletsFromServer} />
        </Route>
      </main>
    </div>
  );
}
