import "./dashboard.css";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

import React, { useState } from "react";

import Locations from "./dashPages/addLocation/Locations";
import AllLocations from "./dashPages/allLocations/AllLocations";

// const BarChart = () => {
//   const data = {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [1, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return <Bar data={data} />;
// };

{
  /* <BarChart /> */
}

const Dashboard = () => {
  const [addLocations, setAddLocations] = useState(false);
  const [showAllLocations, setShowAllLocations] = useState(true);

  return (
    <div className="main-dashboard">
      <div className="mid">
        <div className="titleDash">Dashboard</div>
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
              checked={addLocations}
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
              checked={addLocations}
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
      <div className="storage">
        <div className="activityCard"></div>
      </div>
    </div>
  );
};

export default Dashboard;
