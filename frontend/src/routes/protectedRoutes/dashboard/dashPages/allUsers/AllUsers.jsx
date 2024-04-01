import "./allUsers.css";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../config/supabaseConfig";
import { useAuth } from "../../../../../AuthContext";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { session } = useAuth();

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

  return (
    <div className="main-all-users">
      <div className="displayTemplate">
        <span>Username</span> |<span>E-mail</span> |<span>FullName</span> |{" "}
        <span>Role</span>
      </div>
      {users.map((user) => (
        <div className="users" key={user.id}>
          <span>{user.username}</span> | <span>{user.email}</span> |{" "}
          <span>{user.full_name}</span> | <span>{user.role}</span>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
