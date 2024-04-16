import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import Card from "./components/3dCard";
import { supabase } from "../../../supabaseConfig";
import { Navigate } from "react-router-dom";
import AddLocation from "./components/AddLocation";
const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const { session } = useAuth();
  const [buckets, setBuckets] = useState([]);

  const handleDelete = async (id, store_number) => {
    try {
      let { data: deleteData, error: deleteError } = await supabase
        .from("locations")
        .delete()
        .match({ id });

      if (deleteError) throw deleteError;
      let bucketName = `uploads-${store_number}`;
      let { error: bucketError } = await supabase.storage.emptyBucket(
        bucketName
      );
      if (bucketError) throw bucketError;

      let { error: bucketerror } = await supabase.storage.deleteBucket(
        bucketName
      );
      if (bucketerror) throw bucketerror;
      setLocations(locations.filter((location) => location.id !== id));
      alert("Location and its associated files deleted successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    async function fetchLocations() {
      try {
        const { data, error } = await supabase.from("locations").select("*");
        if (error) {
          throw error;
        }
        setLocations(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchLocations();

    async function fetchBuckets() {
      try {
        const { data, error } = await supabase.storage.listBuckets();
        if (error) {
          throw error;
        }

        const bucketNames = data.map((bucket) => bucket.name);
        setBuckets(bucketNames);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchBuckets();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden items-center w-full gap-1">
        <div className="text-7xl text-slate-400 w-full flex justify-between items-center">
          Locations
          <AddLocation locations={locations} setLocations={setLocations} />
        </div>
        <div className="flex gap-5 w-full h-full flex-wrap overflow-auto pl-7 text-3xl ">
          {locations.map((location) => (
            <Card
              key={location.id}
              name={location.location_name}
              del={
                <button
                  className=" hover:bg-red-500/10 transition-colors text-white font-semibold p-2 rounded bg-red-500 text-2xl mt-10"
                  type="button"
                  onClick={() =>
                    handleDelete(location.id, location.store_number)
                  }
                >
                  delete
                </button>
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Locations;
