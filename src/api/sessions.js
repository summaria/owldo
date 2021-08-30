import { firestore } from "../firebase/config";
import userAPI from "./users";

const SESSIONS = "session";

const createSession = async ({ title, fileURL, userId }) => {
  const newSession = await firestore.collection(SESSIONS).doc();
  console.log(newSession);
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
};
export default sessionAPI;
