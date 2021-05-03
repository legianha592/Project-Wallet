
import React from 'react';
import { ListItem, ListItemAvatar, Avatar, Typography, Divider, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import NumberFormat from 'react-number-format';


const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
}));


function Record({ record }) {
    const classes = useStyles();
    const today = Date.now();

    console.log(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today));
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={record.title} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={record.title}
                    secondary={record.note}
                />
                <ListItemSecondaryAction>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        ${Intl.NumberFormat().format(record.amount)}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItem >
            <Divider variant="inset" component="li" />
        </>

    )
}

export default Record;
