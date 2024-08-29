import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ManageUser from "../pages/ManageUser";
import AuthInitializer from "../components/AuthInitializer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <AuthInitializer>
            <Dashboard />
          </AuthInitializer>
        ),
      },
      {
        path: "/manageuser",
        element: (
          <AuthInitializer>
            <ManageUser />
          </AuthInitializer>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthInitializer>
            <Profile />
          </AuthInitializer>
        ),
      },
    ],
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
