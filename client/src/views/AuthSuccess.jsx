import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "./../context/UserAuthContext.jsx";
import { API_URL } from "./../configs/axiosConfigs.js";
import AuthLoading from "./../components/authentication/AuthLoading.jsx";

function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const navigate = useNavigate();
  const { setUser, setAccessToken, refreshUser } = useAuth();

  const handleAuth = async () => {
    if (!accessToken) return; //////////////
    try {
      setAccessToken(accessToken);
      const success = await refreshUser(accessToken);
      if (!success) {
        setTimeout(() => {
          toast.success("Login Successful");
          navigate("/dashboard", { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `${error?.response?.data?.message}` || "Google Authentication failed"
      );
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  useEffect(() => {
    handleAuth();
  }, [accessToken]);
  return <AuthLoading loadingDesc={"Logging you in securely..."} />;
}

export default AuthSuccess;
