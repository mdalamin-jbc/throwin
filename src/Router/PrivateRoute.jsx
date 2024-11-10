// PrivateRoute.jsx
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/socialLogin" />;
};

// Define PropTypes
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
