import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { supabase } from "../../supabaseConfig";
import { useAuth } from "../AuthContext";

import { SlideInAuth } from "./publicRoutes/SignIn";

const Routes = () => {
  const { isAuth } = useAuth();

  const publicRoutes = [
    {
      path: "/",
      element: <SlideInAuth />,
    },
  ];

  const protectedRoutes = [{}];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(isAuth ? protectedRoutes : []),
    ...protectedRoutes,
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
