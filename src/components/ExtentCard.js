import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Mediocre from "../assets/Mediocre.png"


const useStyles = makeStyles(() => ({
  root:{
    display: "flex",
    flexDirection: "column",
    height: 180,
    width: 170,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    transition: "0.3s",
    "&:hover":{
        cursor:"pointer",
        marginTop:"-2px"
    }   
  },
}));

export default function ExtentCard({src, title,subtitle,bgColor,brColor}) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root} style={{backgroundColor: `${bgColor}`,border:`1px solid ${brColor}`}}>
      <img src={src} style={{height:100,width:100}}/>
      <Typography
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginTop: 5,
          color:"black",
          fontSize:15
        }}
      >
        {title}
        <br/>
        <span style={{fontSize:12,opacity:0.6}}>{subtitle}</span>
      </Typography>
    </Card>
  );
}
