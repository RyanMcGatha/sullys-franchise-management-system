import Locations from "./Locations";
import { Outlet } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";
import { useAuth } from "../../AuthContext";

const ProtectedLayout = () => {
  return (
    <>
      <Locations />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
