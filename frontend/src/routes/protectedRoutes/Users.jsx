import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";
import AddFile from "./components/AddFile";

import { FiDownload, FiShare2, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { FiAward, FiChevronDown, FiChevronUp } from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase.from("profiles").select("*");

        if (error) {
          throw error;
        }
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsers();
  }, []);

  const Table = () => {
    const [users, setUsers] = useState(userData);

    const shift = (id, direction) => {
      const index = users.findIndex((u) => u.id === id);
      let usersCopy = [...users];

      if (direction === "up") {
        if (index > 0) {
          [usersCopy[index], usersCopy[index - 1]] = [
            usersCopy[index - 1],
            usersCopy[index],
          ];
        }
      } else {
        if (index < usersCopy.length - 1) {
          [usersCopy[index], usersCopy[index + 1]] = [
            usersCopy[index + 1],
            usersCopy[index],
          ];
        }
      }

      setUsers(usersCopy);
    };

    return (
      <div className="w-full bg-white shadow-lg rounded-lg overflow-x-scroll max-w-4xl mx-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
              <th className="pl-4 w-8"></th>
              <th className="text-start p-4 font-medium">Team Member</th>
              <th className="text-start p-4 font-medium">Rank</th>
              <th className="text-start p-4 font-medium">Max Rank</th>
              <th className="text-start p-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              return (
                <TableRows
                  key={user.id}
                  user={user}
                  index={index}
                  shift={shift}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const TableRows = ({ user, index, shift }) => {
    const rankOrdinal = numberToOrdinal(index + 1);
    const maxRankOrdinal = numberToOrdinal(user.maxRank);

    return (
      <motion.tr
        layoutId={`row-${user.id}`}
        className={`text-sm ${user.id % 2 ? "bg-slate-100" : "bg-white"}`}
      >
        <td className="pl-4 w-8 text-lg">
          <button
            className="hover:text-violet-600"
            onClick={() => shift(user.id, "up")}
          >
            <FiChevronUp />
          </button>
          <button
            className="hover:text-violet-600"
            onClick={() => shift(user.id, "down")}
          >
            <FiChevronDown />
          </button>
        </td>

        <td className="p-4 flex items-center gap-3 overflow-hidden">
          <img
            src={user.photoURL}
            alt="Example user photo"
            className="w-10 h-10 rounded-full bg-slate-300 object-cover object-top shrink-0"
          />
          <div>
            <span className="block mb-1 font-medium">{user.name}</span>
            <span className="block text-xs text-slate-500">{user.contact}</span>
          </div>
        </td>

        <td className="p-4">
          <div
            className={`flex items-center gap-2 font-medium ${
              rankOrdinal === "1st" && "text-violet-500"
            }`}
          >
            <span>{rankOrdinal}</span>
            {rankOrdinal === "1st" && <FiAward className="text-xl" />}{" "}
          </div>
        </td>

        <td className="p-4 font-medium">{maxRankOrdinal}</td>

        <td className="p-4">
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              user.status === "online"
                ? "bg-green-200 text-green-800"
                : user.status === "offline"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            {user.status}
          </span>
        </td>
      </motion.tr>
    );
  };

  const numberToOrdinal = (n) => {
    let ord = "th";

    if (n % 10 == 1 && n % 100 != 11) {
      ord = "st";
    } else if (n % 10 == 2 && n % 100 != 12) {
      ord = "nd";
    } else if (n % 10 == 3 && n % 100 != 13) {
      ord = "rd";
    }

    return n + ord;
  };

  const userData = [
    {
      id: users[0]?.id,
      name: users[0]?.username,
      contact: users[0]?.email,
      photoURL: users[0]?.avatar_url,
      maxRank: 1,
      status: "online",
    },
    {
      id: users[1]?.id,
      name: users[1]?.username,
      contact: users[1]?.email,
      photoURL: users[1]?.avatar_url,
      maxRank: 2,
      status: "offline",
    },
  ];

  return (
    <>
      <Table />
    </>
  );
};

export default Users;
