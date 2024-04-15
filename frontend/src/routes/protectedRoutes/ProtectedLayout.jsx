import { Outlet } from "react-router-dom";

import Nav from "./components/Nav";

const ProtectedLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
