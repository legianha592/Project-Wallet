import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { deleteRecord } from "../../services/RecordService";
import { useEffect } from "react";
import RecordTabbar from "./tabbar";
import { Paper, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

export default function ListRecord(props) {
  const classes = useStyles();
  useEffect(() => {
    const getCurrentDateTime = () => {
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      console.log(year, month);
    };

    props.getRecordsFromServer();
    getCurrentDateTime();
    console.log("list record props: ", props);
  }, []);

  const onDeleteRecord = async (record) => {
    let success = await deleteRecord(record.id);
    if (success) {
      props.getRecordsFromServer();
    }
  };

  const onUpdateRecord = (record) => {
    props.onPickRecordForUpdate(record);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <RecordTabbar
            records={props.records}
            onDeleteRecord={onDeleteRecord}
            onUpdateRecord={onUpdateRecord}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
