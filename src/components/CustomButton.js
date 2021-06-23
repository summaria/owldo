import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(()=>({
    btn : {
        backgroundColor: "#00BFA6",
        borderRadius: 24,
        padding: "0.5% 2%",
        textTransform:'none',
        color:"#FFF",
        "&:hover":{
          cursor:'pointer'
        },
      }
}));

const CustomButton = ({onClick=()=>{}, children}) => {
    const classes = useStyles();
    return (
        <Button
            className={classes.btn}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

export default CustomButton;