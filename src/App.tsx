import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";

declare global {
  interface Window {
    quien: () => void;
  }
}

const router = createBrowserRouter(
  [
    {
      path: "/404",
      element: <NotFoundPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
  ],
  {
    basename: "/CervezaRepublicaConsepWeb",
  },
);

export default function App() {
  useEffect(() => {
    window.quien = () => {
      console.log("Yasel David Muñoz (4temix)");
    };
  }, []);
  return <RouterProvider router={router} />;
}
