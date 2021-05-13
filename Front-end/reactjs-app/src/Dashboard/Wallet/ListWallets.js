import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { deleteWallet } from '../../services/WalletService';
import { List } from '@material-ui/core';
import Wallet from './Wallet';
import { toastError } from '../../utils/ToastManager';
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
        // eslint-disable-next-line eqeqeq
        if (props.indexWallet.id == wallet.id) {
            toastError("cannot delete current wallet")
        } else {
            let success = await deleteWallet(wallet.id)
            if (success) {
                props.getWalletsFromServer()
            }
        }

    }

    const onUpdateWallet = (wallet) => {
        props.onPickWalletForUpdate(wallet)
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
                                            key={wallet.id}
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