import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "./../configs/axiosConfigs.js";

const UserAuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshUser = async (token = accessToken) => {
    if (!token) return false;
    try {
      const userRes = await API_URL.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userRes?.data?.success) {
        setUser(userRes.data.user);
      }
    } catch (error) {
      console.error("refreshUser failed", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const getNewAccessToken = async () => {
      try {
        const response = await API_URL.post("/api/users/refresh");
        if (response?.data?.success) {
          const token = response?.data?.accessToken;
          setAccessToken(token);
          await refreshUser(token);
        }
      } catch {
        console.log("No active session");
        setAccessToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };
    getNewAccessToken();
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        authLoading,
        refreshUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

const useAuth = () => useContext(UserAuthContext);

export { AuthProvider, useAuth };
