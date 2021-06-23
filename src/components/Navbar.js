import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../firebase";
import CustomButton from "./CustomButton.js"
import { AppBar, Toolbar, Box } from "@material-ui/core";
import Logo from "../assets/Logo.png";

const NavBar = () => {
  const history = useHistory();
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
            <CustomButton onClick={logout}>
              Log out
            </CustomButton>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
