
import React from 'react';
import { ListItem, ListItemAvatar, Avatar, Typography, Divider, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemIcon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { moneyStr } from '../../utils/CommonHelper';
const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
}));


function Record(props) {
    const classes = useStyles()
    const today = Date.now()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onTapUpdateRecord = () => {
        props.onUpdateRecord(props.record)
        handleClose()
        // console.log(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today));
    }

    const onTapDeleteRecord = () => {
        props.onDeleteRecord(props.record)
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
                    <Avatar alt={props.record.title} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={props.record.title}
                    secondary={props.record.note}
                />
                <ListItemSecondaryAction>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        ${moneyStr(props.record.amount)}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItem >
            <Divider variant="inset" component="li" />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onTapUpdateRecord}>
                    <ListItemIcon>
                        <EditIcon
                            fontSize="small" />
                    </ListItemIcon>
                    <Typography
                        variant="inherit">
                        Update
                    </Typography>
                </MenuItem>
                <MenuItem onClick={onTapDeleteRecord}>
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

export default Record;
