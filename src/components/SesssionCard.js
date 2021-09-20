import React from 'react';

import { useHistory } from 'react-router-dom'

import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ChevronRight } from 'react-feather';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height:80,
    width:"60%",
    marginTop: "2%",
    border:"0.5px solid rgba(0, 0, 0, 0.8);",
    "&:hover":{
        opacity:0.8,
        backgroundColor:"rgba(255,255,255,0.6)",
        cursor:"pointer"
    }
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    margin:12,
    marginRight:8
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginLeft:"auto",
    margin:5
  }
}));

export default function SessionCard({title,fileURL,id}) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.root} elevation={0}>
      <img
        className={classes.cover}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography style={{fontSize:20, fontWeight: 'bold'}}>
            {title}
          </Typography>
          <Typography style={{fontSize:14}} color="textSecondary">
            23rd September
          </Typography>
        </CardContent>
      </div>
      <div className={classes.icon}>
        <ChevronRight height="40px" width="35"  opacity="0.6" onClick={()=>{
          history.push({
            pathname:`/session/${id}`,
            state:{id:id,fileURL:fileURL,title:title}
          })
        }}
          />
      </div>
    </Card>
  );
}