import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {Avatar} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection:"column",
    height:203,
    width:213,
    backgroundColor:"#B389F8",
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
  },
  
}));

export default function ActionCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Avatar style={{height:101,width:101}}/>
      <Typography style={{color:"white",fontSize:16,width:141,textAlign:"center",fontWeight:"bold",marginTop:5}}>Generate Text Summaries</Typography>
    </Card>
  )
}