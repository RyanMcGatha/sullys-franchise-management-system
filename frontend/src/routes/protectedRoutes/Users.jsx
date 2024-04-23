import React, { useState, useEffect } from "react";
import { FiDownload, FiShare2, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../../supabaseConfig";
import AddUser from "./components/AddUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        throw error;
      } else {
        setUsers(data);
      }
    } catch (error) {
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) {
        throw error;
      }
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <>
      <div className="flexflex-col h-screen overflow-hidden items-center w-full gap-1 pt-5 md:pt-0">
        <div className="text-6xl font-semibold text-neutral-400 w-full flex flex-col pl-40 md:flex-row md:justify-between md:items-center mb-5 md:px-20 pt-2 md:pl-24">
          Users
          <div className="mb-5">
            <AddUser />
          </div>
        </div>
        <div style={{ maxHeight: "85vh" }} className="flex overflow-auto">
          <div className="w-full px-10 pr-20 md:pr-0 bg-white shadow-lg rounded-lg overflow-auto md:scale-90 mx-auto p-5">
            <table className="w-full">
              <thead>
                <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
                  <th className="text-start p-4 font-medium">Userame</th>
                  <th className="text-start p-4 font-medium">First Name</th>
                  <th className="text-start p-4 font-medium">Last Name</th>
                  <th className="text-start p-4 font-medium">email</th>
                  <th className="text-start p-4 font-medium">role</th>
                  <th className="text-start p-4 font-medium">delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b-[1px] border-slate-200 text-slate-400"
                  >
                    <td className="p-4">
                      <div className="text-lg font-semibold text-start">
                        {user.username}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-lg font-semibold text-start">
                        {user.first_name}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-lg font-semibold text-start">
                        {user.last_name}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-lg font-semibold text-start">
                        {user.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-lg font-semibold text-start">
                        {user.role}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-lg font-semibold">
                        <FiTrash2
                          onClick={() => handleDelete(user.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-start gap-10 w-full max-h-fit flex-wrap px-32 overflow-auto pb-10 pt-1 no-scrollbar"></div>
      </div>
    </>
  );
};

export default Users;
