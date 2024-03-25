import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseConfig";

import LocationFiles from "../locationFiles/LocationFiles";
import { Link } from "react-router-dom";

import "./locationFolders.css";

const AllFolders = ({ url }) => {
  const { id } = useParams();
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [addFolder, setAddFolder] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

  const [addFile, setAddFile] = useState(false);

  useEffect(() => {
    downloadImage(url);
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
  }, [id, url]);

  async function downloadImage() {
    try {
      const { data, error } = await supabase.storage
        .from("logos")
        .download("sullysLogo.png");
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setLogoUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  return (
    <div className="main-location-folders">
      <div className="folders">
        {folders.map((folder) => (
          <div key={folder.id} className="folder">
            <img className="folder__background" />
            <div className="folder__content | flow">
              <div className="folder__content--content | flow">
                <h2 className="folder__title">{folder.folder_name}</h2>
                <p className="folder__description"></p>
                <button className="folder__button" id="folderBtn">
                  <Link to={`/location/${id}/folder/${folder.id}`}>
                    View Files
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFolders;
