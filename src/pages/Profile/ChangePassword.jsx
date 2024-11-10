import { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";

const ChangePassword = () => {
  const [isNextStep, setIsNextStep] = useState(false); // State to toggle between steps
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!isNextStep) {
      setIsNextStep(true); // Move to next step when "次へ" is clicked
    } else {
      console.log(data); // Log data on final submission
      // Perform password change logic here
    }
  };

  return (
    <div>
      <TitleBar title={"マイページ"} />
      <div className="w-full max-w-[380px] mx-auto">
        <h3 className="text-center font-hiragino font-bold text-lg text-[#44495B] mt-[59px] ">
          パスワードの変更
        </h3>
        <p className="my-[22px] text-center text-[#9F9999] text-sm font-semibold">
          abcde@gmail.com
        </p>

        <div className="flex flex-col justify-center">
          <form
            className="flex flex-col w-[342px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {!isNextStep ? (
              // Step 1: Email Input
              <div className="form-control">
                <input
                  {...register("current_pass", {
                    required: "Email is required",
                  })}
                  name="current_pass"
                  type="password"
                  placeholder="メールアドレス"
                  className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                />
                {errors.current_pass && (
                  <span className="text-red-500 mt-1">
                    {errors.current_pass.message}
                  </span>
                )}
              </div>
            ) : (
              // Step 2: Password and Confirm Password Inputs
              <>
                <div className="form-control">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    name="password"
                    type="password"
                    placeholder="新しいパスワード"
                    className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                  />
                  {errors.password && (
                    <span className="text-red-500 mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value ===
                          document.querySelector("input[name='password']")
                            .value || "Passwords do not match",
                    })}
                    name="confirmPassword"
                    type="password"
                    placeholder="パスワードを認証する"
                    className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 mt-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </>
            )}

            <button className="fixed bottom-[130px]">
              <ButtonPrimary
                btnText={isNextStep ? "保存" : "次へ"}
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino text-center py-[12px] font-bold text-white"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
