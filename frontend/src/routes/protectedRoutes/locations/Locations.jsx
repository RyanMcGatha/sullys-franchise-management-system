import React from "react";
import "./locations.css";
import { useState } from "react";
import { supabase } from "../../../config/supabaseConfig";

const Locations = () => {
  const [loading, setLoading] = useState(false);
  const [store_number, setStoreNumber] = useState("");

  const handleAddLocation = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { data, error } = await supabase
      .from("locations")
      .insert([{ store_number }])
      .select();

    if (error) {
      alert(error.message);
    } else {
      alert("Location added successfully");
    }
    setLoading(false);
  };

  return (
    <div className="main-locations">
      <h1>Locations</h1>
      <div className="formContainer-locations">
        <div className="subHeading-locations">Add new location</div>
        <form onSubmit={handleAddLocation} className="form-locations">
          <input
            className="input-locations"
            type="integer"
            placeholder="Store Number"
            value={store_number || ""}
            required={true}
            onChange={(e) => setStoreNumber(e.target.value)}
          />
          <button
            className="formBtn-locations"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading ..." : "Add Location"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Locations;
