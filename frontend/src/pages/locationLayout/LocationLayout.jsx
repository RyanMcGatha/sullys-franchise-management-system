import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../config/supabaseConfig";

import "./locationLayout.css";

const LocationLayout = ({ size }) => {
  const { owner, store_number, location_name } = useParams();
  const [ownerName, setOwnerName] = useState("");
  const [storeNum, setStoreNum] = useState("");
  const [locationName, setLocationName] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    setOwnerName(owner);
    setStoreNum(store_number);
    setLocationName(location_name);

    async function getUser() {
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) {
          throw error;
        }
        setProfiles(data);
      } catch (error) {
        setError(error.message);
      }
    }
    getUser();
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
    <>
      <div className="content-location-layout">
        <div className="titleDash">{locationName}</div>

        <div className="folders">
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

      {profiles.map((profile) => (
        <div key={profile.id} className="rightSide">
          <div className="firstName">
            <div>__IMG__</div>
            <br />
            {profile.first_name}
          </div>
        </div>
      ))}
    </>
  );
};
export default LocationLayout;
