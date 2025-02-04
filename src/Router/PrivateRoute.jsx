// PrivateRoute.jsx
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Circles } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="100"
          width="100"
          color="#49BBDF"
          ariaLabel="circles-loading"
          visible
        />
      </div>
    );
  }

  return user ? children : <Navigate to="/socialLogin" />;
};

// Define PropTypes
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
