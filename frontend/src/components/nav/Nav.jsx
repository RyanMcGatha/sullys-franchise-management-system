import React from "react";

import { supabase } from "../../config/supabaseConfig";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./nav.css";

export default function Nav({ url, onUpload }) {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    downloadImage(url);
  }, [url]);

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
    <nav>
      <label>
        <img className="sullysLogo" src={logoUrl} alt="Logo" />
        Sullys Steamers
      </label>
      <Link to={"/dashboard"} id="a" className="navLink">
        Dashboard
        <div className="arrow">›</div>
      </Link>
      <Link to={"/locations"} className="navLink">
        Locations
        <div className="arrow">›</div>
      </Link>
      <Link to={"/messenger"} className="navLink">
        Messenger
        <div className="arrow">›</div>
      </Link>
      <div
        className="navLink"
        id="logOut"
        type="button"
        onClick={() => supabase.auth.signOut()}
      >
        Log Out
        <div className="arrow">›</div>
      </div>
    </nav>
  );
}
