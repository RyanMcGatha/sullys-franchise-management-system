import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../config/supabaseConfig";
import "./allLocations.css";

import { useAuth } from "../../../../../AuthContext";
import { Link } from "react-router-dom";

const AllLocations = () => {
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
      {locations.map((location) => (
        <div key={location.id} className="card">
          <div className="glass">
            <div className="card__info">
              <span className="page">#{location.store_number}</span>
              <a className="title">{location.location_name}</a>
              <p className="content">
                {location.address} <br />
              </p>
            </div>
            <div className="cardBtn">
              <Link
                to={`/locations/${location.owner}/${location.store_number}/${location.location_name}`}
              >
                <p className="text">View Store</p>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllLocations;
