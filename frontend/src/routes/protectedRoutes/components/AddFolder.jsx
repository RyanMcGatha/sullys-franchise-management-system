import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiFolderAddLine } from "react-icons/ri";
import { useState } from "react";
import { supabase } from "../../../../supabaseConfig";
import { Navigate } from "react-router-dom";

const AddFolder = ({ id, folders }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [folder_name, setFolderName] = useState("");

  const handleAddFolder = async (event) => {
    event.preventDefault();
    setLoading(true);

    async function createFolder() {
      event.preventDefault();
      setLoading(true);

      const { error } = await supabase
        .from("folders")
        .insert([{ location_id: id, folder_name }]);

      if (error) {
        alert(error.message);
      } else {
      }
      setLoading(false);
    }
    createFolder();
  };

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-slate-200 text-netural-400 font-medium px-4 py-4 rounded-xl hover:opacity-90 transition-opacity text-2xl"
      >
        Add Folder
      </button>
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loading={loading}
        setLoading={setLoading}
        handleAddFolder={handleAddFolder}
        folder_name={folder_name}
        setFolderName={setFolderName}
      />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  loading,
  handleAddFolder,
  setLoading,
  folder_name,
  setFolderName,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 1, rotate: "12.5deg" }}
            animate={{ scale: 0.5, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-400 to-slate-500 text-white p-6 rounded-lg w-full h-fit  shadow-xl cursor-default relative overflow-hidden"
          >
            <RiFolderAddLine className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10 h-full">
              <div className="bg-white w-40 h-40 mb-2 rounded-full text-9xl text-slate-500 grid place-items-center mx-auto">
                <RiFolderAddLine />
              </div>
              <h3 className="text-9xl font-bold text-center mb-2">
                Enter new folder name!
              </h3>
              <form
                onSubmit={handleAddFolder}
                className="flex flex-col z-10 text-white text-8xl gap-2 p-10 px-20 "
              >
                <input
                  className=" rounded-xl p-5 placeholder:text-white my-2"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backgroundAttachment: "fixed",
                    backdropFilter: "blur(15px)",
                    border: "solid 2px white",
                  }}
                  type="text"
                  placeholder="Folder Name"
                  value={folder_name}
                  required={true}
                  onChange={(e) => setFolderName(e.target.value)}
                />
                <div className="flex gap-5 items-center mt-5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-500 hover:bg-white/10 transition-colors text-white font-semibold w-full p-4 rounded-xl"
                  >
                    Go Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-500 hover:bg-white/10 transition-colors text-white font-semibold w-full p-4 px-1 rounded-xl"
                  >
                    {loading ? "Loading ..." : "Add Folder"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddFolder;
