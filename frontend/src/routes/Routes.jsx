import "../../index.css";
import React from "react";
import { supabase } from "../config/supabaseConfig";
import Auth from "./unprotectedRoutes/Auth";

import Dashboard from "./protectedRoutes/Dashboard";
import Locations from "./protectedRoutes/Locations";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Layout from "../pages/Layout";
import ProtetcedLayout from "../pages/ProtectedLayout";
import ErrorPage from "../pages/ErrorPage";

const Routes = () => {
  const { isAuth } = useAuth();

  const publicRoutes = [
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Auth />,
        },
      ],
    },
  ];

  const protectedRoutes = [
    {
      element: <ProtetcedLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
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
