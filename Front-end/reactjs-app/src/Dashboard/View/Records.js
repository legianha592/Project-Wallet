import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import Title from './Title';
import { useState } from 'react';
import { useEffect } from 'react';
import { getRecords } from '../../services/RecordService';
import { getCurrentWalletId } from '../../utils/WalletManager';
import { ListItem } from '@material-ui/core/ListItem';
import Record from './Record';
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
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

export default function Records() {
  const classes = useStyles();

  const [records, setRecords] = useState([])
  useEffect(() => {
    const getRecordsFromServer = async () => {
      const walletID = await getCurrentWalletId()
      const recordsFromServer = await getRecords(walletID)
      if (recordsFromServer != null) {
        setRecords(recordsFromServer)
      }
      console.log(recordsFromServer)

    }
    getRecordsFromServer()
  }, [])

  return (
    <React.Fragment>
      {/* <Title>Recent Records</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Note</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.title}</TableCell>
              <TableCell>{record.note}</TableCell>
              <TableCell align="right">{record.amount}</TableCell>
            </TableRow>
          ))}
          {records.map((record) => (
            <TableRow key={record.id + 10000}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.title}</TableCell>
              <TableCell>{record.note}</TableCell>
              <TableCell align="right">{record.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
      <List className={classes.root}>
        {records.map((record) => (
          <Record record={record} />
        ))}
      </List>
    </React.Fragment>

  );
}
