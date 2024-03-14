import React from "react";
import ShowAccountBtn from "./ShowAccountBtn";
import "./components.css";

const Nav = ({ session }) => {
  return (
    <nav>
      <div className="showAccountBtn">
        <ShowAccountBtn session={session} />
      </div>
    </nav>
  );
};

export default Nav;
