import React, { useRef, useState } from "react";
import {
  Button,
  Grid,
  InputBase,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundColor: "#f4f4f4",
  },
  left: {
    padding: "4%",
  },
  right: {
    backgroundColor: "#00BFA6",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightHeader: {
    color: "#FFF",
  },
  titleField: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    "& label.Mui-focused": {
      color: "#00BFA6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#00BFA6",
    },
  },
  subtitle: {
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: "bold",
    marginTop: "5%",
  },
  btn: {
    backgroundColor: "#00BFA6",
    borderRadius: 8,
    color: "#FFF",
    padding: "1% 2.5%",
    textTransform: "none",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#00BFA6",
      opacity: 0.8,
    },
  },
  img: {
    transition: "transform 0.8s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
    },
  },
}));

const CreateSession = () => {
  const classes = useStyles();
  const handleSubmit = () => {
    //TODO: function to store to db
  };
  const handleImageUpload = () => {
    // TODO: function to upload images to gcp buckets.
  };
  const [title, setTitle] = useState();
  const ref = useRef();
  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item xs={7} className={classes.left}>
        <Typography
          variant="h4"
          style={{ color: "#00BFA6", fontWeight: "bold" }}
        >
          New session
        </Typography>
        <Typography variant="h6" className={classes.subtitle}>
          Naming your sessions help you keep track of different sessions better.
          What would you like to name it?
        </Typography>
        <TextField
          fullWidth
          label="Session Name*"
          className={classes.titleField}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Typography variant="h6" className={classes.subtitle}>
          Upload where you're planning to learn from or attach a link.
        </Typography>

        <input type="file" hidden ref={ref} />
        <Grid container style={{ padding: "5%" }}>
          <Grid item xs={6} container justify="center">
            <img
              className={classes.img}
              onClick={() => ref.current.click()}
              src={process.env.PUBLIC_URL + "/images/upload.png"}
            ></img>
          </Grid>
          <Grid item xs={6} container justify="center">
            <img
              className={classes.img}
              onClick={() => ref.current.click()}
              src={process.env.PUBLIC_URL + "/images/attach-url.png"}
            ></img>
          </Grid>
        </Grid>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "8%",
          }}
        >
          <Button
            onClick={handleSubmit}
            className={classes.btn}
            disableRipple
            disableFocusRipple
          >
            Create Session
          </Button>
        </div>
      </Grid>
      <Grid item xs={5} container className={classes.right}>
        <Typography variant="h2" className={classes.rightHeader}>
          Almost there...
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CreateSession;
