import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { deleteRecord, getRecords } from '../../services/RecordService';
import { getCurrentWalletId } from '../../utils/WalletManager';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { List } from '@material-ui/core';
import Record from './Record';
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


export default function ListRecord(props) {

    const classes = useStyles();
    const [currentMonth, setCurrentMonth] = React.useState([])
    const [currentYear, setCurrentYear] = React.useState([])
    React.useEffect(() => {
        const getCurrentDateTime = () => {
            let today = new Date()
            let year = today.getFullYear()
            let month = today.getMonth()
            console.log(year, month)
            setCurrentMonth(month)
            setCurrentYear(year)
        }


        props.getRecordsFromServer()
        getCurrentDateTime()
    }, [])

    const onDeleteRecord = async (record) => {
        let success = await deleteRecord(record.id)
        if (success) {
            props.getRecordsFromServer()
        }
        // axios.delete(`${RECORD_ROOT_URL}/delete?record_id=${record.id}`).then(response => {
        //     console.log(response.data)
        //     if (response.data.result != null) {
        //         props.getRecordsFromServer()
        //     } else if (response.data.message != null) {
        //         window.alert(response.data.message)
        //     }
        // })
    }

    const onUpdateRecord = (record) => {
        console.log("UPDATE")
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container >
                {/* <Grid item xs={12}>
                    <Paper className={classes.topPaper} bgcolor="grey.300">
                        <Box display="flex" justifyContent="center" p={1}>
                            <Box just p={1} flexGrow={1} >
                                <Button
                                    fullWidth={true}
                                    component="h1"
                                    variant="text"
                                    className={classes.walletButton}>
                                    Previous Month
                                </Button>
                            </Box>
                            <Box just p={1} flexGrow={1}>
                                <Button
                                    fullWidth={true}
                                    component="h1"
                                    variant="text"
                                    className={classes.walletButton}>
                                    {currentMonth}/{currentYear}
                                </Button>
                            </Box>
                            <Box just p={1} flexGrow={1} >
                                <Button
                                    fullWidth={true}
                                    component="h1"
                                    variant="text"
                                    className={classes.walletButton}>
                                    Next Month
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid> */}
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <List className={classes.root}>
                            {
                                props.records === undefined || props.records.length === 0 ? "No data" :
                                    props.records.map((record) => (
                                        <Record
                                            record={record}
                                            onDeleteRecord={onDeleteRecord}
                                            onUpdateRecord={onUpdateRecord} />
                                    ))
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}