import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { supabase } from "../../../../supabaseConfig";

const AddFile = () => {
  const { id, folder_name, store_number } = useParams();
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

    if (!event.target.files || event.target.files.length === 0) {
      setError("File not selected.");
      return;
    }

    const file = event.target.files[0];

    const filePath = `${folderName}/${file.name}`;

    try {
      setUploading(true);

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

      const { error: uploadError } = await supabase.storage
        .from(`uploads-${storeNum}`)
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      window.location.reload();
    } catch (error) {
      setError(error.message);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  const displayError = error ? <div className="error">{error}</div> : null;

  return (
    <div>
      {displayError}
      <label className="bg-slate-200 text-neutral-400 font-medium px-4 py-4 rounded-xl hover:opacity-90 transition-opacity text-2xl hover:cursor-pointer">
        {uploading ? "Uploading ..." : "Upload File"}
        <input
          type="file"
          id="single"
          accept="*/*"
          onChange={uploadFile}
          disabled={uploading}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default AddFile;
