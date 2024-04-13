import { useAuth } from "../../AuthContext";
import { supabase } from "../../../supabaseConfig";
import React from "react";

function Locations() {
  const { session } = useAuth();

  return (
    <>
      <div className="h-screen">hello</div>
    </>
  );
}

export default Locations;
