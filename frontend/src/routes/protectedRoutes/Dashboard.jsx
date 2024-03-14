import React, { useState } from "react";
import ShowAccountBtn from "../../components/ShowAccountBtn";
import Nav from "../../components/Nav";
import { useAuth } from "../../AuthContext";
import { supabase } from "../../config/supabaseConfig";

import "./dashboard.css";

const Dashboard = ({ session }) => {
  return (
    <>
      <div className="main-dashboard">
        <Nav session={session} />
        <div className="body">
          <h1>Dashboard</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
