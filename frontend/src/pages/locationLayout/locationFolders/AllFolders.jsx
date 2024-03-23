import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseConfig";
import "./locationFolders.css";
import LocationFiles from "../locationFiles/LocationFiles";

const AllFolders = () => {
  const { id } = useParams();
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [addFolder, setAddFolder] = useState(false);

  const [addFile, setAddFile] = useState(false);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const { data, error } = await supabase
          .from("folders")
          .select("*")
          .eq("location_id", id);
        if (error) {
          throw error;
        }
        setFolders(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchFolders();
  }, [id]);

  return (
    <div className="main-allFolders">
      {folders.map((folder) => (
        <button
          type="radio"
          name="folder"
          value={"addFile"}
          checked={addFile}
          onClick={() => {
            setAddFile(true);
            setAddFolder(false);
          }}
          key={folder.folder_id}
          className="card"
        >
          {folder.folder_name}
        </button>
      ))}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default AllFolders;
