import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import logo from "../../../assets/images/socialLogin/logo2.png";
import ButtonPrimary from "../../../components/ButtonPrimary";
import useAxiosPublic from "../../../hooks/axiosPublic";

const AdminLogin = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.post("/auth/login", {
        email: data.mail,
        password: data.password,
      });

      console.log("Response:", response); 

      if (response.status === 200) {
        const result = response.data;

        // Extract user role and tokens
        const userRole = result.data?.role;
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("accessToken", result.data?.access);
        localStorage.setItem("refreshToken", result.data?.refresh);

        toast.success(`ようこそ, ${userRole}`, {
          position: "top-center",
          duration: 3000,
        });

        // Redirect to the dashboard
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error("Error:", error); // Debugging

      if (error.response) {
        toast.error(
          error.response.data.detail || "無効なメールまたはパスワード",
          {
            position: "top-right",
            duration: 3000,
          }
        );
      } else {
        toast.error("サーバーに接続できません。後でもう一度お試しください。", {
          position: "top-right",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4 overflow-hidden bg-[#f8f9fb]">
      <div className="absolute inset-0 h-screen"></div>

      <div className="bg-white py-[18px] px-10 rounded-[10px] shadow-xl text-center relative w-[380px] h-auto">
        <img src={logo} alt="Logo" className="w-[221px] h-auto mx-auto mb-4" />
        <label className="label flex font-bold text-lg justify-center">
          <span className="label-text font-Noto mb-[21px]">
            企業アカウントログイン
          </span>
        </label>

        <div className="flex flex-col justify-center p-0 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <input
                {...register("mail", { required: "メールは必須です" })}
                name="mail"
                type="email"
                placeholder="ログインメールアドレス"
                className="input rounded-none py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              />
              {errors.mail && (
                <span className="text-red-500 mt-1">{errors.mail.message}</span>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("password", { required: "パスワードは必須です" })}
                name="password"
                type="password"
                placeholder="パスワード"
                className="input rounded-none py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              />
              {errors.password && (
                <span className="text-red-500 mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button className="mt-8 rounded-full">
              <ButtonPrimary
                btnText="ログイン"
                style="rounded-full bg-[#49BBDF] w-[115px] text-center py-[10px] font-normal text-white text-sm"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
