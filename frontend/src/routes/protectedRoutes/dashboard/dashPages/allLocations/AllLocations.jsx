import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../config/supabaseConfig";
import "./allLocations.css";

import { useAuth } from "../../../../../AuthContext";
import { Link } from "react-router-dom";

const AllLocations = ({ url }) => {
  const [locations, setLocations] = useState([]);
  const [blankUrl, setBlankUrl] = useState(null);
  console.log(blankUrl);

  const [error, setError] = useState(null);

  useEffect(() => {
    downloadImage(url);

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
  }, [url]);

  async function downloadImage() {
    try {
      const { data, error } = await supabase.storage
        .from("imgs")
        .download("blank");
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setBlankUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  return (
    <div className="main-all-locations">
      <div className="cardRow">
        {locations.map((location) => (
          <div key={location.id} class="card">
            <img class="cardImage" alt="Card Image" src={blankUrl} />
            <div class="card__info">{location.location_name}</div>
            <p class="title">#{location.store_number}</p>
            <button class="cardBtn">
              <Link
                to={`/locations/${location.owner}/${location.store_number}/${location.location_name}/${location.id}`}
              >
                View Files
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLocations;
