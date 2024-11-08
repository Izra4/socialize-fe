import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './LandingPage.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx"
import Profile from "./Profile.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/profile",
        element: <Profile/>
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
