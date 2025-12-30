import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "./../context/UserAuthContext.jsx";
import { API_URL } from "./../configs/axiosConfigs.js";

function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuth();

  const handleAuth = async () => {
    if (!accessToken) return;
    try {
      const response = await API_URL.get(`/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response?.data?.success) {
        setAccessToken(accessToken);
        setUser(response?.data?.user);

        toast.success(response?.data?.message);

        setTimeout(() => {
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
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-700">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-lg md:text-xl font-medium animate-pulse">
          Logging you in securely...
        </p>
      </div>
    </div>
  );
}

export default AuthSuccess;
