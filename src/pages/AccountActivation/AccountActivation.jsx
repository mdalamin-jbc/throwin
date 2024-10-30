import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/axiosPublic";

const AccountActivation = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [activated, setActivated] = useState(false); // State to track activation

  useEffect(() => {
    const activateAccount = async () => {
      if (activated) return; // Prevent further execution if already activated

      try {
        const response = await axiosPublic.get(
          `/auth/user/activate/${userId}/${token}`
        );

        Swal.fire({
          title: "Success",
          text: response.data.detail || "Your account has been activated!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setActivated(true); // Mark as activated
            navigate("/onboarding");
          }
        });
      } catch (error) {
        Swal.fire({
          title: "Activation Failed",
          text: error.response
            ? error.response.data.detail
            : "An error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token, navigate, activated]); 

  return <div></div>;
};

export default AccountActivation;
