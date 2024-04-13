import Locations from "./Locations";
import { Outlet } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";
import { useAuth } from "../../AuthContext";
import Example from "./components/Nav";

const ProtectedLayout = () => {
  return (
    <div className="bg-neutral-900">
      <Example />
      <Locations />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
