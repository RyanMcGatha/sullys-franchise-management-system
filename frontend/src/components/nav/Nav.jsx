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
    </nav>
  );
};

export default Nav;
