import React from "react";
import "./locationFolders.css";

const LocationLayoutFolders = () => {
  return (
    <div className="main-location-folders">
      <form className="newFolderForm">
        <input
          className="input-location-folders"
          type="text"
          placeholder="EnterFolder Name:"
        />
      </form>
    </div>
  );
};

export default LocationLayoutFolders;
