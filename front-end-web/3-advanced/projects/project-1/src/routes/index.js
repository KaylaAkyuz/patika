import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Information from "./Information";
import History from "./History";
import DefaultLayout from "../layouts/DefaultLayout";
const router = createBrowserRouter(
  [
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
          path: "/information",
          element: <Information />,
        },
        {
          path: "/history",
          element: <History />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
