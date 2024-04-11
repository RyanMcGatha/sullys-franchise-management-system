import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../config/supabaseConfig";
import "./allFiles.css";

const AllFiles = () => {
  const { store_number, folder_name } = useParams();

  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

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

  async function downloadFile(fileName) {
    try {
      // Construct the full path including the folder name
      const filePath = `${folder_name}/${fileName}`;
      // Encode the filePath to ensure it's a valid URL component
      const encodedFilePath = encodeURIComponent(filePath);
      const { data, error } = await supabase.storage
        .from(`uploads-${store_number}`)
        .download(encodedFilePath);
      if (error) {
        throw error;
      }
      // Create a URL for the downloaded blob
      const url = URL.createObjectURL(data);
      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file: ", error.message);
      setError(`Error downloading file: ${error.message}`);
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-all-files">
      <div className="fileDisplayTemplate">
        <span>File Name</span> | <span>Type</span> | <span>Created At</span>
      </div>
      {files.map((file) => (
        <div key={file.id} className="fileDisplay">
          <span>{file.name}</span> | <span>{file.type}</span> |{" "}
          <span>{file.created_at}</span>
          <button onClick={() => downloadFile(file.name)}>Download</button>
        </div>
      ))}
    </div>
  );
};

export default AllFiles;
