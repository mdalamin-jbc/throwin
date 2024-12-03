import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import UseUserDetails from "../../hooks/UseUserDetails";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangeEmail = () => {
  const { userDetails } = UseUserDetails();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { password, email: new_email } = data;
    try {
      const response = await axiosPrivate.post(
        `auth/users/email-change-request`,
        { password, new_email }
      );
      console.log(response);

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "A verification email has been sent.",
        confirmButtonText: "OK",
      });

      reset();
    } catch (error) {
      console.log(error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <TitleBar
        back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        }
        title={"マイページ"}
      />
      <div className="w-full max-w-[380px] mx-auto">
        <h3 className="text-center font-hiragino font-bold text-lg text-[#44495B] mt-[59px]">
          メールアドレスの変更
        </h3>
        <p className="my-[22px] text-center text-[#9F9999] text-sm font-semibold">
          現在のアドレス：{userDetails.email}
        </p>

        <form
          className="flex flex-col w-[342px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              {...register("password", { required: "password is required" })}
              id="password"
              name="password"
              type="password"
              placeholder="パスワードを入力してください"
              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
            />
            {errors.password && (
              <span className="text-red-500 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="email" className="sr-only">
              New Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              id="email"
              name="email"
              type="email"
              placeholder="新しいメールアドレスを入力してください"
              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
            />
            {errors.email && (
              <span className="text-red-500 mt-1">{errors.email.message}</span>
            )}
          </div>

          <button type="submit" className="mt-6">
            <ButtonPrimary
              btnText="認証メールを送る"
              style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino text-center py-[12px] font-bold text-white"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;
