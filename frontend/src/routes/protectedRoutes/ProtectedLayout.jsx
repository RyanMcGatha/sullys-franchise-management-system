import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { motion } from "framer-motion";

const ProtectedLayout = ({}) => {
  return (
    <>
      <div className="flex bg-neutral-100 w-screen overflow-hidden">
        <motion.div
          className="h-screen"
          initial={{ marginRight: 0 }}
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
        <div className="w-full h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
