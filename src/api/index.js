import userAPI from "./users";
import sessionAPI from "./sessions";

export const FIRESTORE = {
  ...userAPI,
  ...sessionAPI,
};
