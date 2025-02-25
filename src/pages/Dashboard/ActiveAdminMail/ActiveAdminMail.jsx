import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/axiosPublic";

const ActiveAdminMail = () => {
  const axiosPublic = useAxiosPublic();
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activateAdmin = async () => {
      try {
        // Make the API call
        const response = await axiosPublic.get(
          `https://api-dev.throwin-glow.com/admins/activate/${uid}/${token}`
        );

        // Axios doesn't use response.ok - if we get here, it was successful
        // as Axios throws errors for non-2xx status codes
        setMessage("Activation successful! Redirecting...");
        setTimeout(() => navigate("/admin/login"), 2000); // Redirect after 2 sec
      } catch (error) {
        // Get detailed error message if available from the API response
        const errorMsg = error.response?.data?.message || 
                         "Activation failed. Invalid or expired token.";
        setMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    activateAdmin();
  }, [uid, token, navigate, axiosPublic]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? <p>Activating your account...</p> : <p>{message}</p>}
    </div>
  );
};

export default ActiveAdminMail;