import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainSideMenu from './MainListItems'
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
    },
    horizontalList: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    }
}));


export default function MainAppBar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true)
    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

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
                    {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        Open Menu
                    </Button> */}
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
