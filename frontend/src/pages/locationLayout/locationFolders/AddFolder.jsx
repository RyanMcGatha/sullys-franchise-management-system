import React, { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseConfig";
import "./addFolder.css";

const AddFolder = () => {
  const { id, store_number } = useParams();
  const [loading, setLoading] = useState(false);
  const [folder_name, setFolderName] = useState("");

  const addFolder = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("folders")
      .insert([{ location_id: id, folder_name }]);

    if (error) {
      alert(error.message);
    } else {
      alert("Folder added successfully");
    }
    setLoading(false);
  };

  return (
    <div className="main-location-folders">
      <div className="formContainer-location-folders">
        <div className="subHeading-location-folders">Add new folder</div>
        <form onSubmit={addFolder} className="form-locations-folders">
          <input
            className="input-location-folders"
            type="text"
            placeholder="Folder Name"
            value={folder_name}
            onChange={(e) => setFolderName(e.target.value)}
            required={true}
          />
          <button className="btn-location-folders" type="submit">
            Add Folder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFolder;
