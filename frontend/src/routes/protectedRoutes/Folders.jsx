import { useAuth } from "../../AuthContext";
import { supabase } from "../../../supabaseConfig";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Folders = () => {
  const { id, store_number, folder_name, location_name } = useParams();
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [addFolder, setAddFolder] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

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
  }, [id, store_number, folder_name, location_name]);

  return (
    <>
      <div>folders</div>
    </>
  );
};

export default Folders;
