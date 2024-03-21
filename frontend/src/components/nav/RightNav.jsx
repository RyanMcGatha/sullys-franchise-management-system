import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabaseConfig";
import "./rightNav.css";

const RightNav = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getUaer() {
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) {
          throw error;
        }
        setProfiles(data);
      } catch (error) {
        setError(error.message);
      }
    }
    getUaer();
  }, []);

  return (
    <nav>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <div className="firstName">{profile.first_name}</div>
        </div>
      ))}
    </nav>
  );
};

export default RightNav;
