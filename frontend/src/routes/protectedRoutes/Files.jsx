import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";
import AddFile from "./components/AddFile";
import { FiAward, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FiDownload, FiShare2, FiTrash2 } from "react-icons/fi";

const AllFiles = () => {
  const { store_number, folder_name } = useParams();

  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
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
    <>
      <div className="flex flex-col h-screen overflow-hidden items-center w-full gap-1">
        <div className="text-6xl font-semibold text-neutral-400 w-full flex justify-between items-center mb-5 px-20 pt-2 pl-24">
          Files
          <AddFile />
        </div>
        <div className="flex w-screen px-32">
          <div className="w-full bg-white shadow-lg rounded-lg overflow-x-scroll max-w-7xl mx-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
                  <th className="pl-4 w-8"></th>
                  <th className="text-start p-4 font-medium">File Name</th>
                  <th className="text-start p-4 font-medium">Download</th>
                  <th className="text-start p-4 font-medium">Share</th>
                  <th className="text-start p-4 font-medium">Delete</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr
                    key={index}
                    className="border-b-[1px] border-slate-200 text-slate-400"
                  >
                    <td className="pl-4 w-8 text-lg">
                      <button className="hover:text-red-500"></button>
                      <button className="hover:text-red-500"></button>
                    </td>
                    <td className="p-4 flex items-center gap-3 overflow-hidden">
                      <img
                        src="https://via.placeholder.com/100"
                        alt=""
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold">{file.name}</div>
                        <div className="text-sm text-neutral-300">
                          {file.type}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => downloadFile(file.name)}
                        className="hover:text-red-500 scale-150"
                      >
                        <FiDownload />
                      </button>
                    </td>
                    <td className="p-4">
                      <button className="hover:text-red-500 scale-150">
                        <FiShare2 />
                      </button>
                    </td>
                    <td className="p-4">
                      <button className="hover:text-red-500 scale-150">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tbody></tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-start gap-10 w-full max-h-fit flex-wrap px-32 overflow-auto pb-10 pt-1 no-scrollbar"></div>
      </div>
    </>
  );
};

export default AllFiles;