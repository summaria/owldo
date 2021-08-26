import React, { useRef, useState } from "react";
import { Button, Grid, Typography, TextField, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../firebase/config";

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
  modal: {
    padding: "2%",
    backgroundColor: "#FFF",
    outline: 0,
    height: "30%",
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "2%",
  },
}));

const CreateSession = () => {
  const classes = useStyles();
  const [fileURL, setfileURL] = useState("");
  const [title, setTitle] = useState();
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const handleSubmit = () => {
    //TODO: function to store to db
  };
  const handleImageUpload = (e) => {
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
    <Grid container direction="row" className={classes.root}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="link-modal"
        aria-describedby="link-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={classes.modal}>
          <Typography variant="h5">Enter your PDF/doc link here:</Typography>

          <TextField
            fullWidth
            label="Link"
            className={classes.titleField}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button
            className={classes.btn}
            style={{ marginTop: "4%" }}
            onClick={(e) => {
              setfileURL(link);
              setOpen(false);
            }}
          >
            Done
          </Button>
        </div>
      </Modal>
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

        <input
          type="file"
          hidden
          ref={ref}
          accept=".pdf, .txt"
          onChange={handleImageUpload}
        />
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
              onClick={() => setOpen(true)}
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
        {fileURL === "" ? (
          <Typography variant="h2" className={classes.rightHeader}>
            Almost there...
          </Typography>
        ) : (
          <iframe src={fileURL} style={{ height: "80%", width: "70%" }} />
        )}
      </Grid>
    </Grid>
  );
};

export default CreateSession;
