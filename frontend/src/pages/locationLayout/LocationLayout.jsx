import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../config/supabaseConfig";

import "./locationLayout.css";

const LocationLayout = ({ url, size, onUpload }) => {
  const { owner, store_number } = useParams();

  const [ownerName, setOwnerName] = useState("");

  const [storeNum, setStoreNum] = useState("");

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setOwnerName(owner);
    setStoreNum(store_number);
  }, [owner, store_number]);

  async function uploadFile(event) {
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
    <div className="locationLayout">
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
  );
};
export default LocationLayout;
