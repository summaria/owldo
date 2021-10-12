import React, { useContext, useState, useEffect } from "react";
import { auth, firestore, googleProvider } from "./config";
import { FIRESTORE } from "../api";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const logout = () => {
    return auth.signOut();
  };

  const googleSignin = async () => {
    try {
      await auth.signInWithPopup(googleProvider).then(async (user) => {
        if (user.additionalUserInfo.isNewUser) {
          // API call for adding new user
          await FIRESTORE.createUser({
            uid: user.user.uid,
          });
        }
      });
    } catch (e) {
      setErrors(e.message);
    }
  };

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    setCurrentUser({
      uid: "n3972cbCDrSyYxeKrTHiNJ9Na5R2",
      displayName: "avinash vk",
      photoURL:
        "https://lh3.googleusercontent.com/a-/AOh14GgtedYz4bdsVF9r06C8pXg00MOwDIuxxndA2gR8nA=s96-c",
      email: "avinash2000vk@gmail.com",
      emailVerified: true,
      phoneNumber: null,
      isAnonymous: false,
      tenantId: null,
      providerData: [
        {
          uid: "105344469101506514529",
          displayName: "avinash vk",
          photoURL:
            "https://lh3.googleusercontent.com/a-/AOh14GgtedYz4bdsVF9r06C8pXg00MOwDIuxxndA2gR8nA=s96-c",
          email: "avinash2000vk@gmail.com",
          phoneNumber: null,
          providerId: "google.com",
        },
      ],
      apiKey: "AIzaSyBmpEMBtzQARFev8_LhdmOgsMvipV5KvP8",
      appName: "[DEFAULT]",
      authDomain: "owldo-96e1b.firebaseapp.com",
      stsTokenManager: {
        apiKey: "AIzaSyBmpEMBtzQARFev8_LhdmOgsMvipV5KvP8",
        refreshToken:
          "AFxQ4_pZDnp9Txth-yhiDY6f-RBKCMPsV_1YHFWaBg4qSD4VgtA2EaLuLfls03vXWCKDdscebpPQ7Jcq44_8HHA9o9Fti4EEO3cUWetI1J2kph0VXIAjJtmLeH07Gm1KWEPfHIPiNeEBfcOIxYfM3OjnmoJjS4ipbLEZjqZwXH5OvxqsfKMNX-6TezkZx8OzZQWsHRPSWgAOy9JKSNgWX4dnQqATTWHzjgfsUo3rEKcbnIUe1cLKe9k4e6_0E1U5R3hl03Ds-wu2J5op4HAdbc8kGefCyEsXXEcb0AvSuGXf27m7R4ulGfDMv2SSJkRR9ftiSCeX9liwl2OCMkXAj8yxc4GA_AvD0pBn7qbgQjj52mVXc2zDYnSe0tpae8tFDXelMbtLoqXK7xCut2BMU0aO5DQDsj3Leb2nCyyb8czWJIFLwBkk0f4",
        accessToken:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwNTM4MmFlMTgxYWJlNjFiOTYwYjA1Yzk3ZmE0MDljNDdhNDQ0ZTciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYXZpbmFzaCB2ayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ3RlZFl6NGJkc1ZGOXIwNkM4cFhnMDBNT3dESXV4eG5kQTJnUjhuQT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9vd2xkby05NmUxYiIsImF1ZCI6Im93bGRvLTk2ZTFiIiwiYXV0aF90aW1lIjoxNjMzOTc1ODY2LCJ1c2VyX2lkIjoibjM5NzJjYkNEclN5WXhlS3JUSGlOSjlOYTVSMiIsInN1YiI6Im4zOTcyY2JDRHJTeVl4ZUtyVEhpTko5TmE1UjIiLCJpYXQiOjE2MzQwMTM3OTUsImV4cCI6MTYzNDAxNzM5NSwiZW1haWwiOiJhdmluYXNoMjAwMHZrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA1MzQ0NDY5MTAxNTA2NTE0NTI5Il0sImVtYWlsIjpbImF2aW5hc2gyMDAwdmtAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.IGGPP6ShvGZUWteSjmCdo79VFIQzSDMgrz0LT4uVWBODbJpTDJn9ktdvSTkfgHCAThlVZkudYiAabdhI1cxAAyHLt-s3KM1ez3iA6ru6LdeNB8CqZD-UL9P0fFgVru54KTM7njwCf8_QCbQltaAqR7dFLF4zLds26PSpfqHKdrMTggz8Q16p5YOtG_U4vfaqpTxnJ00yRnA0R8PB6GAkxBbH86tz8AUoAu6QF5ukkl8xl3X9wiNU2yUnKZsrT7FfJ5PTHvHI01LtKQoA36IHP0UN64MeCdke_njy1QeunaMBrR37olTSIWVT0mTN7hYvWIs4jvPePK9DyyizhhyD0g",
        expirationTime: 1634017393652,
      },
      redirectEventId: null,
      lastLoginAt: "1633975866303",
      createdAt: "1624381231492",
      multiFactor: {
        enrolledFactors: [],
      },
    });
    setLoading(false);
    // });

    // return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        googleSignin,

        logout,
        errors,
        setErrors,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
