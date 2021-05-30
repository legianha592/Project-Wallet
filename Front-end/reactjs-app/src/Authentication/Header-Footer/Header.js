import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React from "react";

function Header(props) {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <PhotoCamera />
          <Typography variant="h6">App Money</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
