import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { motion } from "framer-motion";

const ProtectedLayout = () => {
  return (
    <>
      <div className="flex bg-slate-200 w-screen overflow-hidden">
        <motion.div
          className="h-screen w-fit"
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
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
