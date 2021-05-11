import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { Divider, List } from '@material-ui/core';
import { myHistory } from '../../App';
import { removeUser } from '../../utils/UserManager';
import { removeCurrentWalletId } from '../../utils/WalletManager';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { useEffect } from 'react';
import { Drawer } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { TAB_RECORDS, TAB_WALLETS } from '../../utils/constants';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
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
}));



export default function MainSideBar(props) {


    useEffect(() => {

    }, [])

    const logout = () => {
        removeUser()
        removeCurrentWalletId()
        myHistory.push("/user/login")
    }

    const classes = useStyles();

    return (
        <>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
                }}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={props.handleDrawerClose}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </div>
                <div>
                    <List>
                        <Divider />
                        <Link
                            to="/dashboard/records"
                            style={
                                {
                                    textDecoration: 'none',
                                    color: props.indexTab === TAB_RECORDS ? "blue" : "black"
                                }
                            }
                            onClick={() => props.onChangeTab(TAB_RECORDS)}>
                            <ListItem button
                                style={
                                    {
                                        backgroundColor: props.indexTab === TAB_RECORDS ? "#e6f9ff" : "white"
                                    }
                                }
                            >
                                <ListItemIcon>
                                    <ReceiptIcon style={
                                        {
                                            color: props.indexTab === TAB_RECORDS ? "blue" : "black"
                                        }
                                    } />
                                </ListItemIcon>
                                <ListItemText primary="Records" />
                            </ListItem>
                        </Link>
                        <Link
                            to="/dashboard/wallets"
                            style={
                                {
                                    textDecoration: 'none',
                                    color: props.indexTab === TAB_WALLETS ? "blue" : "black"
                                }
                            }
                            onClick={() => props.onChangeTab(TAB_WALLETS)}>
                            <ListItem button
                                style={
                                    {
                                        backgroundColor: props.indexTab === TAB_WALLETS ? "#e6f9ff" : "white"
                                    }
                                }
                            >
                                <ListItemIcon>
                                    <AccountBalanceWalletIcon style={
                                        {
                                            textDecoration: 'none',
                                            color: props.indexTab === TAB_WALLETS ? "blue" : "black"
                                        }
                                    } />
                                </ListItemIcon>
                                <ListItemText primary="Wallets" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <List onClick={logout}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </List>
                </div>

            </Drawer>
        </>

    );
}