import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { deleteRecord } from '../../services/RecordService';
import { useEffect } from 'react';
import RecordTabbar from './tabbar';
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
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
    useEffect(() => {
        const getCurrentDateTime = () => {
            let today = new Date()
            let year = today.getFullYear()
            let month = today.getMonth()
            console.log(year, month)
        }


        props.getRecordsFromServer()
        getCurrentDateTime()
        console.log("list record props: ", props)
    }, [])

    const onDeleteRecord = async (record) => {
        let success = await deleteRecord(record.id)
        if (success) {
            props.getRecordsFromServer()
        }
    }

    const onUpdateRecord = (record) => {
        props.onPickRecordForUpdate(record)
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container >
                <RecordTabbar
                    records={props.records}
                    onDeleteRecord={onDeleteRecord}
                    onUpdateRecord={onUpdateRecord}
                />
            </Grid>
        </Container>
    );
}