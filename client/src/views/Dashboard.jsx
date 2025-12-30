import { Navigate, Outlet } from "react-router";
import Navbar from "./../components/Navbar.jsx";
import Sidebar from "./../components/Sidebar.jsx";
import Footer from "./../components/Footer.jsx";
import { useAuth } from "./../context/UserAuthContext.jsx";
import AuthLoading from "./../components/authentication/AuthLoading.jsx";

function Dashboard() {
  const { accessToken, authLoading } = useAuth();

  if (authLoading) return <AuthLoading loadingDesc={"Verifying session..."} />;

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
