import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useEffect } from 'react';
import { getCurrentWalletId } from '../../utils/WalletManager';
import { toastError } from '../../utils/ToastManager';
import { myHistory } from '../../App';
import { updateRecord } from '../../services/RecordService';
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

export default function FormUpdateRecord(props) {
    const classes = useStyles();
    const [title, setTitle] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [note, setNote] = React.useState('')
    const [date, setDate] = React.useState('')
    const handleUpdateRecord = async () => {
        if (!amount || !note || !date || !title) {
            console.log(date)
            alert('please fill out all required fields')
            return
        }
        onUpdate({ title, amount, note, date })

    };

    const onUpdate = async (record) => {

        record.amount = parseInt(record.amount)
        let walletId = await getCurrentWalletId()
        if (!walletId) {
            toastError("Please pick wallet")
            return
        }
        record.record_id = props.record.id
        record.wallet_id = parseInt(walletId)
        record.typeRecord_id = 1;
        let d = date.split("-")
        record.record_date = `${date}T00:00:00.000` // yyyy/mm/dd // 2018-11-21T11:13:13.274

        let result = await updateRecord(record)
        console.log("result", result)
        if (result != null) {
            myHistory.push("/dashboard/records")
        }
    }

    useEffect(() => {
        document.getElementById('date').valueAsDate = new Date();
        setTitle(props.record.title)
        setAmount(props.record.amount)
        setNote(props.record.note)

        let date = props.record.record_date
        if (date != null) {
            let dateStr = `${date[0]}/${date[1]}/${date[2]}`
            var curr = new Date(dateStr)
            var intlDate = Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(curr)
            var splitDate = intlDate.split("/") //04/27/2021
            var newDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`
            console.log("props.record.date", curr)
            console.log("props.record.date", newDate)
            setDate(newDate)
        }
    }, [props])


    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Update Record
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
                                onClick={handleUpdateRecord}
                                className={classes.button}
                            >
                                Update
                            </Button>
                        </div>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}