import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!Cookies.get("jwt-token");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
