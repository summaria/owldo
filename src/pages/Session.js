import React from "react";
import NavLayout from "../Layouts/NavLayout";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Clock } from "react-feather";
import CustomButton from "../components/CustomButton";
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

const Session = () => {
  const classes = useStyles();
  return (
    <>
      <NavLayout>
        <Grid container className={classes.navbar}>
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h5" style={{ color: "white" }}>
              Title
            </Typography>
          </Grid>
          <Grid item className={classes.timer}>
            <Clock style={{ marginRight: 8 }} /> 10:00
          </Grid>
        </Grid>
        <Grid container style={{ height: "100%" }}>
          <Grid container item xs={9} style={{ height: "100%" }}>
            <iframe
              src="https://firebasestorage.googleapis.com/v0/b/owldo-96e1b.appspot.com/o/Photosynthesis.pdf?alt=media&token=5d690373-ead8-4988-af63-73c2548607de"
              style={{ height: "100%", width: "100%" }}
              zoom="80%"
            />
          </Grid>
          <Grid container className={classes.sidebar} item xs={3}>
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
                styles={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "2% 8%",
                }}
              >
                Generate a summary
              </CustomButton>
              <CustomButton
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
          </Grid>
        </Grid>
      </NavLayout>
    </>
  );
};

export default Session;
