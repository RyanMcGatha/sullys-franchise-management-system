import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import Card from "./components/3dCard";
import { supabase } from "../../../supabaseConfig";
import { Link, Navigate } from "react-router-dom";
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
        <div className="text-6xl font-semibold text-neutral-400 w-full flex justify-between items-center mb-4 px-16 pt-2">
          Locations
          <AddLocation locations={locations} setLocations={setLocations} />
        </div>
        <div className="flex gap-10 w-full max-h-fit flex-wrap justify-center overflow-auto pb-10 pt-1 no-scrollbar">
          {locations.map((location) => (
            <Card
              key={location.id}
              name={
                <div className=" font-semibold p-2 rounded text-4xl">
                  {location.location_name}
                </div>
              }
              del={
                <button
                  className=" hover:bg-red-500/20 transition-colors text-white font-semibold p-2 rounded bg-red-500 text-xl"
                  type="button"
                  onClick={() =>
                    handleDelete(location.id, location.store_number)
                  }
                >
                  Delete Location
                </button>
              }
              folders={
                <Link
                  to={`/locations/folders/:${location.id}`}
                  className=" hover:bg-slate-500/20 transition-colors text-white font-semibold p-2 rounded bg-slate-500 text-xl"
                >
                  View Folders
                </Link>
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Locations;
