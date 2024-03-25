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
        .download("store.jpg");
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
          <article key={location.id} class="card">
            <img
              // src={blankUrl}
              class="card__background"
              src={blankUrl}
              alt="background image"
              width="1920"
              height="2193"
            />
            <div class="card__content | flow">
              <div class="card__content--container | flow">
                <h2 class="card__title">{location.location_name}</h2>
                <p class="card__description">{location.store_number}</p>
              </div>
              <button class="card__button">
                {" "}
                <Link
                  to={`/locations/${location.owner}/${location.store_number}/${location.location_name}/${location.id}`}
                >
                  View Files
                </Link>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllLocations;
