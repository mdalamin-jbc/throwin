import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const { token } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axiosPrivate.get(
          `/auth/users/email-change-request/verify/${token}`
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Success",
            text: response.data.detail || "Your email has been verified!",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Email Verification Failed",
          text:
            error.response?.data?.detail ||
            "An error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false); // Stop loading when API call completes
      }
    };

    activateAccount();
  }, [token, axiosPrivate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Replace with spinner */}
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
