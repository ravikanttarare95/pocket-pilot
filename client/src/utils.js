import { jwtDecode } from "jwt-decode";

const getloggedInUser = () => {
  //   return JSON.parse(localStorage.getItem("loggedInUser")) || null;

  try {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token");

    if (!loggedInUser || !token) return null;

    const decoded = jwtDecode(token);
    const expTimeSec = decoded?.exp; // decoded.exp since 1 Jan 1970 in seconds

    const currentTimeMilli = Date.now(); //current since 1 Jan 1970 in milliseconds
    const currentTimeSec = currentTimeMilli / 1000;

    if (expTimeSec && currentTimeSec > expTimeSec) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      return null;
    }
    return JSON.parse(loggedInUser);
  } catch (error) {
    console.error("Error getting logged-in user:", error);
    return null;
  }
};

export { getloggedInUser };
