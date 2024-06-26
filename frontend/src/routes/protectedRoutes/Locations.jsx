import React, { useState, useEffect } from "react";

import { supabase } from "../../../supabaseConfig";
import { Link, Navigate } from "react-router-dom";
import AddLocation from "./components/AddLocation";
import LocationCard from "./components/3dCard";
const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
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
      window.location.reload();
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
        <div className="text-6xl font-semibold text-neutral-400 w-full flex flex-col pl-20 md:flex-row md:justify-between md:items-center mb-5 md:px-20 pt-2 md:pl-24">
          Locations
          <div className="pl-12 md:pl-0">
            <AddLocation locations={locations} setLocations={setLocations} />
          </div>
        </div>
        <div className="flex justify-start gap-10 w-full max-h-fit flex-wrap px-20 md:px-28 overflow-x-hidden overflow-auto pb-40 md:pb-10 pt-1 no-scrollbar">
          {locations.map((location) => (
            <LocationCard
              location={locations}
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
                  to={`/${location.id}/${location.store_number}`}
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
