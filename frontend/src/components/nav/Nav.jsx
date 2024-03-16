import React from "react";
import ShowAccountBtn from "../ShowAccountBtn";
import { supabase } from "../../config/supabaseConfig";

import { Link } from "react-router-dom";

import "./nav.css";

const Nav = ({}) => {
  return (
    <nav>
      <Link to={"/dashboard"} id="a" className="navLink">
        Dashboard
      </Link>
      <Link to={"/locations"} id="b" className="navLink">
        Locations
      </Link>
      <Link to={"/upload"} id="c" className="navLink">
        Upload Document
      </Link>
      <Link to={"/messenger"} id="d" className="navLink">
        Messenger
      </Link>
      <div>
        <button
          className="signOutBtn"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
