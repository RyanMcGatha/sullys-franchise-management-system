import React, { useMemo } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import SignIn from "./publicRoutes/SignIn";
import Locations from "./protectedRoutes/Locations";
import ProtectedLayout from "./protectedRoutes/ProtectedLayout";
import ErrorPage from "./errorPages/ErrorPage";
import Folders from "./protectedRoutes/Folders";

const Routes = () => {
  const { session } = useAuth();

  const publicRoutes = [
    {
      path: "/",
      element: <SignIn />,
      errorElement: <ErrorPage />,
    },
  ];

  const protectedRoutes = [
    {
      path: "/",
      element: <ProtectedLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/locations",
          element: <Locations />,
        },
        {
          path: "/locations/:folders",
          element: <Folders />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
