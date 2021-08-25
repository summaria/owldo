import React, { useRef, useState } from "react";
import { Button, Grid, InputBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../firebase/config";

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
  const [fileURL, setfileURL] = useState("");

  const handleSubmit = () => {
    //TODO: function to store to db
  };
  const handleImageUpload = (e) => {
    // TODO: function to upload images to gcp buckets.
    const reader = new FileReader();
    let file = e.target.files[0]; // get the supplied file

    if (file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(async () => {
        let URL = await fileRef.getDownloadURL();
        setfileURL(URL);
      });
    } else {
      alert("Please upload an file first.");
    }
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
          New session {fileURL}
        </Typography>
        <InputBase fullWidth placeholder="Upload your pdf" />
        <input type="file" hidden ref={ref} accept = ".pdf, .txt" onChange={handleImageUpload} />
        <img
          onClick={() => ref.current.click()}
          src={process.env.PUBLIC_URL + "/images/upload.png"}
        ></img>
        <Button onClick={handleSubmit}>Upload</Button>
      </Grid>
      <Grid item xs={5} container className={classes.right}>
        {fileURL === "" ? (
          <Typography variant="h2" className={classes.rightHeader}>
            Almost there...
          </Typography>
        ) : (
          <iframe src={fileURL} style={{ height: '80%', width: '70%' }} />
        )}
      </Grid>
    </Grid>
  );
};

export default CreateSession;
