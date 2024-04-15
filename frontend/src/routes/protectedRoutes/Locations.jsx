import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
const Locations = () => {
  const { session } = useAuth();
  return session ? (
    <>
      <div>locations</div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Locations;
