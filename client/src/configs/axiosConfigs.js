import axios from "axios";

const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API_URL.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config; //

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/auth/refresh");
        const newAccessToken = response?.data?.accessToken;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); //
      } catch (_err) {
        return Promise.reject(_err); //
      }
    }

    return Promise.reject(err); //
  }
);

export { API_URL };
