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

  const deleteFile = async (fileName) => {
    try {
      const filePath = `${folder_name}/${fileName}`;
      const { data, error } = await supabase.storage
        .from(`uploads-${store_number}`)
        .remove([filePath]);
      if (error) {
        throw error;
      }
      const { data: deleteData, deleteError } = await supabase
        .from("files")
        .delete()
        .match({ folder_name, name: fileName });
      if (deleteError) {
        throw deleteError;
      }
      setFiles((currentFiles) =>
        currentFiles.filter((file) => file.name !== fileName)
      );
    } catch (error) {
      console.error("Error deleting file: ", error.message);
      setError(`Error deleting file: ${error.message}`);
    }
  };

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
      const filePath = `${folder_name}/${fileName}`;

      const encodedFilePath = encodeURIComponent(filePath);
      const { data, error } = await supabase.storage
        .from(`uploads-${store_number}`)
        .download(encodedFilePath);
      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);

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
      <div className="flexflex-col h-screen overflow-hidden items-center w-full gap-1 pt-5 md:pt-0">
        <div className="text-6xl font-semibold text-neutral-400 w-full flex flex-col pl-40 md:flex-row md:justify-between md:items-center mb-5 md:px-20 pt-2 md:pl-24">
          Files
          <div className="mb-5">
            <AddFile />
          </div>
        </div>
        <div className="flex h-screen ">
          <div className="w-full px-10 pr-20 md:pr-0 pt-1 bg-white shadow-lg rounded-lg overflow-x-scroll md:scale-90 mx-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
                  <th className="pl-4"></th>
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
                      <button
                        className="hover:text-red-500 scale-150"
                        onClick={() => deleteFile(file.name)}
                      >
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
