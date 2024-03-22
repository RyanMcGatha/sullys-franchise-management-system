import React, { useState, useEffect } from "react";
import { supabase } from "../../../config/supabaseConfig";

const AllFolders = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const { data, error } = await supabase.from("folders").select("*");
        if (error) {
          throw error;
        }
        setFolders(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchFolders();
  }, []);

  return (
    <div className="folders-location-layout">
      {folders.map((folder) => (
        <div key={folder.id} className="folder">
          {folder.folder_name}
        </div>
      ))}
    </div>
  );
};

export default AllFolders;
