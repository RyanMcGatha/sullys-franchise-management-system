import React, { useState, useEffect } from "react";
import { supabase } from "../../../config/supabaseConfig";
import "./dashboard.css";
import Messenger from "../messenger/Messenger";
import { useAuth } from "../../../AuthContext";

import { Link } from "react-router-dom";

const Dashboard = () => {
  const [locations, setLocations] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const { session } = useAuth();

  useEffect(() => {
    async function getUaer() {
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) {
          throw error;
        }
        setProfiles(data);
      } catch (error) {
        setError(error.message);
      }
    }
    getUaer();

    async function fetchLocations() {
      try {
        const { data, error } = await supabase.from("locations").select("*");
        if (error) {
          throw error;
        }
        setLocations(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchLocations();
  }, []);

  return (
    <>
      <div className="main-dashboard">
        <div className="titleDash">Dashboard</div>
        <div className="titleCompany">Company Files</div>
        <div className="cards">
          <div className="companyCards">
            <div className="companyCard"></div>
            <div className="companyCard"></div>
            <div className="companyCard"></div>
          </div>
          <div className="titleLocations">Locations</div>
          <div className="locationCards">
            {locations.map((location) => (
              <div key={location.id} className="card">
                <div className="glass">
                  <div className="card__info">
                    <span className="page">#{location.store_number}</span>
                    <a href="#" className="title">
                      {location.location_name}
                    </a>
                    <p className="content">
                      {location.address} <br />
                    </p>
                  </div>
                  <div className="cardBtn">
                    <Link
                      to={`/locations/${location.owner}/${location.store_number}`}
                    >
                      <p className="text">View Store</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {profiles.map((profile) => (
        <div key={profile.id} className="rightSide">
          <div className="firstName">
            <div>__IMG__</div>
            <br />
            {profile.first_name}
          </div>
        </div>
      ))}
    </>
  );
};

export default Dashboard;
