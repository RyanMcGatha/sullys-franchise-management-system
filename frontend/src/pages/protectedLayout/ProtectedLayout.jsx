import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Nav from "../../components/nav/Nav";
import RightNav from "../../components/nav/RightNav";

import "./protectedLayout.css";

const ProtectedLayout = () => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/" />;
  }
  return (
    <div className="main-layout">
      <div className="body">
        <div className="navLayout">
          <Nav />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
