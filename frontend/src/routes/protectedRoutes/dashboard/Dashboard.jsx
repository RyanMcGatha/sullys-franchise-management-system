import "./dashboard.css";

import React, { useState } from "react";

import Locations from "./dashPages/addLocation/Locations";
import AllLocations from "./dashPages/allLocations/AllLocations";

const Dashboard = () => {
  const [addLocations, setAddLocations] = useState(false);
  const [showAllLocations, setShowAllLocations] = useState(true);

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
            }}
          >
            <label className="actionContent">Add Locations</label>
          </button>
          <button
            className={`actionCard ${!addLocations ? "whiteButton" : ""}`}
            type="radio"
            name="action"
            value="addLocations"
            onClick={() => {
              setAddLocations(true);
              setShowAllLocations(false);
            }}
          >
            <label className="actionContent">View All Users</label>
          </button>
          <button
            className={`actionCard ${!addLocations ? "whiteButton" : ""}`}
            type="radio"
            name="action"
            value="addLocations"
            onClick={() => {
              setAddLocations(true);
              setShowAllLocations(false);
            }}
          >
            <label className="actionContent">Add Users</label>
          </button>
        </div>

        <div className="displayWindow">
          {addLocations && <Locations />}
          {showAllLocations && <AllLocations />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
