import React, { useState } from "react";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="main-dashboard">
        <div className="locationTxt">Locations</div>
        <div className="locationCards">
          <div className="card">
            <div className="content">
              <p className="heading">Location Card</p>
              <p className="para">store info</p>
              <button className="btn">Read more</button>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <p className="heading">Location Card</p>
              <p className="para">store info</p>
              <button className="btn">Read more</button>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <p className="heading">Location Card</p>
              <p className="para">store info</p>
              <button className="btn">Read more</button>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <p className="heading">Location Card</p>
              <p className="para">store info</p>
              <button className="btn">Read more</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
