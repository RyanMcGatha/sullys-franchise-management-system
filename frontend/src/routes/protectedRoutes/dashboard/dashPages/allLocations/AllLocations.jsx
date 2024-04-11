import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../config/supabaseConfig";
import "./allLocations.css";

import { Link } from "react-router-dom";

const AllLocations = ({ url }) => {
  const [locations, setLocations] = useState([]);
  const [blankUrl, setBlankUrl] = useState(null);
  const [error, setError] = useState(null);
  const [buckets, setBuckets] = useState([]);

  const handleDelete = async (id, store_number) => {
    try {
      let { data: deleteData, error: deleteError } = await supabase
        .from("locations")
        .delete()
        .match({ id });

      if (deleteError) throw deleteError;

      let bucketName = `uploads-${store_number}`;
      let { error: bucketError } = await supabase.storage.deleteBucket(
        bucketName
      );

      if (bucketError) throw bucketError;

      setLocations(locations.filter((location) => location.id !== id));

      alert("Location and its associated files deleted successfully");
    } catch (error) {
      alert(error.message);
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

    async function fetchBuckets() {
      try {
        const { data, error } = await supabase.storage.listBuckets();
        if (error) {
          throw error;
        }
        // Assuming 'data' contains an array of bucket objects, extract their names.
        const bucketNames = data.map((bucket) => bucket.name);
        setBuckets(bucketNames);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchBuckets();
  }, [url]);

  useEffect(() => {}, [buckets]);

  return (
    <div className="main-all-locations">
      <div className="cardRow">
        {locations.map((location) => (
          <article key={location.id} className="card">
            <img
              className="card__background"
              src={blankUrl}
              alt="background image"
            />
            <div className="card__content | flow">
              <div className="card__content--container | flow">
                <h2 className="card__title">{location.location_name}</h2>
                <p className="card__description">
                  Store Number: {location.store_number}
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
                  onClick={() =>
                    handleDelete(location.id, location.store_number)
                  }
                  className="card__button"
                  id="cardBtn"
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
