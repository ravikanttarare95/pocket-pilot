import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "./../configs/axiosConfigs.js";

const UserAuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const getNewAccessToken = async () => {
      try {
        const response = await API_URL.post("/api/users/refresh");
        setAccessToken(response?.data?.accessToken);
        setUser(response?.data?.user);
      } catch {
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
      value={{ user, setUser, accessToken, setAccessToken, authLoading }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

const useAuth = () => useContext(UserAuthContext);

export { AuthProvider, useAuth };
