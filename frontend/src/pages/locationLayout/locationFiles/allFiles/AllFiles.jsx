import "./allFiles.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../config/supabaseConfig";

import AddFile from "../addFile/AddFile";

const AllFiles = () => {
  const { folder_name } = useParams();

  const [files, setFiles] = useState([]);
  console.log(files);

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
      <div className="fileDisplayTemplate">
        <span>File Name</span> | <span>Type</span> | <span>Created At</span>
      </div>

      <div className="fileContainer">
        {files.map((file) => (
          <div className="files" key={file.id}>
            <div className="fileDisplay">
              <span>{file.name}</span> | <span>{file.type}</span> |{" "}
              <span>{file.created_at}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFiles;
