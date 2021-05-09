import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { deleteWallet, getWallets } from '../../services/WalletService';
import { getCurrentWalletId } from '../../utils/WalletManager';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { List } from '@material-ui/core';
import Wallet from './Wallet';
import axios from 'axios';
import { RECORD_ROOT_URL } from '../../utils/constants';
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        position: 'center'
    },

    topPaper: {
        //padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        position: 'center',

    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
    root: {
        width: '100%',
        //maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


export default function ListWallets(props) {

    const classes = useStyles();
    React.useEffect(() => {
        props.getWalletsFromServer()

    }, [])

    const onDeleteWallet = async (wallet) => {
        let success = await deleteWallet(wallet.id)
        if (success) {
            props.getWalletsFromServer()
        }
    }

    const onUpdateWallet = (wallet) => {
        console.log("UPDATE")
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <List className={classes.root}>
                            {
                                props.wallets === undefined || props.wallets.length === 0 ? "No data" :
                                    props.wallets.map((wallet) => (
                                        <Wallet
                                            wallet={wallet}
                                            onDeleteWallet={onDeleteWallet}
                                            onUpdateWallet={onUpdateWallet} />
                                    ))
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}