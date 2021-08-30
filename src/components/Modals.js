import React, { useRef, useState } from "react";

import { Modal, Typography, Grid,Button, FormControlLabel,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormLabel, FormControl, FormGroup,Checkbox} from '@material-ui/core';
import CustomButton from "../components/CustomButton";

import { useHistory } from "react-router-dom";
import { Circle, CheckCircle } from "react-feather";

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
