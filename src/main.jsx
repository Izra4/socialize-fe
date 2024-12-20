import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./LandingPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";
import Dashboard from "./Dashboard.jsx";
import Post from "./Post.jsx";
import ProfileUpdate from "./ProfileUpdate.jsx";
import ProtectedRoute from "./component/protected.jsx";
import PostDetail from "./PostDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/update",
    element: <ProfileUpdate />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post",
    element: <Post />,
  },
  {
    path: "/post/:id",
    element: <PostDetail />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
