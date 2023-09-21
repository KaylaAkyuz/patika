import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Cart from "./Cart";
import Product from "./Product";
import About from "./About";
import Favorites from "./Favorites";
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
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/product",
          element: <Product />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
