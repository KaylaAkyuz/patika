import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "layouts/DefaultLayout";
import NotFound from "./NotFound";
import Home from "./Home";
import Events from "./Events";
import CreateEvent from "./Events/Create";
import ViewEvent from "./Events/View";
import Users from "./Users";
import CreateUser from "./Users/Create";
import ViewUser from "./Users/View";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/add",
        element: <CreateEvent />,
      },
      {
        path: "/events/:id",
        element: <ViewEvent />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/add",
        element: <CreateUser />,
      },
      {
        path: "/users/:id",
        element: <ViewUser />,
      },
    ],
  },
]);

export default router;
