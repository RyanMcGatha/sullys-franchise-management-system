import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddFolder from "./locationFolders/AddFolder";
import AllFolders from "./locationFolders/AllFolders";
import "./locationLayout.css";

const LocationLayout = () => {
  const { owner, store_number, location_name, id, folder_name } = useParams();
  const navigate = useNavigate();

  const [showAddFolder, setShowAddFolder] = useState(false);

  useEffect(() => {}, [owner, store_number, location_name, id, folder_name]);

  const handleAddFolderClick = () => {
    setShowAddFolder((prevState) => !prevState);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="main-location-layout">
      <div className="header-location-layout">
        <button onClick={handleBackClick} className="back-button">
          Back
        </button>
        <span>{location_name}'s Folders</span>
        <button
          className="small-actionCard-location-layout"
          onClick={handleAddFolderClick}
        >
          {showAddFolder ? "Close Add Folder" : "Add Folder"}
        </button>
      </div>

      <div className="displayWindow-location-layout">
        {showAddFolder && <AddFolder />}
        <AllFolders />
      </div>
    </div>
  );
};

export default LocationLayout;
