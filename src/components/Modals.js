import React, { useRef, useState } from "react";

import { Modal, Typography, Grid,Button, FormControlLabel,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormLabel, FormControl, FormGroup,Checkbox} from '@material-ui/core';
import CustomButton from "../components/CustomButton";
import ExtentCard from "../components/ExtentCard"
import { useHistory } from "react-router-dom";
import { Circle, CheckCircle } from "react-feather";
import Mediocre from '../assets/Mediocre.png';
import Extensive from '../assets/Extensive.png';
import Rushed from '../assets/Rushed.png';

let mcq = {
    question : "1. What approach does the research take to generate automatic questions?",
    options : [
        "Introduction",
        "Approach",
        "Description Of Methods",
        "Results"
    ]
}



const modalStyles = makeStyles((theme)=>({
    modalRoot:{
        height:"100%",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    root:{
        background: "#FFF",
        borderRadius: 20,
        display: "flex",
        flexDirection:"column",
        outline:'none',
        padding:20,
        alignItems:'center',
        justifyContent:'center',
    },
    modal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontFamily:"Solway",
        fontWeight:700,
    },
    header:{
        display:'flex',
        flexDirection:'row',
        width:"100%",
        padding:'3%',
        paddingLeft:'5%',
    },
    content:{
        height:520,
        width:"100%",
        borderRadius:10,
        overflowY:"auto",
        display:'flex',
        fontFamily:"Solway",
        fontWeight:700,
    },
    redBtn : {
        backgroundColor: "#ff0000",
        borderRadius: 24,
        padding: "0.5% 2%",
        textTransform:'none',
        color:"#FFF",
        "&:hover":{
          cursor:'pointer'
        },
      },
    formControl:{
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3)
    },
    formControlLabel:{
        fontFamily:"Solway",
        fontWeight:700,
    },
    
}))

export const QuestionModal = ({open,handleClose}) => {
    const classes = modalStyles();
    const [selectedOption,setSelectedOption]=useState('')
    const handleChange = (event) => {
        if(selectedOption=="")
            setSelectedOption(event.target.name)
        else
            setSelectedOption("")
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modalRoot}
        >
            <div className={classes.root} style={{height:"60%",width: '35%',}}>
                <div className={classes.header}>
                    <Typography className={classes.text} style={{opacity:0.6}}>
                    Answer some of these questions based on what you just read
                    </Typography>
                </div>
                <Typography className={classes.text}>
                    {mcq.question}
                </Typography>
                <div className={classes.content}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                            {
                                mcq.options.map((option) => (
                                    <FormControlLabel 
                                    control={<Checkbox
                                        icon={<Circle />} checkedIcon={<CheckCircle />}
                                        value={option} name={option} style ={{color: "#00BFA6"}}
                                        onChange = {handleChange}
                                        />}
                                     label={<Typography className={classes.formControlLabel}
                                                        style = {{color:selectedOption==option?"#00bfa6":"#000"}}
                                     >{option}</Typography>}
                                     />
                                ))
                            }
                        </FormGroup>
                    </FormControl>
                </div>
                <CustomButton>Next ></CustomButton>
            </div>
        </Modal>
    )
}


export const BreakModal = ({open,handleClose}) => {
    const classes = modalStyles();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modalRoot}
        >
            <div className={classes.root} style={{height:"60%",width: '35%',}}>
                <div className={classes.header}>
                    <Typography className={classes.text} style={{opacity:0.6}}>
                     Looks like you’ve been working hard for a while. Research says that you work 4x more productive if you take frequent short breaks between different sessions of learning. Go renergize yourself, get a sip of water and stretch for the next 10mins.
                    </Typography>
                </div>
                <Typography className={classes.text} style={{fontSize:64}}>
                    09:57 min
                </Typography>
                
                <Button className={classes.redBtn}>No take me back</Button>
            </div>
        </Modal>
    )
}


export const SummaryExtentModal = ({open,handleClose}) => {
    const classes = modalStyles();
    const extents = [
        {
            src : Extensive,
            title : "Extensive Summary",
            subtitle : "20 mins",
            bgColor : "rgba(179, 137, 248, 0.2)",
            brColor : "rgba(179, 137, 248, 1)",
        },
        {
            src : Mediocre,
            title : "Mediocre Summary",
            subtitle : "12 mins",
            bgColor : "rgba(244, 28, 119, 0.27)",
            brColor : "rgba(244, 28, 119, 1)",
        },
        {
            src : Rushed,
            title : "Rushed Summary",
            subtitle : "6 mins",
            bgColor : "rgba(252, 204, 99, 0.26)",
            brColor : "rgba(252, 204, 99, 1)",
        }
    ]
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modalRoot}
        >
            <div className={classes.root} style={{height:"60%",width: '35%',}}>
                <div className={classes.header}>
                    <Typography className={classes.text} style={{opacity:0.6}}>
                    Choose to what extend you want to summarize the document.
                    </Typography>
                </div>
                <Grid container spacing={2} style={{marginTop:8,marginBottom:20,justifyContent:"center",alignItems:"center"}}>
                        {
                          extents.map(
                            action => <Grid item>
                            <ExtentCard {...action} />
                            </Grid>
                          )
                        }
                </Grid>
                <CustomButton>Summarize</CustomButton>
            </div>
        </Modal>
    )
}




export const ChallengeModal = ({open,handleClose}) => {
    const classes = modalStyles();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modalRoot}
        >
            <div className={classes.root} style={{height:"60%",width: '35%',}}>
                <div className={classes.header}>
                    <Typography className={classes.text} style={{opacity:0.6}}>
                    Hmm, looks like you’re losing focus pretty often. Research proves that humans are more attentive when challenged. Here’s a small challenge from our side to yours, this will help you get energized. Feel free to take a drinking break as well.
                    </Typography>
                </div>
                
                <Button className={classes.redBtn} style={{backgroundColor:"black",padding:12,paddingLeft:30,paddingRight:30,margin:20}}>Challenge Me</Button>
                
                <Button className={classes.redBtn}>No take me back</Button>
            </div>
        </Modal>
    )
}