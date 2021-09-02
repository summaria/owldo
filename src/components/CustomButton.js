import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: "#00BFA6",
    borderRadius: 24,
    padding: "0.5% 2%",
    textTransform: "none",
    color: "#FFF",
    "&:hover": {
      opacity: 0.9,
      backgroundColor: "#00BFA6",
      cursor: "pointer",
    },
  },
}));

const CustomButton = ({ onClick = () => {}, children, styles }) => {
  const classes = useStyles();
  return (
    <Button
      disableFocusRipple
      className={classes.btn}
      onClick={onClick}
      style={styles}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
