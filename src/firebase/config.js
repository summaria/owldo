import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const fbConfig = {
  apiKey: "AIzaSyBmpEMBtzQARFev8_LhdmOgsMvipV5KvP8",
  authDomain: "owldo-96e1b.firebaseapp.com",
  projectId: "owldo-96e1b",
  storageBucket: "owldo-96e1b.appspot.com",
  messagingSenderId: "605956127494",
  appId: "1:605956127494:web:3d65fa316440bb61e3fc87",
  measurementId: "G-DEFN3XLMEX",
}; // add firebase config here

const app = firebase.initializeApp(fbConfig);
export default app;

export const storage = firebase.storage();

export const auth = app.auth();
export const firestore = app.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
