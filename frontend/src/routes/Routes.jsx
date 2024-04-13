import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../index.css";

import { supabase } from "../../supabaseConfig";
import { useAuth } from "../AuthContext";

import ProtectedLayout from "./protectedRoutes/ProtectedLayout";
import ErrorPage from "./errorPages/ErrorPage";
import Locations from "./protectedRoutes/Locations";
import { SignIn } from "./publicRoutes/SignIn";

const Routes = () => {
  const { isAuth } = useAuth();

  const publicRoutes = [
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <SignIn />,
    },
  ];

  const protectedRoutes = [
    {
      path: "/locations",
      element: <Locations />,
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(isAuth ? protectedRoutes : []),
    ...protectedRoutes,
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
