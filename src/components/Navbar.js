import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "../firebase";
import { AppBar, Toolbar, Box } from "@material-ui/core";
import Logo from "../assets/Logo.png";

const useStyles = makeStyles(()=>({
  btn : {
    backgroundColor: "#00BFA6",
    borderRadius: 24,
    padding: "6px 10px",
    "&:hover":{
      cursor:'pointer'
    },
  }
}))

const NavBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={0}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <Toolbar variant="dense">
          <Box
            justifyContent="center"
            alignItems="center"
            display="flex"
            onClick={() => history.push("/")}
          >
            <img src={Logo} width="40px" alt="logo" />
          </Box>
          <h2
            onClick={() => history.push("/")}
            variant="h4"
            style={{
              color: "#000000",
              marginLeft: 8,
              flex:1,
              display:'flex'
            }}
          >
            Owl
            <span style={{ color: "#00BFA6" }}>.</span>do
          </h2>
          {currentUser ? (
            <div
              className={classes.btn}
              onClick={logout}
            >
              Log out
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
