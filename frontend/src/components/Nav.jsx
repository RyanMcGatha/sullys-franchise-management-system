import React from "react";
import ShowAccountBtn from "./ShowAccountBtn";
import "./components.css";

const Nav = ({ session }) => {
  return (
    <nav>
      <ShowAccountBtn session={session} />
    </nav>
  );
};

export default Nav;
