import { GoogleLogin } from "@react-oauth/google";
import useAxiosPublic from "../../hooks/axiosPublic";

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const axiosPublic = useAxiosPublic();
  const handleGoogleLoginSuccess = async (response) => {
    try {
      // Send the ID token to the backend
      const res = await axiosPublic.post("/auth/social/google", {
        access_token: response.credential,
      });

      console.log("Google response:", res.data);

      // Parse the access_token string to an object
      // First replace single quotes with double quotes to make it valid JSON
      const tokenString = res.data.access_token.replace(/'/g, '"');
      const tokenData = JSON.parse(tokenString);

      if (tokenData.msg === "Login Successful") {
        onSuccess(tokenData.data);
      }
    } catch (error) {
      console.error("Google Login Failed:", error.response?.data || error);
      if (onError) onError(error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    if (onError) onError(error);
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginFailure}
      useOneTap
      shape="pill"
    />
  );
};

export default GoogleLoginButton;
