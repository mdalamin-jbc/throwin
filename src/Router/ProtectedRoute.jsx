import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Circles } from "react-loader-spinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles height="80" width="80" color="#49BBDF" ariaLabel="loading" />
      </div>
    );
  }

  // If user not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user tries to access with wrong role, logout & redirect
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
