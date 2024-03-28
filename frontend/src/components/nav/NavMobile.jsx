import React from "react";

import { supabase } from "../../config/supabaseConfig";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./navMobile.css";

export default function NavMobile({ url }) {
  const [logoUrl, setLogoUrl] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(true);

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
    <div id="navMobile">
      {/* <div className="logoContain">
        <img className="sullysLogo" src={logoUrl} alt="Logo" />
      </div> */}

      <div className="linksMobile">
        <Link to={"/dashboard"} id="a" className="navLink">
          Dashboard
          <div className="arrow">›</div>
        </Link>
        <Link to={"/"} className="navLink">
          Users
          <div className="arrow">›</div>
        </Link>
        <Link to={"/"} className="navLink">
          Folders
          <div className="arrow">›</div>
        </Link>
        <Link to={"/"} className="navLink">
          Files
          <div className="arrow">›</div>
        </Link>

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
  );
}
