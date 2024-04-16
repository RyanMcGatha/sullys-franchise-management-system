import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { useState } from "react";
import { supabase } from "../../../../supabaseConfig";
import { Navigate } from "react-router-dom";

const AddLocation = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [store_number, setStoreNumber] = useState("");
  const [owner, setOwner] = useState("");
  const [location_name, setLocationName] = useState("");

  const handleAddLocation = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("locations")
        .insert([{ store_number, owner, location_name }])
        .single();

      if (error) throw error;

      setIsOpen(false);
      setStoreNumber("");
      setOwner("");
      setLocationName("");

      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" ">
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-slate-300 text-slate-400 font-medium px-4 py-4 rounded-xl hover:opacity-90 transition-opacity scale-50"
      >
        Add Location
      </button>
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        store_number={store_number}
        setStoreNumber={setStoreNumber}
        loading={loading}
        setLoading={setLoading}
        owner={owner}
        setOwner={setOwner}
        location_name={location_name}
        setLocationName={setLocationName}
        handleAddLocation={handleAddLocation}
      />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  store_number,
  setStoreNumber,
  loading,
  setLoading,
  owner,
  setOwner,
  location_name,
  setLocationName,
  handleAddLocation,
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
            <MdOutlineAddBusiness className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10 h-full">
              <div className="bg-white w-40 h-40 mb-2 rounded-full text-9xl text-slate-500 grid place-items-center mx-auto">
                <MdOutlineAddBusiness />
              </div>
              <h3 className="text-9xl font-bold text-center mb-2">
                Enter new location details!
              </h3>
              <form
                onSubmit={handleAddLocation}
                className="flex flex-col z-10 text-white text-8xl gap-2 p-10 px-20 "
              >
                <input
                  className=" rounded-xl p-5 placeholder:text-white"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backgroundAttachment: "fixed",
                    backdropFilter: "blur(15px)",
                    border: "solid 2px white",
                  }}
                  type="integer"
                  placeholder="Store Number"
                  value={store_number}
                  required={true}
                  onChange={(e) => setStoreNumber(e.target.value)}
                />
                <input
                  className=" rounded-xl p-5 placeholder:text-white"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backgroundAttachment: "fixed",
                    backdropFilter: "blur(15px)",
                    border: "solid 2px white",
                  }}
                  type="text"
                  placeholder="Owners Name"
                  value={owner}
                  required={true}
                  onChange={(e) => setOwner(e.target.value)}
                />
                <input
                  className=" rounded-xl p-5 placeholder:text-white"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backgroundAttachment: "fixed",
                    backdropFilter: "blur(15px)",
                    border: "solid 2px white",
                  }}
                  type="text"
                  placeholder="Location Name"
                  value={location_name}
                  required={true}
                  onChange={(e) => setLocationName(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 mt-5 rounded"
                  >
                    Nah, go back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    {loading ? "Loading ..." : "Add Location"}
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

export default AddLocation;
