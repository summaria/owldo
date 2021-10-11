import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

import { useLocation } from "react-router-dom";
import NavLayout from "../Layouts/NavLayout";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Clock } from "react-feather";
import CustomButton from "../components/CustomButton";
import { FIRESTORE } from "../api";
import { QuestionModal, SummaryExtentModal } from "../components/Modals";
import { WebGazeProvider, useWebGazer } from "../webgazer";

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: "#00BFA6",
    width: "100%",
    display: "flex",
    padding: "1% 2%",
    flex: 1,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderBottom: "1px solid rgba(0,0,0,0.25)",
  },
  timer: {
    flexShrink: 1,
    flexGrow: 0,
    display: "flex",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebar: {
    backgroundColor: "#00BFA6",
  },
}));

const Session = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const [setupLoading, setSetupLoading] = useState(true);
  const [session, setSession] = useState({});
  const sessionID = window.location.href.split("/").pop();
  //console.log(sessionID)

  const [modal, setModal] = React.useState(0);
  const handleClose = () => setModal(0);

  const handleQuestionModal = (event) => {
    setModal(1);
  };

  const handleBreakModal = (event) => {
    setModal(2);
  };

  const handleSummaryExtentModal = (event) => {
    setModal(3);
  };

  const handleChallengeModal = (event) => {
    setModal(4);
  };

  const getSession = async () => {
    const sessRef = firestore.collection("session").doc(sessionID);
    const s = await sessRef.get();
    let sessionData = s.data();
    setSession(sessionData);
    if (!sessionData?.setup) {
      await FIRESTORE.setupSession({
        fileURL: sessionData?.fileURL,
        sessionId: sessionID,
      });
      setSession((await sessRef.get()).data());
    }
    setSetupLoading(false);
  };

  useEffect(() => {
    getSession();
    //console.log(session.title)
  }, []);

  const handleQuestionPopup = () => {
    setModal(1);
  };

  return (
    <>
      <NavLayout>
        <QuestionModal
          handleClose={() => setModal(0)}
          open={modal === 1}
          questions={session.questions}
        />
        <SummaryExtentModal
          handleClose={() => setModal(0)}
          open={modal === 2}
        />
        <Grid container className={classes.navbar}>
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h5" style={{ color: "white" }}>
              {session.title}
            </Typography>
          </Grid>
          <Grid item className={classes.timer}>
            <Clock style={{ marginRight: 8 }} /> 10:00
          </Grid>
        </Grid>
        <Grid container style={{ height: "100%" }}>
          <Grid container item xs={9} style={{ height: "100%" }}>
            <iframe
              src={session.fileURL}
              style={{ height: "100%", width: "100%" }}
              zoom="80%"
            />
          </Grid>
          <Grid container className={classes.sidebar} item xs={3}>
            {setupLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <CustomButton
                    onClick={() => setModal(2)}
                    styles={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "2% 8%",
                    }}
                  >
                    Generate a summary
                  </CustomButton>
                  <CustomButton
                    onClick={handleQuestionPopup}
                    styles={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "2% 8%",
                      marginTop: 12,
                    }}
                  >
                    Test me
                  </CustomButton>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  <img
                    src="https://circuits4you.com/wp-content/uploads/2019/01/line_chart_ESP8266.png"
                    style={{ width: "90%", height: "30%", borderRadius: 8 }}
                  />
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </NavLayout>
    </>
  );
};

const WebGazerSession = () => {
  return (
    <WebGazeProvider>
      <Session />
    </WebGazeProvider>
  );
};

export default WebGazerSession;
