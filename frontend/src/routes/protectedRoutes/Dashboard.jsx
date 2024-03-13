import React, { useState } from "react";
import ShowAccountBtn from "../../components/ShowAccountBtn";
import Nav from "../../components/Nav";

import "./dashboard.css";

const Dashboard = ({ session }) => {
  return (
    <>
      <Nav session={session} />
      <div className="main-dashboard">
        <h1>Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
