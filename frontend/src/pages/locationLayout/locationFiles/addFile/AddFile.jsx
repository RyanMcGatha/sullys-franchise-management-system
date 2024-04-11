import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../config/supabaseConfig";

import "./addFile.css";

const AddFile = () => {
  const { id, store_number, folder_name } = useParams();
  const [storeNum, setStoreNum] = useState("");
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setStoreNum(store_number);
    setFolderName(folder_name);
    setFolderId(id);
  }, [store_number, folder_name, id]);

  async function uploadFile(event) {
    event.preventDefault();

    // Ensure there's a file selected
    if (!event.target.files || event.target.files.length === 0) {
      setError("File not selected.");
      return;
    }

    const file = event.target.files[0];

    // Use the original file name for storage, organizing files by folderName
    const filePath = `${folderName}/${file.name}`;

    try {
      setUploading(true);

      // Insert file metadata into your "files" table
      const { error: insertError } = await supabase.from("files").insert([
        {
          folder_name: folderName,
          name: file.name,
          type: file.type,
        },
      ]);
      if (insertError) {
        throw insertError;
      }

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from(`uploads-${storeNum}`)
        .upload(filePath, file, {
          upsert: true, // This option will overwrite the file if it already exists
        });

      if (uploadError) {
        throw uploadError;
      }

      alert("File added successfully");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  // Error display (optional, improve as needed)
  const displayError = error ? <div className="error">{error}</div> : null;

  return (
    <div>
      {displayError}
      <label className="uploadBtn">
        {uploading ? "Uploading ..." : "Upload"}
        <input
          type="file"
          id="single"
          accept="*/*"
          onChange={uploadFile}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default AddFile;
