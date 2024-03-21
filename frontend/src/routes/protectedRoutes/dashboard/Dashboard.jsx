import "./dashboard.css";

import React, { useState } from "react";

import Locations from "../locations/Locations";
import AllLocations from "./dashPages/allLocations/AllLocations";

const Dashboard = () => {
  const [addLocations, setAddLocations] = useState(false);
  const [showAllLocations, setShowAllLocations] = useState(false);

  return (
    <div className="main-dashboard">
      <div className="mid">
        <div className="titleDash">Dashboard</div>
        <div className="cards">
          <div className="actionCards">
            <button
              className="actionCard"
              type="radio"
              name="action"
              value="addLocations"
              checked={addLocations}
              onClick={() => {
                setAddLocations(true);
                setShowAllLocations(false);
              }}
            >
              <label>Add Locations</label>
            </button>
            <button
              className="actionCard"
              type="radio"
              name="action"
              value="showAllLocations"
              checked={showAllLocations}
              onClick={() => {
                setShowAllLocations(true);
                setAddLocations(false);
              }}
            >
              <label>View All Locations</label>
            </button>
          </div>
          <div className="displayWindow">
            {addLocations && <Locations />}
            {showAllLocations && <AllLocations />}
          </div>
        </div>
      </div>
      <div className="storage">
        <div className="activityCard"></div>
      </div>
    </div>
  );
};

export default Dashboard;
