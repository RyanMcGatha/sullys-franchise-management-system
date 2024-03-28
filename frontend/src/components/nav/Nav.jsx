import React from "react";

import { supabase } from "../../config/supabaseConfig";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./nav.css";

export default function Nav({ url }) {
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
      <div className="logoContain">
        <img className="sullysLogo" src={logoUrl} alt="Logo" />
      </div>
      <div className="contentContainer">
        <div className="links">
          <Link to={"/dashboard"} id="a" className="navLink">
            Dashboard
            <div className="arrow">›</div>
          </Link>
          <Link to={"/"} className="navLink">
            Files
            <div className="arrow">›</div>
          </Link>
          <Link to={"/"} className="navLink">
            All Locations
            <div className="arrow">›</div>
          </Link>
        </div>
        <div className="navBottom">
          <Link to={"/"} className="navLink">
            Settings
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
        </div>
      </div>
    </nav>
  );
}
