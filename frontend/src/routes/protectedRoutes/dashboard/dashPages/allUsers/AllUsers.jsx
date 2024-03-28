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
      <div class="displayTemplate">
        <span>Username</span> |<span>E-mail</span> |<span>FullName</span> |
        <span>Role</span>
      </div>
      {users.map((user) => (
        <div className="users" key={user.id}>
          <div className="userDisplay">
            <span>{user.username}</span> | <span>{user.email}</span> |{" "}
            <span>{user.full_name}</span> | <span>{user.role}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
