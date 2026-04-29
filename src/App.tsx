import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "*",
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
