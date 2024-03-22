import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseConfig";
import "./locationFolders.css";

const LocationLayoutFolders = () => {
  const { store_number } = useParams();
  const [loading, setLoading] = useState(false);
  const [folder_name, setFolderName] = useState("");

  const addFolder = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("folders")
      .insert([{ store_number, folder_name }]);

    if (error) {
      alert(error.message);
    } else {
      document.location.reload();
    }
    setLoading(false);
  };

  return (
    <div className="main-location-folders">
      <form onSubmit={addFolder} className="newFolderForm">
        <input
          className="input-location-folders"
          type="text"
          placeholder="Folder Name"
          value={folder_name}
          onChange={(e) => setFolderName(e.target.value)}
          required
        />
        <button className="btn-location-folders" type="submit">
          Add Folder
        </button>
      </form>
    </div>
  );
};

export default LocationLayoutFolders;
