import React from 'react';
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor:"#F3F3F3"
  },
}));

const NavLayout = ({children}) => {
    let classes = useStyles();
    return (
        <div className={classes.root}>
            <Navbar /> 
            { children }
        </div>
    );
};

export default NavLayout;