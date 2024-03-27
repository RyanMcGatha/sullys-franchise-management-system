import "./allUsers.css";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../config/supabaseConfig";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) {
          throw error;
        }
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users: ", error.message);
      }
    }
    fetchUsers();
  }, []);
  console.log(users);

  return (
    <div className="main-all-users">
      <div className="displayTemplate">Username | E-mail | FullName | Role</div>
      {users.map((user) => (
        <div className="users" key={user.id}>
          <div className="userDisplay">
            {user.username} | {user.email} | {user.full_name} | {user.role}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
