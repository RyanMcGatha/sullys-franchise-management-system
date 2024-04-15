import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Card from "./components/3dCard";
import { HeaderFont } from "./components/HeaderFont";
const Locations = () => {
  const { session } = useAuth();
  return (
    <>
      <div className="flex flex-col h-screen w-full">
        Locations
        <Card />
      </div>
    </>
  );
};

export default Locations;
