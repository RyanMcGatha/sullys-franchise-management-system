import { useAuth } from "../../AuthContext";
import { supabase } from "../../../supabaseConfig";

const Locations = () => {
  const { session } = useAuth();

  return (
    <>
      <div className=" text-black">hello</div>
    </>
  );
};

export default Locations;
