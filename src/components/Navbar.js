import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Box } from "@material-ui/core";
import Logo from "../assets/Logo.png";

const NavBar = () => {
  const history = useHistory();
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        style={{
          backgroundColor: "#FFF",
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
            }}
          >
            Owl
            <span style={{ color: "#00BFA6" }}>.</span>do
          </h2>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
