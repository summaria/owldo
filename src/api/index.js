import userAPI from "./users";
import sessionAPI from "./sessions";

export default {
  ...userAPI,
  ...sessionAPI,
};
