import React, { useRef } from "react";
import { Button, Grid, InputBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  left: {
    backgroundColor: "#f4f4f4",
  },
  right: {
    backgroundColor: "#00BFA6",
    borderTopLeftRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightHeader: {
    color: "#FFF",
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

  const ref = useRef();
  return (
    <Grid
      container
      direction="row"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Grid item xs={7} className={classes.left}>
        <Typography variant="h5" style={{ color: "#00BFA6" }}>
          New session
        </Typography>
        <InputBase fullWidth placeholder="Upload your pdf" />
        <input type="file" hidden ref={ref} />
        <img
          onClick={() => ref.current.click()}
          src={process.env.PUBLIC_URL + "/images/upload.png"}
        ></img>
        <Button onClick={handleSubmit}>Upload</Button>
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
