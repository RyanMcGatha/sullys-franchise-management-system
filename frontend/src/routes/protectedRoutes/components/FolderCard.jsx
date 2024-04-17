import React from "react";

const FolderCard = ({ name, del, folders }) => {
  return (
    <div className="h-fit w-72 rounded-xl shadow-xl bg-gradient-to-br from-slate-200 to-slate-300 p-10">
      <div className="text-black flex flex-col items-center">
        <div className="text-5xl text-neutral-500 mb-2">{name}</div>
        <div className="text-sm ">{folders}</div>
        <div className="text-sm  my-5">{del}</div>
      </div>
    </div>
  );
};

export default FolderCard;
