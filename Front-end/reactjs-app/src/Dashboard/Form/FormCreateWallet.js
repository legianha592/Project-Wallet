import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { addWallet } from "../../services/WalletService";
import { myHistory } from "../../App";
// eslint-disable-next-line no-unused-vars
import { toastSuccess } from "../../utils/ToastManager";
import { strings } from "../../services/LocalizationService";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
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
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function FormCreateWallet() {
  const classes = useStyles();
  const [walletName, setWalletName] = React.useState("");
  const handleAddWallet = async () => {
    if (!walletName) {
      alert("Wallet name cannot be empty");
      return;
    }

    let result = await addWallet(walletName);
    if (result != null) {
      myHistory.push("/dashboard/wallets");
    }
    console.log(result);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {strings.create_wallet}
          </Typography>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label={strings.wallet_name}
                  fullWidth
                  autoComplete="shipping address-line2"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddWallet}
                className={classes.button}
              >
                {strings.create_button}
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
