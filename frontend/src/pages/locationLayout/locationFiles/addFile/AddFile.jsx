import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../config/supabaseConfig";

import "./addFile.css";

const AddFile = ({ size }) => {
  const { id, store_number, folder_name } = useParams();
  const [storeNum, setStoreNum] = useState("");
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setStoreNum(store_number);
    setFolderName(folder_name);
    setFolderId(id);
  }, [store_number, folder_name, id]);

  async function uploadFile(event) {
    event.preventDefault();
    const { error } = await supabase.from("files").insert([
      {
        folder_name: folderName,
        name: event.target.files[0].name,
        type: event.target.files[0].type,
      },
    ]);
    if (error) {
      alert(error.message);
    } else {
      alert("File added successfully");
    }

    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("File not selected.");
      }
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from(`uploads-${storeNum}`)
        .upload(filePath, file);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
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
  );
};

export default AddFile;
