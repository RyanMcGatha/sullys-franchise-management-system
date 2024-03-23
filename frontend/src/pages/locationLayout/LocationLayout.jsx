import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../config/supabaseConfig";

import AddFolder from "./locationFolders/AddFolder";
import LocationFiles from "./locationFiles/LocationFiles";
import AllFolders from "./locationFolders/AllFolders";

import "./locationLayout.css";

const LocationLayout = ({ size }) => {
  const { owner, store_number, location_name, id } = useParams();
  const [ownerName, setOwnerName] = useState("");
  const [storeNum, setStoreNum] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [folders, setFolders] = useState([]);

  const [addFolder, setAddFolder] = useState(false);

  const [addFile, setAddFile] = useState(false);

  useEffect(() => {
    setOwnerName(owner);
    setStoreNum(store_number);
    setLocationName(location_name);
    setLocationId(id);
  }, [owner, store_number, location_name, id]);

  return (
    <div className="content-location-layout">
      <div className="mid-location-layout">
        <div className="title-location-layout">{locationName}</div>
        <div className="cards-location-layout">
          <div className="folderDisplay">
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
              checked={addFile}
              onClick={() => {
                setAddFile(true);
                setAddFolder(false);
              }}
            >
              <label>Add file</label>
            </button>
          </div>

          <div className="displayWindow-location-layout">
            {addFolder && <AddFolder />}
            {addFile && <LocationFiles />}
            <AllFolders />
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
