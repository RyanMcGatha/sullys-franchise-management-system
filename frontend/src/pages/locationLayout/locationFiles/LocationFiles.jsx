import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseConfig";
import { Link } from "react-router-dom";

import AllFiles from "./allFiles/AllFiles";
import AddFile from "./addFile/AddFile";

import "./locationFiles.css";

const LocationFiles = () => {
  const { store_number, folder_name, location_name } = useParams();
  const [folderName, setFolderName] = useState("");
  const [storeNum, setStoreNum] = useState("");
  const [locationName, setLocationName] = useState("");
  const [allFiles, setAllFiles] = useState(true);
  const [addFile, setAddFile] = useState(false);

  useEffect(() => {
    setStoreNum(store_number);
    setLocationName(location_name);
    setFolderName(folder_name);
  }, [store_number, location_name, folder_name]);

  return (
    <div className="main-files">
      {folderName}
      <div className="cards">
        <div className="actionCards">
          <button
            className={`actionCard ${allFiles ? "whiteButton" : ""}`}
            type="radio"
            name="action"
            value="showAllFiles"
            checked={allFiles}
            onClick={() => {
              setAllFiles(true);
              setAddFile(false);
            }}
          >
            <label className="actionContent">View All Files</label>
          </button>
          <button
            className={`actionCard ${allFiles ? "whiteButton" : ""}`}
            type="radio"
            name="action"
            value={"addNewFile"}
            checked={addFile}
            onClick={() => {
              setAddFile(true);
              setAllFiles(false);
            }}
          >
            <label className="actionContent">Add New File</label>
          </button>
        </div>
        <div className="displayWindow-files">
          {allFiles && <AllFiles url={[folderName][storeNum]} />}
          {addFile && <AddFile url={[folderName][storeNum]} />}
        </div>
      </div>
    </div>
  );
};

export default LocationFiles;
