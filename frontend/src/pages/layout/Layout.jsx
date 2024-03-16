import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg">
      <Outlet />
    </div>
  );
};

export default Layout;
