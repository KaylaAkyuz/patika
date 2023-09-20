import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Browse from "./Browse";
import Question from "./Question";
import Create from "./Create";
import DefaultLayout from "../layouts/DefaultLayout";
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
        path: "/questions",
        element: <Browse />,
      },
      {
        path: "/questions/add",
        element: <Create />,
      },
      {
        path: "/questions/:id",
        element: <Question />,
      },
    ],
  },
]);

export default router;
