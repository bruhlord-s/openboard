import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/styles/index.css";
import RequireAuth from "./middleware/RequireAuth";
import RequireNoAuth from "./middleware/RequireNoAuth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";

axios.defaults.baseURL = "http://localhost:8000/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireNoAuth children={<Welcome />} />,
  },
  {
    path: "/register",
    element: <RequireNoAuth children={<Register />} />,
  },
  {
    path: "/login",
    element: <RequireNoAuth children={<Login />} />,
  },
  {
    path: "/dashboard",
    element: <RequireAuth children={<Dashboard />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
