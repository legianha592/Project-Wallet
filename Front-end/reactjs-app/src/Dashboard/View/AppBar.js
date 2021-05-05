import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MainSideMenu from './MainListItems'
import getUser from '../../utils/UserManager';
import { useEffect } from 'react';
import { getWallets } from '../../services/WalletService';
import { Button, Icon, Divider } from '@material-ui/core';
import { getCurrentWalletId, setCurrentWalletId } from '../../utils/WalletManager';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddIcon from '@material-ui/icons/Add';
import { myHistory } from '../../App';
import { Link } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        spacing: 8,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    walletButton: {
        marginRight: 8,
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    appBarDivider: {
        marginRight: 8
    }
}));


export default function MainAppBar() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const [wallets, setWallets] = React.useState([]);
    const [indexWallet, setIndexWallet] = React.useState([]);
    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getIndexWalletId = async () => {
            let id = await getCurrentWalletId()
            console.log("getIndexWalletId: ", id)
            setIndexWallet(parseInt(id))
        }

        const getWalletsFromServer = async () => {
            let walletsFromServer = await getWallets()
            if (walletsFromServer !== undefined) {
                setWallets(walletsFromServer)
            }
            console.log("walletsFromServer", walletsFromServer)
            await getIndexWalletId()
        }

        getWalletsFromServer()
    }, [])

    const opTapWallet = async (wallet_id) => {
        setCurrentWalletId(wallet_id)
        setIndexWallet(wallet_id)
        if (myHistory.location.pathname.includes("/dashboard/records")) {
            console.log(myHistory.location.pathname, wallet_id)
            myHistory.go(0)
        }


    }

    return (
        <>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/dashboard/createWallet" style={{ textDecoration: 'none', color: "black" }}>
                        <Button
                            component="h1"
                            variant="contained"
                            className={classes.walletButton}>
                            <AddIcon />
                            Create Wallet
                        </Button>
                    </Link>

                    <Link to="/dashboard/createRecord" style={{ textDecoration: 'none', color: "black" }}>
                        <Button
                            component="h1"
                            variant="contained"
                            className={classes.walletButton}>
                            <AddIcon />
                            Create Record
                        </Button>
                    </Link>

                    <Divider orientation="vertical" flexItem className={classes.appBarDivider} />
                    {wallets.map((wallet) => (
                        <Button
                            key={wallet.id}
                            component="h1"
                            variant="contained"
                            color={indexWallet === wallet.id ? "secondary" : "default"}
                            className={classes.walletButton}
                            onClick={() => { opTapWallet(wallet.id) }}>
                            <AccountBalanceWalletIcon />
                            {wallet.wallet_name}
                        </Button>
                    ))}
                    <Icon className={classes.title}></Icon>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <MainSideMenu />
            </Drawer>
        </>
    );
}
