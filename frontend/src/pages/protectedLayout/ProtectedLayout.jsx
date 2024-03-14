import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Nav from "../../components/nav/Nav";
import "./protectedLayout.css";

const ProtectedLayout = () => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/" />;
  }
  return (
    <div className="main-layout">
      <div className="nav-layout">
        <Nav />
      </div>
      <div className="outlet-layout">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
