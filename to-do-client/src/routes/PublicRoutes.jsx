import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashHome/DashboardHome";
import Services from "../pages/Services/Services";
import PrivateRoutes from "./PrivateRoutes";
import { HideAuthRoutes } from "./HideRoutes";
import DashTaskEdit from "../pages/Dashboard/DashTaskEdit/DashTaskEdit";
import Blog from "../pages/Blog/Blog";

const PublicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "login",
        element: (
          <HideAuthRoutes>
            <Login />
          </HideAuthRoutes>
        ),
      },
      {
        path: "register",
        element: (
          <HideAuthRoutes>
            <Register />
          </HideAuthRoutes>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoutes>
            <DashboardLayout />
          </PrivateRoutes>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "update/:id",
            element: <DashTaskEdit />,
          },
        ],
      },
    ],
  },
]);
export default PublicRoutes;
