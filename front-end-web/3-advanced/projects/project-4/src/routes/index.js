import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Blog from "./Blog";
import About from "./About";
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
          path: "/about",
          element: <About />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
