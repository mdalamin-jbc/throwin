import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import mail from "../../assets/icons/mail-icon-3.svg";
import useAxiosPublic from "../../hooks/axiosPublic";

const CheckMail = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);

  const [isLoading, setIsLoading] = useState(false); // For loading indicator

  const handleResendMail = async () => {
    setIsLoading(true); // Show loading indicator
    try {
      const response = await axiosPublic.post(
        "/auth/register/resend-activation-email",
        { email }
      );

      if (response.status === 200) {
        // Show SweetAlert for success
        Swal.fire({
          title: "Success!",
          text: "アクティベーションメールが正常に再送信されました！",
          icon: "success",
          confirmButtonText: "はい ",
        });
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      // Show SweetAlert for error
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.email?.[0] ||
          "メールの再送信中にエラーが発生しました。",
        icon: "error",
        confirmButtonText: "はい",
      });
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col justify-center items-center">
            <img className="w-[150px]" src={mail} alt="Mail Icon" />
            <h3 className="text-center mt-8 mb-2 font-hiragino font-semibold text-lg">
              Check Email
            </h3>
            <p className="text-center w-[80%] mx-auto">
              Please check your email inbox and click on the provided link to
              activate your account. If you don't receive the email,
              <button
                onClick={handleResendMail}
                className="text-[#5297FF] underline ml-1"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Resending..." : "Click here to resend"}
              </button>
            </p>

            <Link className="mt-6 text-[#5297FF]" to="/login">
              <button>
                <p>Back to login</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckMail;
