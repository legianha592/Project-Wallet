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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addTypeRecord,getTypeRecords } from '../../services/TypeRecordService';

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
    const [createTypeRecordText, setCreateTypeRecordText] = React.useState('')
    const [listTypeRecord, setListTypeCreate] = React.useState([])
    const [currentTypeRecord, setCurrentTypeCreate] = React.useState(null)

    useEffect(() => {
        const initSetupDate = () => {
            var curr = new Date();
            curr.setDate(curr.getDate());
            var date = curr.toISOString().substr(0, 10);
            setDate(date)    
        }
        
        const getListTypeRecordFromServer = async () => {
            let listTypeRecordFromServer = await getTypeRecords()
            setListTypeCreate(listTypeRecordFromServer)
        }

        initSetupDate()
        getListTypeRecordFromServer()
    }, [])



    const handleAddRecord = async () => {
        if (!amount || !note || !date || !title) {
            console.log(date)
            toastError('please fill out all required fields')
            return
        }

        if (!currentTypeRecord) {
            toastError('please pick type record')
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
        record.typeRecord_id = currentTypeRecord.id;
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

    

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTapAddTypeRecord = () => {
        handleClose()
        handleClickOpenDialogTypeRecord()
    };

    const [openTypeRecord, setOpenTypeRecord] = React.useState(false);

    const handleClickOpenDialogTypeRecord = () => {
        setOpenTypeRecord(true);
    };

    const handleCloseDialogTypeRecord = () => {
        setOpenTypeRecord(false);
    };

    const handleTapCreateTypeRecord = async ()  => {
        let result = await addTypeRecord(createTypeRecordText)
        if (result !== null) {
            handleCloseDialogTypeRecord()
            setCreateTypeRecordText("")
        }
    };
    const onPickTypeRecord = (typeRecord) => {
        handleClose()
        setCurrentTypeCreate(typeRecord)
    }


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
                            <Grid item xs={12}>
                                <Button
                                    variant={currentTypeRecord == null ? "outlined" : "contained"}
                                    color="dafault" 
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    component="h1">
                                    pick type record {currentTypeRecord != null && `: ${currentTypeRecord.typeRecord_name}`}
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {
                                        listTypeRecord != null && listTypeRecord.map((typeRecord) =>  (
                                            <MenuItem 
                                            key={typeRecord.id}
                                            onClick={() => {onPickTypeRecord(typeRecord)}}>
                                                <Typography variant="inherit">
                                                    {typeRecord.typeRecord_name}
                                                </Typography>
                                            </MenuItem>
                                        ))
                                    }
                                    <MenuItem onClick={handleTapAddTypeRecord}>
                                        <Typography variant="inherit">
                                            Add new Type Record
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                                <Dialog 
                                open={openTypeRecord}
                                onClose={handleCloseDialogTypeRecord} 
                                aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Create Type Record</DialogTitle>
                                    <DialogContent>
                                    {/* <DialogContentText>
                                        To subscribe to this website, please enter your email address here. We will send updates
                                        occasionally.
                                    </DialogContentText> */}
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Type record name"
                                        type="text"
                                        fullWidth
                                        value={createTypeRecordText}
                                        onChange={(e) => setCreateTypeRecordText(e.target.value)}
                                    />
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleCloseDialogTypeRecord} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleTapCreateTypeRecord} color="primary">
                                        Create
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </Grid>
                        <div className={classes.buttons}>
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