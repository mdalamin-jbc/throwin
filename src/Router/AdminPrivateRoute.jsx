import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Circles } from "react-loader-spinner";

const AdminPrivateRoute = (children) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#49BBDF"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return user ? children : <Navigate to="admin/login" />;
};

export default AdminPrivateRoute;
