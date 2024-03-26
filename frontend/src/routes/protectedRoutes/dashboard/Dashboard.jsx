import "./dashboard.css";

import React, { useEffect, useState } from "react";

import Locations from "./dashPages/addLocation/Locations";
import AllLocations from "./dashPages/allLocations/AllLocations";
import AddUser from "./dashPages/addUser/AddUser";
import AllUsers from "./dashPages/allUsers/AllUsers";

import { supabase } from "../../../config/supabaseConfig";
import { useAuth } from "../../../AuthContext";

const Dashboard = () => {
  const [addLocations, setAddLocations] = useState(false);
  const [showAllLocations, setShowAllLocations] = useState(true);
  const [addUsers, setAddUsers] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const { session } = useAuth();
  useEffect(() => {
    async function fetchRole() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id);

        if (error) {
          throw error;
        }
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchRole();
  }, []);

  return (
    <div className="main-dashboard">
      Dashboard
      <div className="cards">
        <div className="actionCards">
          <button
            className={`actionCard ${!showAllLocations ? "whiteButton" : ""}`}
            type="radio"
            name="action"
            value="showAllLocations"
            checked={showAllLocations}
            onClick={() => {
              setShowAllLocations(true);
              setAddLocations(false);
              setAddUsers(false);
              setShowAllUsers(false);
            }}
          >
            <label className="actionContent">View All Locations</label>
          </button>
          <button
            className={`actionCard ${!addLocations ? "whiteButton" : ""}`}
            type="radio"
            name="action"
            value="addLocations"
            checked={addLocations}
            onClick={() => {
              setAddLocations(true);
              setShowAllLocations(false);
              setAddUsers(false);
              setShowAllUsers(false);
            }}
          >
            <label className="actionContent">Add Locations</label>
          </button>
          <button
            className={`actionCard ${!showAllUsers ? "whiteButton" : ""}`}
            type="radio"
            name="action"
            value="showAllUsers"
            onClick={() => {
              setAddLocations(false);
              setShowAllLocations(false);
              setAddUsers(false);
              setShowAllUsers(true);
            }}
          >
            <label className="actionContent">View All Users</label>
          </button>
          <button
            className={`actionCard ${!addUsers ? "whiteButton" : ""}`}
            type="radio"
            name="action"
            value="addUsers"
            onClick={() => {
              setAddLocations(false);
              setShowAllLocations(false);
              setAddUsers(true);
              setShowAllUsers(false);
            }}
          >
            <label className="actionContent">Add Users</label>
          </button>
        </div>

        <div className="displayWindow">
          {addLocations && <Locations />}
          {showAllLocations && <AllLocations />}
          {addUsers && <AddUser />}
          {showAllUsers && <AllUsers />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
