import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { SignIn } from "./publicRoutes/SignIn";
import ProtectedLayout from "./protectedRoutes/ProtectedLayout";
import Locations from "./protectedRoutes/Locations";
import ErrorPage from "./errorPages/ErrorPage";

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
          path: "locations",
          element: <Locations />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(session ? protectedRoutes : publicRoutes);

  return <RouterProvider router={router} />;
};

export default Routes;
