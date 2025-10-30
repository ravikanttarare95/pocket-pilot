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

const transactions = [
  {
    date: "29-10-2025  9:57:55",
    category: "salary",
    description:
      "Job Salary sdkb aashdkba sdbkba kabdkb bkbqwdh sdkjb sdjnbsd kjjnsdd ",
    amount: 751,
    type: "income",
  },
  {
    date: "28-10-2025  17:30:00",
    category: "education",
    description: "Dinner with friends",
    amount: 420,
    type: "expense",
  },
  {
    date: "28-10-2025  17:30:00",
    category: "food",
    description: "Dinner with friends",
    amount: 420,
    type: "income",
  },
  {
    date: "28-10-2025  17:30:00",
    category: "shopping",
    description: "Dinner with friends",
    amount: 420,
    type: "expense",
  },
];

export { getloggedInUser, transactions };
