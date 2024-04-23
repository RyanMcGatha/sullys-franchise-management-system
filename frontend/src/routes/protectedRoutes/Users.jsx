import React, { useState, useEffect } from "react";
import { FiDownload, FiShare2, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../../supabaseConfig";
import AddFile from "./components/AddFile";
import AddUser from "./components/AddUser";

const Users = () => {
  const [users, setUsers] = useState(["loading"]);
  const [error, setError] = useState("");
  console.log(users);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) {
          setError(error.message);
        } else {
          setUsers(data);
        }
      } catch (error) {
        setError("Failed to fetch users");
      }
    }

    fetchUsers();
  }, []);

  return (
    <>
      <div className="flexflex-col h-screen overflow-hidden items-center w-full gap-1 pt-5 md:pt-0">
        <div className="text-6xl font-semibold text-neutral-400 w-full flex flex-col pl-40 md:flex-row md:justify-between md:items-center mb-5 md:px-20 pt-2 md:pl-24">
          Users
          <div className="mb-5">
            <AddUser />
          </div>
        </div>
        <div className="flex h-screen ">
          <div className="w-full px-10 pr-20 md:pr-0 pt-1 bg-white shadow-lg rounded-lg overflow-x-scroll md:scale-90 mx-auto">
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
                {users.map((user, index) => (
                  <tr
                    key={index}
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
                        <FiTrash2 />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tbody></tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-start gap-10 w-full max-h-fit flex-wrap px-32 overflow-auto pb-10 pt-1 no-scrollbar"></div>
      </div>
    </>
  );
};

export default Users;
