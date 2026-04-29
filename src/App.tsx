import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Link,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/404",
    element: (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg px-6">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-semibold text-blue-900">
            404
          </h1>
          <p className="mt-2 font-body text-brand-muted">
            Página no encontrada
          </p>
          <Link
            to="/"
            className="mt-6 inline-block font-body text-sm font-semibold uppercase tracking-wider text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-cream"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    ),
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
