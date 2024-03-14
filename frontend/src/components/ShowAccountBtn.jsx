import React, { useState } from "react";
import Account from "./account/Account";

const ShowAccountBtn = ({ session }) => {
  const [account, setAccount] = useState(false);
  const [counter, setCounter] = useState(1);

  const handleClick = () => {
    setAccount(true);
    setCounter((prevCounter) => prevCounter + 1);
    console.log(counter);
  };

  const isOdd = (number) => number % 2 !== 0;

  return (
    <div className="formBody">
      <button className="accountBtn" onClick={handleClick}>
        Show Account
      </button>

      {account && !isOdd(counter) && (
        <div className="component-account">
          <Account session={session} />
        </div>
      )}
    </div>
  );
};

export default ShowAccountBtn;
