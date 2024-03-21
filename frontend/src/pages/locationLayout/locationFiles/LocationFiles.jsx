import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseConfig";

import "../locationLayout.css";
const LocationFiles = ({ size }) => {
  const { owner, store_number, location_name } = useParams();
  const [ownerName, setOwnerName] = useState("");
  const [storeNum, setStoreNum] = useState("");
  const [locationName, setLocationName] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setOwnerName(owner);
    setStoreNum(store_number);
    setLocationName(location_name);
  }, [owner, store_number, location_name]);

  async function uploadFile(event) {
    event.preventDefault();
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from(`uploads-${storeNum}`)
        .upload(filePath, file);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="uploadFile-location-layout">
        <p>{ownerName}'s Store</p>
        <div style={{ width: size }}>
          <label className="uploadBtn">
            {uploading ? "Uploading ..." : "Upload"}
          </label>
          <input
            type="file"
            id="single"
            accept="*/*"
            onChange={uploadFile}
            disabled={uploading}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationFiles;
