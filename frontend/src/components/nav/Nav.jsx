import React from "react";
import ShowAccountBtn from "../ShowAccountBtn";

import { Link } from "react-router-dom";

import "./nav.css";

const Nav = ({ session }) => {
  return (
    <nav>
      <div className="showAccountBtn">
        <ShowAccountBtn session={session} />
      </div>
      <Link to={"/locations"} className="navLink">
        Locations
      </Link>
      <Link to={""} className="navLink">
        Upload Document
      </Link>
    </nav>
  );
};

export default Nav;
