import { firestore } from "../firebase/config";
import firebase from "firebase";

const USERS = "users";

const createUser = async ({ uid }) => {
  await firestore.collection(USERS).doc(uid).set({ id: uid, sessions: [] });
};

const addSessionToUser = async ({ sessionId, userId }) => {
  await firestore
    .collection(USERS)
    .doc(userId)
    .update({
      sessions: firebase.firestore.FieldValue.arrayUnion(sessionId),
    });
};

const getUser = async ({ uid }) => {
  try {
    return (await firestore.collection(USERS).doc(uid).get()).data();
  } catch (err) {
    console.log(err);
    return null;
  }
};

const userAPI = {
  createUser,
  addSessionToUser,
  getUser,
};

export default userAPI;
