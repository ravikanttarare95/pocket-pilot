import axios from "axios";

const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export { API_URL };
