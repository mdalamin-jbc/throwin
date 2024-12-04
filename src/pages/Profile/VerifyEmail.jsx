import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import Cookies from "js-cookie";
import { useAuth } from "../../hooks/useAuth";

const VerifyEmail = () => {
  const { token } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get("access_token");
  const { logout } = useAuth();

  useEffect(() => {
    let isMounted = true; // Prevent state updates if the component is unmounted

    // Validate token
    if (!token) {
      Swal.fire({
        title: "Invalid Token",
        text: "The token is missing or invalid.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
      return;
    }

    const activateAccount = async () => {
      try {
        const response = await axiosPrivate.post(
          `/auth/users/email-change-request/verify/${token}`,
          {}, // Empty body (if not required by API)
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Add the access token to headers
            },
          }
        );

        if (isMounted) {
          Swal.fire({
            title: "Success",
            text: response.data.detail || "Your email has been verified!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            logout();
            navigate("/login");
          });
        }
      } catch (error) {
        if (isMounted) {
          Swal.fire({
            title: "Verification Failed",
            text:
              error.response?.data?.detail ||
              "An error occurred. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } finally {
        if (isMounted) setLoading(false); // Stop loading when API call completes
      }
    };

    activateAccount();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [token, axiosPrivate, navigate, accessToken, logout]); // Added accessToken as a dependency

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Email verification process completed.</p>
    </div>
  );
};

export default VerifyEmail;
