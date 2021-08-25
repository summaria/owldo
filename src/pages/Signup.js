import React from "react";
import { useAuth } from "../firebase";

const Signup = () => {
  const { googleSignin } = useAuth();

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Signup</h1>
      <form onSubmit={() => {}}>
        or
        <button onClick={googleSignin}> google Signin </button>
      </form>
    </div>
  );
};

export default Signup;
