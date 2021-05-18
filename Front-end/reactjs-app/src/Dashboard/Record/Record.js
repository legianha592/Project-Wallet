
import React from 'react';
import { ListItem, ListItemAvatar, Avatar, Typography, Divider, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemIcon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { moneyStr } from '../../utils/CommonHelper';
import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';



const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
    greenTextColor: {
        display: 'inline',
        color: "green"
    },
    redTextColor: {
        display: 'inline',
        color: "red"
    },

    avatar: {
        color: '#fff',
        backgroundColor: red[200]
    },
    orangeAvatar: {
        color: '#fff',
        backgroundColor: red[500]
    },
    purpleAvatar: {
        color: '#fff',
        backgroundColor: red[200]
    },
}));

let classNameHolder = ["avatar", "orangeAvatar", "purpleAvatar"];

function Record(props) {
    const classes = useStyles()
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
                <ListItemAvatar
                    colorDefault="primary"
                    backgroundColor="primary"
                    color="primary"
                >
                    <Avatar
                        //className={classes[Math.floor(Math.random() * 3)]}
                        style={{
                            backgroundColor: randomColor()
                        }}
                    >
                        <Typography>
                            {props.record.created_date[3]}
                        </Typography>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={props.record.title}
                    secondary={props.record.note}
                />
                <ListItemSecondaryAction>
                    <Typography
                        component="span"
                        variant="body2"
                        className={props.record.amount > 0 ? classes.greenTextColor : classes.redTextColor}
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
function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);

    return color;
}
export default Record;
