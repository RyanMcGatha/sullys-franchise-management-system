import React, { useState, useEffect } from "react";
import { supabase } from "../../../config/supabaseConfig";
import "./dashboard.css";
import Messenger from "../messenger/Messenger";

import { Link } from "react-router-dom";

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
        <div className="locationCards">
          {locations.map((location) => (
            <div key={location.id} className="card">
              <div className="content">
                <p className="heading">{location.store_number}</p>
                <p className="para">{location.owner}</p>
                <p className="para">{location.address}</p>
                <Link
                  to={`/locations/${location.owner}/${location.store_number}`}
                  className="btn"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
