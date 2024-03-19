import React from "react";

import { supabase } from "../../config/supabaseConfig";

import { Link } from "react-router-dom";

import "./nav.css";

const Nav = ({}) => {
  return (
    <nav>
      <Link to={"/dashboard"} id="a" className="navLink">
        <span className="actual-text">&nbsp;Dashboard&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;Dashboard&nbsp;
        </span>
      </Link>
      <Link to={"/locations"} className="navLink">
        <span className="actual-text">&nbsp;locations&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;Locations&nbsp;
        </span>
      </Link>
      <Link to={"/messenger"} id="d" className="navLink">
        <span className="actual-text">&nbsp;Messenger&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;Messenger&nbsp;
        </span>
      </Link>
      <div>
        <button
          className="navLink"
          id="e"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          <span className="actual-text">&nbsp;Sign Out&nbsp;</span>
          <span aria-hidden="true" className="hover-text">
            &nbsp;Sign Out&nbsp;
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
