import React from "react";

import { supabase } from "../config/supabaseConfig";

import Auth from "./unprotectedRoutes/auth/Auth";

import Dashboard from "./protectedRoutes/dashboard/Dashboard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAuth } from "../AuthContext";

import Layout from "../pages/layout/Layout";

import ProtetcedLayout from "../pages/protectedLayout/ProtectedLayout";

import Locations from "./protectedRoutes/dashboard/dashPages/addLocation/Locations";

import ErrorPage from "../pages/errorPage/ErrorPage";

import Messenger from "./protectedRoutes/messenger/Messenger";

import LocationLayout from "../pages/locationLayout/LocationLayout";
import LocationFiles from "../pages/locationLayout/locationFiles/LocationFiles";
import AllLocations from "./protectedRoutes/dashboard/dashPages/allLocations/AllLocations";

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
      errorElement: {
        path: "errorpage",
        element: <ErrorPage />,
      },
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/locations",
          element: <Locations />,
        },
        {
          path: "/alllocations",
          element: <AllLocations />,
        },

        {
          path: "/locations/:owner/:store_number/:location_name/:id",
          element: <LocationLayout />,
        },

        {
          path: "/location/:id/:store_number/folder/:folder_name",
          element: <LocationFiles />,
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
