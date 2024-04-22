import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";
import AddFolder from "./components/AddFolder";
import FolderCard from "./components/FolderCard";
import { Link } from "react-router-dom";

const Folders = () => {
  const { id, store_number } = useParams();
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [folder_name, setFolderName] = useState(null);

  const handleDelete = async (folder_id) => {
    try {
      const { error: deleteError } = await supabase
        .from("folders")
        .delete()
        .match({ folder_id: folder_id });
      if (deleteError) throw deleteError;
      setFolders((currentFolders) =>
        currentFolders.filter((folder) => folder.folder_id !== folder_id)
      );
    } catch (error) {
      alert(error.message);
      setError(error.message);
    }
  };

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
  }, [id]);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden items-center w-full gap-1 pt-5 md:pt-0">
        <div className="text-6xl font-semibold text-neutral-400 w-full flex flex-col pl-28 md:flex-row md:justify-between md:items-center mb-5 md:px-20 pt-2 md:pl-24">
          Folders
          <div className="pl-6 md:pl-0">
            <AddFolder id={id} />
          </div>
        </div>
        <div className="flex justify-start gap-10 w-full max-h-fit flex-wrap px-20 md:px-28 overflow-x-hidden overflow-auto pb-40 md:pb-10 pt-1 no-scrollbar">
          {folders.map((folder) => (
            <FolderCard
              key={folder.folder_id}
              name={
                <div className="font-semibold p-2 text-4xl rounded">
                  {folder.folder_name}
                </div>
              }
              del={
                <button
                  className="hover:bg-red-500/20 transition-colors text-white font-semibold p-2 rounded bg-red-500 text-xl"
                  type="button"
                  onClick={() => handleDelete(folder.folder_id)}
                >
                  Delete Folder
                </button>
              }
              files={
                <Link
                  to={`/${id}/${store_number}/${folder.folder_name}`}
                  className="hover:bg-slate-500/20 transition-colors text-white font-semibold p-2 rounded bg-slate-500 text-xl"
                >
                  View Files
                </Link>
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Folders;
