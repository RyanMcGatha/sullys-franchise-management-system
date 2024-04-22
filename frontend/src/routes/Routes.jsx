import React, { useMemo, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useParams,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../AuthContext";
import SignIn from "./publicRoutes/SignIn";
import Locations from "./protectedRoutes/Locations";
import ProtectedLayout from "./protectedRoutes/ProtectedLayout";
import ErrorPage from "./errorPages/ErrorPage";
import Folders from "./protectedRoutes/Folders";
import Files from "./protectedRoutes/Files";
import LoadingPage from "./publicRoutes/LoadingPage";
import Chat from "./protectedRoutes/Chat";

const Routes = () => {
  const { session } = useAuth();
  if (session === "loading") {
    return <LoadingPage />;
  }

  const routes = [
    {
      path: "/",
      element: session ? <Navigate to="locations" /> : <SignIn />,
      errorElement: <ErrorPage />,
    },
    {
      element: session ? <ProtectedLayout /> : <Navigate to="/" />,
      children: [
        { path: "locations", element: <Locations /> },
        { path: ":id/:store_number", element: <Folders /> },
        { path: ":id/:store_number/:folder_name", element: <Files /> },
        { path: "chat", element: <Chat /> },
      ],
    },
  ];

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

export default Routes;
