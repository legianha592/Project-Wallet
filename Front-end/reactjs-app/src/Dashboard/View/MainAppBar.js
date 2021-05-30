import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useEffect } from "react";
import { Icon, Divider } from "@material-ui/core";
import { setCurrentWalletId } from "../../utils/WalletManager";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { TAB_RECORDS, TAB_WALLETS } from "../../utils/constants";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/AccountCircle";
import { strings } from "../../services/LocalizationService";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    spacing: 8,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  walletButton: {
    marginRight: 8,
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  appBarDivider: {
    marginRight: 8,
  },
  horizontalList: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function MainAppBar(props) {
  const classes = useStyles();

  useEffect(() => {
    const getWalletsFromServer = async () => {
      await props.getWalletsFromServer();

      console.log("walletsFromServer", props.wallets);
    };

    getWalletsFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opTapWallet = async (wallet_id) => {
    setCurrentWalletId(wallet_id);

    handleClose();
    props.onPickNewWallet(wallet_id);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const isMenuOpen = Boolean(anchorElLanguage);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuLanguageClose = () => {
    setAnchorElLanguage(null);
    handleMobileMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorElLanguage}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuLanguageClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuLanguageClose();
          props.setLanguageToVietNamese();
        }}
      >
        🇻🇳 {strings.vietnamese}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuLanguageClose();
          props.setLanguageToEnglish();
        }}
      >
        🇺🇸 {strings.english}
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Language</p>
      </MenuItem>
    </Menu>
  );

  const menuPickWaller = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {props.wallets == null
        ? "No data"
        : props.wallets.map((wallet) => (
            <MenuItem
              key={wallet.id}
              style={{
                backgroundColor:
                  props.indexWallet != null &&
                  props.indexWallet.id === wallet.id
                    ? "blue"
                    : "white",
              }}
              onClick={() => {
                opTapWallet(wallet.id);
              }}
            >
              <ListItemIcon>
                <AccountBalanceWalletIcon
                  style={{
                    color:
                      props.indexWallet != null &&
                      props.indexWallet.id === wallet.id
                        ? "white"
                        : "black",
                  }}
                  fontSize="small"
                />
              </ListItemIcon>
              <Typography
                variant="inherit"
                style={{
                  color:
                    props.indexWallet != null &&
                    props.indexWallet.id === wallet.id
                      ? "white"
                      : "black",
                }}
              >
                {wallet.wallet_name}
              </Typography>
            </MenuItem>
          ))}
    </Menu>
  );

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, props.open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              props.open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          {props.indexTab === TAB_WALLETS && (
            <Link
              to="/dashboard/createWallet"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button
                component="h1"
                variant="contained"
                className={classes.walletButton}
              >
                <AddIcon />
                {strings.create_wallet}
              </Button>
            </Link>
          )}

          {props.indexTab === TAB_RECORDS && (
            <>
              <Link
                to="/dashboard/createRecord"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button
                  component="h1"
                  variant="contained"
                  className={classes.walletButton}
                >
                  <AddIcon />
                  {strings.create_record}
                </Button>
              </Link>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.appBarDivider}
              />
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                component="h1"
                variant="contained"
                color="default"
                className={classes.walletButton}
              >
                <AccountBalanceWalletIcon />
                {props.indexWallet == null ? "" : props.indexWallet.wallet_name}
              </Button>
            </>
          )}
          <div className={classes.grow}></div>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Typography>
                {strings.getLanguage() === "en" ? "🇺🇸" : "🇻🇳"}{" "}
                {strings.getLanguage()}{" "}
              </Typography>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {menuPickWaller}
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
