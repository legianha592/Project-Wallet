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




export default function MainSideMenu() {
    const logout = () => {
        removeUser()
        removeCurrentWalletId()
        myHistory.push("/user/login")
    }

    return (
        <div>
            <List>
                <Divider />
                <Link to="/dashboard/home" style={{ textDecoration: 'none', color: "black" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/records" style={{ textDecoration: 'none', color: "black" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Records" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/report" style={{ textDecoration: 'none', color: "black" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItem>
                </Link>
                <Divider />
                <List onClick={logout}>
                    <ListSubheader inset>Saved reports</ListSubheader>
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </List>
        </div>
    );
}