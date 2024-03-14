import React from "react";

import { supabase } from "../config/supabaseConfig";

import Auth from "./unprotectedRoutes/auth/Auth";

import Dashboard from "./protectedRoutes/dashboard/Dashboard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAuth } from "../AuthContext";

import Layout from "../pages/layout/Layout";

import ProtetcedLayout from "../pages/protectedLayout/ProtectedLayout";

import Locations from "./protectedRoutes/locations/Locations";

import ErrorPage from "../pages/errorPage/ErrorPage";

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
        {
          path: "/locations",
          element: <Locations />,
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
