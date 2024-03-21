import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../config/supabaseConfig";

import LocationLayoutFolders from "./locationFolders/LocationLayoutFolders";
import LocationFiles from "./locationFiles/LocationFiles";

import "./locationLayout.css";

const LocationLayout = ({ size }) => {
  const { owner, store_number, location_name } = useParams();
  const [ownerName, setOwnerName] = useState("");
  const [storeNum, setStoreNum] = useState("");
  const [locationName, setLocationName] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [addFolder, setAddFolder] = useState(false);
  const [addFile, setAddFile] = useState(false);

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
    <div className="content-location-layout">
      <div className="mid-location-layout">
        <div className="title-location-layout">{locationName}</div>
        <div className="cards-location-layout">
          <div className="folders-location-layout">
            <button
              className="folder-location-layout"
              type="radio"
              name="foleder"
              value="addFolder"
              checked={addFolder}
              onClick={() => {
                setAddFolder(true);
                setAddFile(false);
              }}
            >
              <label>Add Folder</label>
            </button>
            <button
              className="folder-location-layout"
              type="radio"
              name="foleder"
              value="addFile"
              checked={addFolder}
              onClick={() => {
                setAddFile(true);
                setAddFolder(false);
              }}
            >
              <label>Add file</label>
            </button>
          </div>
          <div className="displayWindow-location-layout">
            {addFolder && <LocationLayoutFolders />}
            {addFile && <LocationFiles />}
          </div>
        </div>
      </div>
      <div className="storage-location-layout">
        <div className="activityCard-location-layout"></div>
      </div>
    </div>
  );
};
export default LocationLayout;
