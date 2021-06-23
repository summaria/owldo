import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: 203,
    width: 213,
    backgroundColor: "#B389F8",
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

export default function ActionCard({src, title}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Avatar style={{ height: 100, width: 100 }} src={src} />
      <Typography
        style={{
          color: "white",
          fontSize: 16,
          width: 141,
          textAlign: "center",
          fontWeight: "bold",
          marginTop: 5,
        }}
      >
        {title}
      </Typography>
    </Card>
  );
}
