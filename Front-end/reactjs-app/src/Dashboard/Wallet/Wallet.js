
import React from 'react';
import { ListItem, ListItemAvatar, Avatar, Typography, Divider, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemIcon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
}));


function Wallet(props) {
    const classes = useStyles()
    const today = Date.now()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onTapUpdateWallet = () => {
        props.onUpdateWallet(props.wallet)
        handleClose()
        // console.log(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today));
    }

    const onTapDeleteWallet = () => {
        props.onDeleteWallet(props.wallet)
        handleClose()
    }
    return (
        <>
            <ListItem
                alignItems="flex-start"
                onClick={handleClick}
                aria-controls="simple-menu"
                aria-haspopup="true">
                <ListItemAvatar>
                    <Avatar alt={props.wallet.wallet_name} src="/static/images/avatar/1.jpg" >
                        <AccountBalanceWalletIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={props.wallet.wallet_name}
                    secondary={`total Amount: ${props.wallet.total_amount}`}
                />
            </ListItem >
            <Divider variant="inset" component="li" />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onTapUpdateWallet}>
                    <ListItemIcon>
                        <EditIcon
                            fontSize="small" />
                    </ListItemIcon>
                    <Typography
                        variant="inherit">
                        Update
                    </Typography>
                </MenuItem>
                <MenuItem onClick={onTapDeleteWallet}>
                    <ListItemIcon>
                        <DeleteIcon
                            fontSize="small" />
                    </ListItemIcon>
                    <Typography
                        variant="inherit">
                        Delete
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Wallet;
