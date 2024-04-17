import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Files = () => {
  const [error, setError] = useState(null);
  const { folder_name } = useParams();
  const [files, setFiles] = useState([]);
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
    <div className="flex flex-col w-full h-full items-center">
      <div className="text-6xl font-semibold text-neutral-400 w-full flex justify-between items-center mb-5 px-20 pt-2 pl-24">
        Files
      </div>
      <div className="flex justify-start gap-10 w-full max-h-fit flex-wrap px-32 overflow-auto pb-10 pt-1 no-scrollbar">
        {files.map((file) => (
          <div
            key={file.file_id}
            className="bg-slate-200 p-4 rounded-xl flex flex-col gap-2"
          >
            <div className="text-2xl font-semibold">{file.file_name}</div>
            <div className="text-xl font-semibold">{file.file_type}</div>
            <div className="text-xl font-semibold">{file.file_size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
