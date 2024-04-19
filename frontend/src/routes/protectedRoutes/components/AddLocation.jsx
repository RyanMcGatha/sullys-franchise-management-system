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

    async function createBucket() {
      const { bucketData, bucketError } = await supabase.storage.createBucket(
        `uploads-${store_number}`,
        {
          public: true,
        }
      );
      if (bucketError) {
        console.log(bucketError);
      } else {
        console.log(bucketData);
      }
    }
    createBucket();

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
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-slate-200 text-netural-400 font-medium px-4 py-4 rounded-xl hover:opacity-90 transition-opacity text-2xl"
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
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-400 to-slate-500 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <MdOutlineAddBusiness className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-2">
                Enter new location details!
              </h3>
              <form
                onSubmit={handleAddLocation}
                className="flex flex-col text-xl gap-2 p-10 "
              >
                <input
                  className="rounded-xl p-3 placeholder:text-white focus:outline-red-500"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
                  className="rounded-xl p-3 placeholder:text-white focus:outline-red-500"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
                  className="rounded-xl p-3 placeholder:text-white focus:outline-red-500"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(15px)",
                    border: "solid 2px white",
                  }}
                  type="text"
                  placeholder="Location Name"
                  value={location_name}
                  required={true}
                  onChange={(e) => setLocationName(e.target.value)}
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
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-500 hover:bg-white/10 transition-colors text-white font-semibold w-auto p-2 rounded-xl whitespace-nowrap"
                  >
                    Add Location
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
