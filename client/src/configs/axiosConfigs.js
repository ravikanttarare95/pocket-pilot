import axios from "axios";

const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API_URL.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config; //

    if (originalRequest.url.includes("/api/users/refresh")) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await API_URL.post("/api/users/refresh");
        const newAccessToken = response?.data?.accessToken;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API_URL(originalRequest); // retry original request
      } catch (refreshError) {
        return Promise.reject(refreshError); //
      }
    }

    return Promise.reject(err); //
  }
);

export { API_URL };
