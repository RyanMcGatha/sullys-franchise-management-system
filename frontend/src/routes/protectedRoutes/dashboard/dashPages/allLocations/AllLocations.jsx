import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../config/supabaseConfig";
import "./allLocations.css";

import { Link } from "react-router-dom";

const AllLocations = ({ url }) => {
  const [locations, setLocations] = useState([]);
  const [blankUrl, setBlankUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("locations")
      .delete()
      .match({ id });
    if (error) {
      alert(error.message);
    } else {
      alert("Location deleted successfully");
      setLocations(locations.filter((location) => location.id !== id));
    }
  };

  useEffect(() => {
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
    downloadImage();

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

  return (
    <div className="main-all-locations">
      <div className="cardRow">
        {locations.map((location) => (
          <article key={location.id} className="card">
            <img
              className="card__background"
              src={blankUrl}
              alt="background image"
              width="1920"
              height="2193"
            />
            <div className="card__content | flow">
              <div className="card__content--container | flow">
                <h2 className="card__title">{location.location_name}</h2>
                <p className="card__description">
                  Store Number : {location.store_number}
                </p>
                <button className="card__button" id="cardBtn">
                  <Link
                    to={`/locations/${location.owner}/${location.store_number}/${location.location_name}/${location.id}`}
                  >
                    View Files
                  </Link>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(location.id)}
                  className="card__button"
                  id="cardBtnDelete"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllLocations;
