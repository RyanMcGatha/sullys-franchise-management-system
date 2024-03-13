import "../../index.css";
import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseConfig";
import Auth from "./unprotectedRoutes/Auth";

import Dashboard from "./protectedRoutes/Dashboard";

function Routes() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      {!session ? (
        <>
          <Auth />
        </>
      ) : (
        <>
          <Dashboard key={session.user.id} session={session} />
        </>
      )}
    </div>
  );
}

export default Routes;
