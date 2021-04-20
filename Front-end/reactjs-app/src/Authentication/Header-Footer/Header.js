import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React from "react";

function Header(props) {

    //     <div>
    //     <ul>
    //       <li>
    //         <Link to="/user/login">Login</Link>
    //       </li>
    //       <li>
    //         <Link to="/user/signup">Sign Up</Link>
    //       </li>
    //       <li>
    //         <Link to="/user/changepassword">Change Password</Link>
    //       </li>
    //     </ul>
    //   </div>
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <PhotoCamera />
                    <Typography variant="h6">
                        App Money
                </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;