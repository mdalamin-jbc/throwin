import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/axiosPublic";

const AccountActivation = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const hasActivated = useRef(false);

  console.log(userId, token);

  useEffect(() => {
    const activateAccount = async () => {
      if (hasActivated.current) return;
      hasActivated.current = true;

      try {
        const response = await axiosPublic.get(
          `/auth/users/acivate/${userId}/${token}`
        );
        console.log(response.data);

        if (
          response.data.detail === "User Activated Successfully" ||
          response.status === 200
        ) {
          Swal.fire({
            title: "Success",
            text: response.data.detail || "Your account has been activated!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/onboarding"));
        }
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
  }, [userId, token, navigate]);

  return <div></div>;
};

export default AccountActivation;
