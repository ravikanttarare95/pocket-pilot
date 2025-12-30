import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "./../configs/axiosConfigs.js";

const UserAuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); 
      }
    };
    getNewAccessToken();
  }, []);

  return (
    <UserAuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken, loading }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

const useAuth = () => useContext(UserAuthContext);

export { AuthProvider, useAuth };
