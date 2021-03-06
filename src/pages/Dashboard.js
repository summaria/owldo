import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/config";

import { useAuth } from "../firebase";
import { useHistory } from "react-router-dom";

import { Grid, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SessionCard from "../components/SesssionCard";
import NavLayout from "../Layouts/NavLayout";
import ActionCard from "../components/ActionCard";
import CustomButton from "../components/CustomButton";

const data = {
  sessions: [
    {
      title: "The well being research",
      date: "23rd February",
    },
    {
      title: "Capstone research",
      date: "20th February",
    },
  ],
  actions: [
    {
      title: "Generate text summaries",
      src: "https://png.pngtree.com/element_our/png_detail/20181227/txt-vector-icon-png_287421.jpg",
    },
    {
      title: "Make automated quizzes",
      src: "https://png.pngtree.com/element_our/png_detail/20181227/txt-vector-icon-png_287421.jpg",
    },
    {
      title: "Track your progress",
      src: "https://png.pngtree.com/element_our/png_detail/20181227/txt-vector-icon-png_287421.jpg",
    },
  ],
};

const useDashboardStyles = makeStyles(() => ({
  title: {},
  date: {},
  image: {
    height: 60,
    width: 60,
  },
}));

const Dashboard = () => {
  const { logout, currentUser } = useAuth();
  const history = useHistory();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useDashboardStyles();

  const getSessions = async () => {
    const userRef = firestore.collection("users").doc(currentUser.uid);
    return await userRef.get().then(async (user) => {
      if (!user.exists) {
        console.log("No user found!");
        return [];
      } else {
        let userSessions = user.data().sessions;
        let sessions = await Promise.all(
          userSessions.map(async (userSession) =>
            (
              await firestore.collection("session").doc(userSession).get()
            ).data()
          )
        );
        return sessions;
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    getSessions().then((sessions) => {
      setSessions(sessions);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Typography style={{ fontSize: 30, textAlign: "center" }}>
      Loading...
    </Typography>
  ) : (
    <>
      <NavLayout>
        <Grid container style={{ margin: "0% 2% 0% 2%" }}>
          <Grid xs={12}>
            <h1>Hey {currentUser.displayName},</h1>
            <Grid container>
              <Grid xs={6}>
                <Typography>Continue from where you left off</Typography>
                {sessions?.map((session) => (
                  <SessionCard {...session} />
                ))}
                <div style={{ marginTop: 24 }}>
                  <CustomButton onClick={() => history.push("/create-session")}>
                    Start a session
                  </CustomButton>
                </div>
              </Grid>
              <Grid xs={6}>
                <Typography>What's on your mind today?</Typography>
                <Grid container spacing={4} style={{ marginTop: 8 }}>
                  {data.actions.map((action) => (
                    <Grid item>
                      <ActionCard {...action} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </NavLayout>
    </>
  );
};

export default Dashboard;
