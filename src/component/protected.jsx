import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!Cookies.get("jwt-token");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
