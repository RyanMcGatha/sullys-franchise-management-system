import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { motion } from "framer-motion";
import { useAuth } from "../../AuthContext";

const ProtectedLayout = () => {
  const { session } = useAuth();
  return session ? (
    <>
      <div className="flex bg-slate-200 w-screen overflow-hidden">
        <motion.div
          className="h-screen"
          initial={{ marginRight: 30 }}
          whileHover={{
            marginRight: 160,
            transition: {
              type: "spring",
              mass: 1,
              stiffness: 200,
              damping: 15,
            },
          }}
        >
          <Nav />
        </motion.div>
        <div className="w-full px-6 h-screen">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default ProtectedLayout;
