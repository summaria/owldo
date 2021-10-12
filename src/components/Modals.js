import React, { useState } from "react";

import {
  Modal,
  Typography,
  Grid,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, RadioGroup, Radio } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import ExtentCard from "../components/ExtentCard";
import { Circle, CheckCircle } from "react-feather";
import Mediocre from "../assets/Mediocre.png";
import Extensive from "../assets/Extensive.png";
import Rushed from "../assets/Rushed.png";

const modalStyles = makeStyles((theme) => ({
  modalRoot: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    background: "#FFF",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    outline: "none",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Solway",
    fontWeight: 700,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: "3%",
    paddingLeft: "5%",
  },
  content: {
    height: 520,
    width: "100%",
    borderRadius: 10,
    overflowY: "auto",
    display: "flex",
    fontFamily: "Solway",
    fontWeight: 700,
  },
  redBtn: {
    backgroundColor: "#ff0000",
    borderRadius: 24,
    padding: "0.5% 2%",
    textTransform: "none",
    color: "#FFF",
    "&:hover": {
      cursor: "pointer",
    },
  },
  formControl: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  formControlLabel: {
    fontFamily: "Solway",
    fontWeight: 700,
  },
  circle: {
    padding: 20,
    marginLeft: 150,
    marginRight: 150,
    marginTop:10,
    display: "inline-block",
    borderRadius: "50%",
    width: 50,
    height: 50,
  },
}));

export const QuestionModal = ({ open, handleClose, questions }) => {
  const classes = modalStyles();

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [collapseAnswer, setCollapseAnswer] = useState(true);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const reset = () => {
    setSelectedOption(-1);
    setCollapseAnswer(true);
  };

  let question =
    questions && questions?.length != 0 && questions[activeQuestion];
  return (
    <Modal open={open} onClose={handleClose} className={classes.modalRoot}>
      <div className={classes.root} style={{ height: "60%", width: "35%" }}>
        <div className={classes.header}>
          <Typography className={classes.text} style={{ opacity: 0.6 }}>
            Answer some of these questions based on what you just read
          </Typography>
        </div>
        <Typography className={classes.text}>{question?.question}</Typography>
        <div className={classes.content}>
          {question?.type == "MCQ" ? (
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup>
                {question?.options?.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Radio
                        icon={<Circle />}
                        checkedIcon={<CheckCircle />}
                        value={idx}
                        name={option}
                        checked={
                          selectedOption == idx && idx == question?.answer
                        }
                        style={{
                          color:
                            selectedOption == idx
                              ? idx == question?.answer
                                ? "#00bfa6"
                                : "red"
                              : "#000",
                        }}
                        onChange={handleChange}
                      />
                    }
                    label={
                      <Typography
                        className={classes.formControlLabel}
                        style={{
                          color:
                            selectedOption == idx
                              ? idx == question?.answer
                                ? "#00bfa6"
                                : "red"
                              : "#000",
                        }}
                      >
                        {option}
                      </Typography>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {collapseAnswer ? (
                <CustomButton
                  onClick={() => setCollapseAnswer(false)}
                  style={{ backgroundColor: "#222", borderRadius: 4 }}
                >
                  Show answer
                </CustomButton>
              ) : (
                <span style={{ color: "#00bfa6" }}>{question?.answer}</span>
              )}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <CustomButton
            style={{ marginRight: 16 }}
            disabled={activeQuestion === 0}
            onClick={() => {
              setActiveQuestion(activeQuestion - 1);
              reset();
            }}
          >
            {"<"} Prev
          </CustomButton>
          <CustomButton
            onClick={() => {
              reset();
              setActiveQuestion(activeQuestion + 1);
            }}
            disabled={questions && activeQuestion === questions?.length - 1}
          >
            Next {">"}
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export const BreakModal = ({ open, handleClose }) => {
  const classes = modalStyles();
  return (
    <Modal open={open} onClose={handleClose} className={classes.modalRoot}>
      <div className={classes.root} style={{ height: "60%", width: "35%" }}>
        <div className={classes.header}>
          <Typography className={classes.text} style={{ opacity: 0.6 }}>
            Looks like you’ve been working hard for a while. Research says that
            you work 4x more productive if you take frequent short breaks
            between different sessions of learning. Go renergize yourself, get a
            sip of water and stretch for the next 10mins.
          </Typography>
        </div>
        <Typography className={classes.text} style={{ fontSize: 64 }}>
          09:57 min
        </Typography>

        <Button className={classes.redBtn}>No take me back</Button>
      </div>
    </Modal>
  );
};

export const SummaryExtentModal = ({ open, handleClose }) => {
  const classes = modalStyles();
  const extents = [
    {
      src: Extensive,
      title: "Extensive Summary",
      subtitle: "20 mins",
      bgColor: "rgba(179, 137, 248, 0.2)",
      brColor: "rgba(179, 137, 248, 1)",
    },
    {
      src: Mediocre,
      title: "Mediocre Summary",
      subtitle: "12 mins",
      bgColor: "rgba(244, 28, 119, 0.27)",
      brColor: "rgba(244, 28, 119, 1)",
    },
    {
      src: Rushed,
      title: "Rushed Summary",
      subtitle: "6 mins",
      bgColor: "rgba(252, 204, 99, 0.26)",
      brColor: "rgba(252, 204, 99, 1)",
    },
  ];
  return (
    <Modal open={open} onClose={handleClose} className={classes.modalRoot}>
      <div className={classes.root} style={{ height: "60%" }}>
        <div className={classes.header}>
          <Typography className={classes.text}>
            Choose to what extend you want to summarize the document.
          </Typography>
        </div>
        <Grid
          container
          spacing={2}
          style={{
            marginTop: 8,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {extents.map((action) => (
            <Grid item>
              <ExtentCard {...action} />
            </Grid>
          ))}
        </Grid>
        <CustomButton>Summarize</CustomButton>
      </div>
    </Modal>
  );
};

export const ChallengeModal = ({ open, handleClose }) => {
  const classes = modalStyles();
  return (
    <Modal open={open} onClose={handleClose} className={classes.modalRoot}>
      <div className={classes.root} style={{ height: "60%", width: "35%" }}>
        <div className={classes.header}>
          <Typography className={classes.text} style={{ opacity: 0.6 }}>
            Hmm, looks like you’re losing focus pretty often. Research proves
            that humans are more attentive when challenged. Here’s a small
            challenge from our side to yours, this will help you get energized.
            Feel free to take a drinking break as well.
          </Typography>
        </div>

        <Button
          className={classes.redBtn}
          style={{
            backgroundColor: "black",
            padding: 12,
            paddingLeft: 30,
            paddingRight: 30,
            margin: 20,
          }}
        >
          Challenge Me
        </Button>

        <Button className={classes.redBtn}>No take me back</Button>
      </div>
    </Modal>
  );
};

export const CallibarationModal = ({ open, handleClose }) => {
  const classes = modalStyles();
  var colors = [
    "#393E41",
    "#E94F37",
    "#1C89BF",
    "#A1D363",
    "#C70039",
    "#85FFC7",
    "#297373",
    "#FF8552",
    "#36908e ",
    "#FFC300 ",
    "#449036",
    "#581845",
    "#337dff ",
    "#838720 ",
    "#873690",
    "#AF8553",
  ];
  return (
    <Modal open={open} onClose={handleClose} className={classes.modalRoot}>
      <div className={classes.root} style={{ height: "100%", width: "100%" }}>
        <Grid
          container
          spacing={2}
          style={{
            marginTop: 8,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {colors.slice(0,14).map((color, idx) => (
            <>
            <div
              className={classes.circle}
              style={{
                backgroundColor: color,
                textAlign: "center",
                cursor: "pointer",
              }}
              id={`ball-${idx}`}
              onClick={(event) => {
                event.target.style.opacity =
                  window
                    .getComputedStyle(event.target)
                    .getPropertyValue("opacity") - 0.2;
              }}
            >
              <Typography
                className={classes.text}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  let divx = document.getElementById(`ball-${idx}`);
                  divx.click();
                }}
                style={{ fontSize: 20, padding: 0, color: "white" }}
              >
                {idx}
              </Typography>
            </div>
            {idx==3?<div style={{width:"100%"}}></div>:idx==4?<div style={{width:"100%"}}></div>:idx==5?(
                      <><Typography className={classes.text} style={{ opacity: 0.6, width:"50%",margin:"0 auto",textAlign:"center",marginTop:10 }}>
                          Help us callibarate the attention span tracker. Click on the
                          colorful balls in order while focussing your eyes on the ball. This
                          will help the tracker adjust to your eye movements and your
                          surrounding environment settings.
                          <br/>
                          <Button className={classes.redBtn} style={{
                          backgroundColor: "black",
                          padding: 12,
                          paddingLeft: 30,
                          paddingRight: 30,
                          margin: 20,
                        }}
                        onClick={handleClose}
                        >Click on this when all balls disappear!</Button>
                        </Typography>
                        
                       </>
                  )
          :idx==9?<div style={{width:"100%"}}></div>:<></>
          }
            </>
          ))}
        
        </Grid>
        
      </div>
    </Modal>
  );
};
