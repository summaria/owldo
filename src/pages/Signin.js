import React from "react";
import GoogleSigninButton from "../components/GoogleSigninButton";
import { useAuth } from "../firebase";
import { makeStyles } from "@material-ui/styles";
import NavLayout from "../Layouts/NavLayout";

const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    padding: "4%",
    border: "1px solid #e4e4e4",
    backgroundColor:"#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "&:hover":{
        boxShadow: "0px 1px 1px #00BFA6",
        transition: "0.5s ease-in-out"
    }
  },
}));

const Signin = () => {
  const { googleSignin } = useAuth();
  const classes = useStyles();
  return (
    <NavLayout>
      <div className={classes.container}>
        <div className={classes.box}>
          <h1 style={{fontFamily:"Poppins"}}>Sign in to continue</h1>
          <GoogleSigninButton
            logo="https://skipway.com/wp-content/uploads/2020/05/image-20150902-6700-t2axrz.jpg"
            content="Sign in with Google"
            handleClick={googleSignin}
          />
        </div>
      </div>
    </NavLayout>
  );
};

export default Signin;
