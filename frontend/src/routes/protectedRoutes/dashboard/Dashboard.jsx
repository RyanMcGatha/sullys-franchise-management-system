import "./dashboard.css";

import React, { useEffect, useState } from "react";

import Locations from "./dashPages/addLocation/Locations";
import AllLocations from "./dashPages/allLocations/AllLocations";
import AddUser from "./dashPages/addUser/AddUser";
import AllUsers from "./dashPages/allUsers/AllUsers";
import Nav from "../../../components/nav/Nav";
import NavMobile from "../../../components/nav/NavMobile";

import { supabase } from "../../../config/supabaseConfig";
import { useAuth } from "../../../AuthContext";

const Dashboard = () => {
  const [addLocations, setAddLocations] = useState(false);
  const [showAllLocations, setShowAllLocations] = useState(true);
  const [addUsers, setAddUsers] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [role, setRole] = useState("");
  const { session } = useAuth();

  const [isNavVisible, setIsNavVisible] = useState(false);

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
        setRole(data[0].role); // Assuming 'data' is an array of profiles
      } catch (error) {
        console.error("Error fetching role: ", error.message);
      }
    }
    fetchRole();
  }, [session.user.id]);

  return (
    <div className="main-dashboard">
      <div className="topRowDashboard">
        <button
          className="nav-toggle"
          onClick={() => setIsNavVisible(!isNavVisible)}
        >
          <img
            className="logoClick"
            alt=""
            src="https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png"
          />
        </button>
        {isNavVisible && (
          <div className="mobileCards">
            <div className="actionCards">
              <button
                className={`actionCard ${
                  !showAllLocations ? "whiteButton" : ""
                }`}
                type="radio"
                name="action"
                value="showAllLocations"
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
              <button
                className={`actionCard ${!addUsers ? "whiteButton" : ""}`}
                type="radio"
                name="action"
                value="addUsers"
                onClick={() => {
                  supabase.auth.signOut();
                }}
              >
                <label className="actionContent">Sign Out</label>
              </button>
            </div>
          </div>
        )}
        <div className="locationsTxt">Locations</div>
      </div>

      <div className="cards">
        <div className="actionCards">
          <button
            className={`actionCard ${!showAllLocations ? "whiteButton" : ""}`}
            type="radio"
            name="action"
            value="showAllLocations"
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
      </div>
      <div className="displayWindow">
        {addLocations && <Locations />}
        {addUsers && <AddUser />}
        {showAllUsers && <AllUsers />}
        <AllLocations />
      </div>
    </div>
  );
};

export default Dashboard;
