import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseConfig";
import "./locationFolders.css";

const AllFolders = () => {
  const { id } = useParams();
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);

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
        <div className="allFolders" key={folder.folder_id}>
          <div className="card">{folder.folder_name}</div>
        </div>
      ))}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default AllFolders;
