import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    Grid,
	Button
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Logo from '../assets/Logo.png';
import { AlignCenter } from 'react-feather';

const useStyles = makeStyles(() => ({
    container: {
      display:"flex",
      padding:"4%",
      paddingRight:"0%",
      paddingTop:"0.5%",
      height:"100vh",
	  backgroundColor:'#ffffff',
    },
	box:{
		display:"flex",
		alignItems:"center",
		justifyContent:"center",
		height:"100%"
	},
    logoText: {
        fontWeight:'bold',
        fontSize:74,
        '&:hover':{
            cursor:'pointer'
        }
    },
	taglineText:{
		fontWeight:'bold',
		fontSize:44
	},
	info:{
		fontWeight:500,
		fontSize:24,
		color:"#00BFA6",
		width:"80%"
	},
	btn:{
        backgroundColor: "#00BFA6",
        padding:"4%",
        paddingTop:"1%",
        paddingBottom:"1%",
        borderRadius:20,
        textTransform:"none",
        fontSize:18,
        color:"#FFF",
        fontWeight:400,
        fontFamily:"Poppins",
    },
  }));

const Landing = () => {
		const classes = useStyles();
		const history = useHistory();
		return (
			<Grid container className={classes.container}>
			<Grid container item xs={6} className={classes.box}> 
				<img src={Logo} height="25%"></img>
				<h1 className = {classes.logoText} onClick={()=>{history.push('/')}}>Owl<span style={{color:"#00BFA6"}}>.</span>do</h1>
			</Grid>
			<Grid container item xs={6} className={classes.box} style={{backgroundColor:"#ffffff",width:"90%",height:"90%",borderRadius:100}}>
						<p className = {classes.info}>
							Make notes, generate summaries and analyse your reading habits by using <span style={{color:"#000000"}}>Owl.do</span> for your study sessions.
                        </p>
						<Button className = {classes.btn} onClick={()=>{history.push('/login')}}>
                            Begin Now
                        </Button>
			</Grid>
	   </Grid>
		);
};

export default Landing;