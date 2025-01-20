import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/axiosPublic";
import toast from "react-hot-toast";

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
          toast
            .success("あなたのアカウントはアクティブ化されました！", {
              position: "top-center",
              duration: 3000,
            })
            .then(() => {
              navigate("/onboarding");
              console.log(response.data.detail);
            });
        }
      } catch (error) {
        console.log(error.response);
        toast.error("エラーが発生しました。後でもう一度お試しください。", {
          position: "top-center",
          duration: 3000,
        });
      }
    };

    activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token, navigate]);

  return <div></div>;
};

export default AccountActivation;
