import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { List } from '@material-ui/core';
import Record from './Record';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 0,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        position: 'center'
    },
}));

export default function RecordTabbar(props) {
    const classes = useStyles();
    const [listDate, setListDate] = React.useState([]);
    const [value, setValue] = React.useState(5);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        let date = new Date() //(`${currentDate.getFullYear}/${currentDate.getMonth}/01`)
        date = new Date(date.setMonth(date.getMonth() + 1));
        var listDate = []
        var count = 0
        while (count <= 5) {
            listDate.push(date)
            date = new Date(date.setMonth(date.getMonth() - 1));
            count++
        }
        setListDate(listDate.reverse())
    }, [])



    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {
                        listDate.map((date, index) => (
                            <Tab key={dateToInt(date)} label={`${date.getMonth() + 1}-${date.getFullYear()}`} {...a11yProps(index)} />
                        ))
                    }
                </Tabs>
            </AppBar>
            {
                listDate.map((date, index) => (
                    <TabPanel value={value} index={index}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <List className={classes.root}>
                                    {
                                        props.records === undefined || getRecordByMonth(props.records, date).length === 0 //props.records.length === 0
                                            ? "No data"
                                            :
                                            getRecordByMonth(props.records, date).map((record) => (
                                                <Record
                                                    key={record.id}
                                                    record={record}
                                                    onDeleteRecord={props.onDeleteRecord}
                                                    onUpdateRecord={props.onUpdateRecord} />
                                            ))
                                    }
                                </List>
                            </Paper>
                        </Grid>
                    </TabPanel>
                ))
            }
        </div>
    );
}

var dateToInt = function (date) {
    return new Date(date).getTime()
}

var getRecordByMonth = function (records, date) {
    return records.filter(record => record.record_date[1] === date.getMonth() + 1 && record.record_date[0] === date.getFullYear())
}