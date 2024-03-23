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
          <div
            key={location.id}
            class="w-80 p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img
              class="w-full h-40 object-cover rounded-t-lg"
              alt="Card Image"
              src={blankUrl}
            />
            <div class="p-4">
              <h2 class="text-xl  font-semibold">{location.location_name}</h2>
              <p class="text-gray-600">#{location.store_number}</p>
              <div class="flex justify-between items-center mt-4">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <Link
                    to={`/locations/${location.owner}/${location.store_number}/${location.location_name}/${location.id}`}
                  ></Link>
                  View Files
                  <p className="text">View Store</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLocations;
