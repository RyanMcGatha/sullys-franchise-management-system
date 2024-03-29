import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddFolder from "./locationFolders/AddFolder";
import AllFolders from "./locationFolders/AllFolders";
import "./locationLayout.css";

const LocationLayout = () => {
  const { owner, store_number, location_name, id, folder_name } = useParams();
  const navigate = useNavigate();

  // useState declarations for form fields, etc., might be here
  // For brevity, assuming these are used elsewhere in your component or for API calls
  const [showAddFolder, setShowAddFolder] = useState(false);

  useEffect(() => {
    // You might have useEffect logic here
    // For example, to fetch folder data when the component mounts or when certain params change
    // For this example, the useEffect hook is used to show how it's structured, but it's left empty
  }, [owner, store_number, location_name, id, folder_name]);

  const handleAddFolderClick = () => {
    setShowAddFolder((prevState) => !prevState); // Toggle the visibility of AddFolder component
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
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
          {/* Dynamic button label based on whether the AddFolder component is displayed */}
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
