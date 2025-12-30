import { Navigate, Outlet } from "react-router";
import Navbar from "./../components/Navbar.jsx";
import Sidebar from "./../components/Sidebar.jsx";
import Footer from "./../components/Footer.jsx";
import { useAuth } from "./../context/UserAuthContext.jsx";

function Dashboard() {
  const { accessToken, loading } = useAuth();

  if (loading) return <p>Checking session...</p>;

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
