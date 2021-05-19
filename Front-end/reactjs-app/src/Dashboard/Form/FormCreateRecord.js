import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { getCurrentWalletId } from '../../utils/WalletManager';
import { myHistory } from '../../App';
import { useEffect } from 'react';
import { addRecord } from '../../services/RecordService';
import { toastError } from '../../utils/ToastManager';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function FormCreateRecord() {
    const classes = useStyles();
    const [title, setTitle] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [note, setNote] = React.useState('')
    const [date, setDate] = React.useState('')
    const handleAddRecord = async () => {
        if (!amount || !note || !date || !title) {
            console.log(date)
            toastError('please fill out all required fields')
            return
        }
        onAdd({ title, amount, note, date })
    };

    const onAdd = async (record) => {
        record.amount = parseInt(record.amount)
        let walletId = await getCurrentWalletId()
        if (!walletId) {
            toastError("Please pick wallet")
            return
        }
        record.wallet_id = parseInt(walletId)
        record.typeRecord_id = 1;
        let d = new Date(date)
        record.record_date = `${date}T23:59:59.000`
        //record.note = "test";
        console.log(record);
        let result = await addRecord(record)
        if (result != null) {
            myHistory.push("/dashboard/records")
        }
        console.log(result)
    }

    useEffect(() => {
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0, 10);
        setDate(date)
    }, [])


    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Create Record
                    </Typography>
                    <React.Fragment>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    type='text'
                                    id="title"
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    autoComplete="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="note"
                                    name="note"
                                    label="Note"
                                    fullWidth
                                    autoComplete="note"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='date'
                                    id="date"
                                    name="date"
                                    label="Date"
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='number'
                                    id="amount"
                                    name="amount"
                                    label="Amount"
                                    fullWidth
                                    autoComplete="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <div className={classes.buttons}>
                            {/* {activeStep !== 0 && (
                                <Button onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>
                            )} */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddRecord}
                                className={classes.button}
                            >
                                Create
                            </Button>
                        </div>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}