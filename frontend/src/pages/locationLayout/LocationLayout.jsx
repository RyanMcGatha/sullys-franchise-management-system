import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../config/supabaseConfig";
import AddFolder from "./locationFolders/AddFolder";
import AllFolders from "./locationFolders/AllFolders";

import "./locationLayout.css";

const LocationLayout = ({ size }) => {
  const { owner, store_number, location_name, id, folder_name } = useParams();
  const [folderName, setFolderName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [storeNum, setStoreNum] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [folders, setFolders] = useState([]);

  const [allFolders, setAllFolders] = useState(true);
  const [addFolder, setAddFolder] = useState(false);

  const [addFile, setAddFile] = useState(false);

  useEffect(() => {
    setOwnerName(owner);
    setStoreNum(store_number);
    setLocationName(location_name);
    setLocationId(id);
    setFolderName(folder_name);
  }, [owner, store_number, location_name, id, folder_name]);

  return (
    <div className="main-location-layout">
      {locationName}'s Folders
      <div className="cards-location-layout">
        <div className="actionCards-location-layout">
          <button
            className={`actionCard-location-layout ${
              !allFolders ? "whiteButton" : ""
            }`}
            type="radio"
            name="action"
            value="showAllFolders"
            checked={allFolders}
            onClick={() => {
              setAddFolder(false);
              setAllFolders(true);
            }}
          >
            <label className="actionContent-location-layout">
              View All Folders
            </label>
          </button>
          <button
            className={`actionCard-location-layout ${
              !addFolder ? "whiteButton" : ""
            }`}
            type="radio"
            name="action"
            value="addFolder"
            checked={addFolder}
            onClick={() => {
              setAddFolder(true);
              setAllFolders(false);
            }}
          >
            <label className="actionContent-location-layout">Add Folder</label>
          </button>
        </div>
        <div className="displayWindow-location-layout">
          {allFolders && <AllFolders />}
          {addFolder && <AddFolder />}
        </div>
      </div>
    </div>
  );
};
export default LocationLayout;
