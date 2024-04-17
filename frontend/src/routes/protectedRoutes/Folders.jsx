import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";
import { useAuth } from "../../AuthContext";
import AddFolder from "./components/AddFolder";
import FolderCard from "./components/FolderCard";
import { Link } from "react-router-dom";

const Folders = ({}) => {
  const { id } = useParams();
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);

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
      <div className="flex flex-col h-screen overflow-hidden items-center w-full gap-1">
        <div className="text-6xl font-semibold text-neutral-400 w-full flex justify-between items-center mb-5 px-20 pt-2 pl-24">
          Folders
          <AddFolder id={id} />
        </div>
        <div className="flex justify-start gap-10 w-full max-h-fit flex-wrap px-32 overflow-auto pb-10 pt-1 no-scrollbar">
          {folders.map((folder, index) => (
            <FolderCard
              key={folder.id || index}
              name={
                <div className=" font-semibold p-2 rounded">
                  {folder.folder_name}
                </div>
              }
              del={
                <button
                  className=" hover:bg-red-500/20 transition-colors text-white font-semibold p-2 rounded bg-red-500 text-xl"
                  type="button"
                  // onClick={() =>
                  //   handleDelete(location.id, location.store_number)
                  // }
                >
                  Delete Folder
                </button>
              }
              folders={
                <Link className=" hover:bg-slate-500/20 transition-colors text-white font-semibold p-2 rounded bg-slate-500 text-xl">
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
