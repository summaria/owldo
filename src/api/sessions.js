import { firestore } from "../firebase/config";
import userAPI from "./users";

const SESSIONS = "session";
const API_SERVER_URL = "http://localhost:8080/api/v1";

const createSession = async ({ title, fileURL, userId }) => {
  const newSession = await firestore.collection(SESSIONS).doc();
  await firestore.collection(SESSIONS).doc(newSession.id).set({
    id: newSession.id,
    title,
    fileURL,
  });
  await userAPI.addSessionToUser({
    sessionId: newSession.id,
    userId: userId,
  });
  return newSession.id;
};

const setupSession = async ({ fileURL, sessionId }) => {
  try {
    await fetch(API_SERVER_URL + "/session/setup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileURL,
        sessionId,
      }),
    });
  } catch (err) {
    console.log("Error setting up session", err);
  }
};

const getSession = async ({ sessionId }) => {
  try {
    return await (
      await firestore.collection(SESSIONS).doc(sessionId).get()
    ).data();
  } catch (err) {
    console.log(err);
    return null;
  }
};

const sessionAPI = {
  createSession,
  getSession,
  setupSession,
};
export default sessionAPI;
