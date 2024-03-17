import React, { useState, useEffect } from "react";
import { supabase } from "../../../config/supabaseConfig";
import "./dashboard.css";
import Messenger from "../messenger/Messenger";

const Dashboard = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        <div className="uploadsTxt">Uploads</div>
        <div className="container">
          <div className="idk"></div>
          <div className="notify">
            <Messenger />
          </div>
        </div>
        <div className="locationTxt">Locations</div>
        <div className="locationCards">
          {locations.map((location) => (
            <div key={location.id} className="card">
              <div className="content">
                <p className="heading">{location.store_number}</p>
                <p className="para">{location.owner}</p>
                <p className="para">{location.address}</p>
                <button className="btn">Read more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
