import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AccountActivation = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = () => {
      // Simulate account activation logic here
      // You can add any additional logic if needed

      // Show success message with confirmation popup
      Swal.fire({
        title: "Success",
        text: "Your account has been activated!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/onboarding"); // Redirect to onboarding page
        }
      });
    };

    activateAccount();
  }, [userId, token, navigate]);

  return <div className=""></div>;
};

export default AccountActivation;
