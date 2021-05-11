import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useEffect } from 'react';
import { Icon, Divider } from '@material-ui/core';
import { setCurrentWalletId } from '../../utils/WalletManager';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { TAB_RECORDS, TAB_WALLETS } from '../../utils/constants';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        spacing: 8,
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
    },
    horizontalList: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    }
}));


export default function MainAppBar(props) {
    const classes = useStyles();


    useEffect(() => {
        const getWalletsFromServer = async () => {
            await props.getWalletsFromServer()


            console.log("walletsFromServer", props.wallets)

        }

        getWalletsFromServer()
    }, [])

    const opTapWallet = async (wallet_id) => {
        setCurrentWalletId(wallet_id)

        handleClose()
        props.onPickNewWallet(wallet_id)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerOpen}
                        className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {
                        props.indexTab == TAB_WALLETS &&
                        <Link to="/dashboard/createWallet" style={{ textDecoration: 'none', color: "black" }}>
                            <Button
                                component="h1"
                                variant="contained"
                                className={classes.walletButton}>
                                <AddIcon />
                                Create Wallet
                            </Button>
                        </Link>
                    }

                    {
                        props.indexTab == TAB_RECORDS &&
                        <>
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

                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                component="h1"
                                variant="contained"
                                color="default"
                                className={classes.walletButton}>
                                <AccountBalanceWalletIcon />
                                {props.indexWallet == null ? "" : props.indexWallet.wallet_name}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {props.wallets == null ? "No data" : props.wallets.map((wallet) => (
                                    <MenuItem
                                        key={wallet.id}
                                        onClick={() => { opTapWallet(wallet.id) }}>
                                        <ListItemIcon>
                                            <AccountBalanceWalletIcon
                                                color={props.indexWallet != null && props.indexWallet.id === wallet.id ? "secondary" : "default"}
                                                fontSize="small" />
                                        </ListItemIcon>
                                        <Typography
                                            variant="inherit"
                                            color={props.indexWallet != null && props.indexWallet.id === wallet.id ? "secondary" : "default"}>
                                            {wallet.wallet_name}
                                        </Typography>
                                    </MenuItem>

                                ))}
                            </Menu>

                            <Icon className={classes.title}></Icon>
                        </>

                    }



                </Toolbar>
            </AppBar>
        </>

    );
}
