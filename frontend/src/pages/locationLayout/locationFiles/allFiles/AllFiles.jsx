import "./allFiles.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../config/supabaseConfig";

const AllFiles = () => {
  const { folder_name } = useParams();

  const [files, setFiles] = useState([]);
  console.log(folder_name);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const { data, error } = await supabase
          .from("files")
          .select("*")
          .eq("folder_name", folder_name);

        if (error) {
          throw error;
        }
        setFiles(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchFiles();
  }, [folder_name]);

  return (
    <div className="main-all-files">
      {files.map((file) => (
        <div className="files" key={file.id}>
          <div className="fileDisplay">{file.name}</div>
        </div>
      ))}
    </div>
  );
};

export default AllFiles;
