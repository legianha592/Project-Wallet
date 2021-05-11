import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import { Divider, List } from '@material-ui/core';
import { myHistory } from '../../App';
import { removeUser } from '../../utils/UserManager';
import { removeCurrentWalletId } from '../../utils/WalletManager';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { useEffect } from 'react';

export default function MainSideMenu() {
    const [indexItem, setIndexItem] = React.useState([])

    useEffect(() => {
        const initIndexItem = () => {
            let location = myHistory.location.pathname
            if (location.includes("/records")) {
                setIndexItem(1)
            } else if (location.includes("/wallets")) {
                setIndexItem(2)
            }
        }
        initIndexItem()
    }, [])

    const logout = () => {
        removeUser()
        removeCurrentWalletId()
        myHistory.push("/user/login")
    }

    return (
        <div>
            <List>
                <Divider />
                {/* <Link to="/dashboard/home" style={{ textDecoration: 'none', color: "black" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link> */}
                <Link to="/dashboard/records" style={{ textDecoration: 'none', color: indexItem === 1 ? "blue" : "black" }} onClick={() => setIndexItem(1)}>
                    <ListItem button>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="Records" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/wallets" style={{ textDecoration: 'none', color: indexItem === 2 ? "blue" : "black" }} onClick={() => setIndexItem(2)}>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountBalanceWalletIcon />
                        </ListItemIcon>
                        <ListItemText primary="Wallets" />
                    </ListItem>
                </Link>
                {/* <Link to="/dashboard/report" style={{ textDecoration: 'none', color: "black" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItem>
                </Link> */}
                <Divider />
                <List onClick={logout}>
                    {/* <ListSubheader inset>Saved reports</ListSubheader> */}
                    <ListItem button>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </List>
        </div>
    );
}