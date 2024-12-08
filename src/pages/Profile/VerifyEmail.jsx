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
    let isMounted = true; 

    // Validate token
    if (!token) {
      Swal.fire({
        title: "無効なトークン",
        text: "トークンが欠落しているか、無効です",
        icon: "error",
        confirmButtonText: "はい",
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
        console.log(response);
        if (isMounted) {
          Swal.fire({
            title: "成功 ",
            text: "あなたのメールアドレスが確認されました！",
            icon: "success",
            confirmButtonText: "はい",
          }).then(() => {
            logout();
            navigate("/login");
          });
        }
      } catch (error) {
        console.log(error);
        if (isMounted) {
          Swal.fire({
            title: "確認に失敗しました",
            text: "エラーが発生しました。後でもう一度お試しください。",
            icon: "error",
            confirmButtonText: "はい",
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
          color="#49BBDF"
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
