import "./addUser.css";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../config/supabaseConfig";

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("User added successfully");
    }
    setLoading(false);
  };

  return (
    <div className="main-add-user">
      <h1>Add User</h1>
      <div className="formContainer-add-user">
        <div className="subHeading-add-user">Add new user</div>
        <form onSubmit={handleAddUser} className="form-add-user">
          <input
            className="input-add-user"
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            required={true}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            className="input-add-user"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            required={true}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="input-add-user"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            required={true}
            onChange={(evenr) => setPassword(event.target.value)}
          />
          <button className="button-add-user" type="submit">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
