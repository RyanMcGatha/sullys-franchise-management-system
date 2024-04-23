import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiFolderAddLine } from "react-icons/ri";
import { supabase } from "../../../../supabaseConfig";

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddUser = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("User added successfully");
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-200 text-neutral-400 font-medium px-4 py-4 rounded-xl hover:opacity-90 transition-opacity text-2xl"
      >
        Add User
      </button>
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loading={loading}
        setLoading={setLoading}
        handleAddFolder={handleAddUser}
      />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  loading,
  handleAddFolder,
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
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-400 to-slate-500 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <RiFolderAddLine className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-2">
                Enter new folder name!
              </h3>
              <form
                onSubmit={handleAddFolder}
                className="flex flex-col text-xl gap-2 p-10 "
              >
                <input
                  className="rounded-xl p-3 placeholder:text-white focus:outline-red-500"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-500 hover:bg-white/10 transition-colors text-white font-semibold w-full p-2 rounded-xl whitespace-nowrap"
                  >
                    Go Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-500 hover:bg-white/10 transition-colors text-white font-semibold w-auto p-2 rounded-xl whitespace-nowrap"
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

export default AddUser;
