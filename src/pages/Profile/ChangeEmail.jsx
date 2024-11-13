import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import UseUserDetails from "../../hooks/UseUserDetails";

const ChangeEmail = () => {
  const { userDetails, refetch } = UseUserDetails();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <TitleBar title={"マイページ"}></TitleBar>
      <div className="w-full max-w-[380px] mx-auto">
        <h3 className="text-center font-hiragino font-bold text-lg text-[#44495B] mt-[59px] ">
        メールアドレスの変更
        </h3>
        <p className="my-[22px] text-center text-[#9F9999] text-sm font-semibold">
          現在のアドレス：{userDetails.email}
        </p>

        <div className="flex flex-col justify-center">
          <form
            className="flex flex-col w-[342px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control ">
              <input
                {...register("password", {
                  required: "password is required",
                })}
                name="password"
                type="password"
                placeholder="パスワードを入力してください"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              />
              {errors.password && (
                <span className="text-red-500 mt-1">{errors.name.message}</span>
              )}
            </div>
            <div className="form-control ">
              <input
                {...register("email", {
                  required: "name is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                name="email"
                type="email"
                placeholder="新しいメールアドレスを入力してください"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              />
              {errors.name && (
                <span className="text-red-500 mt-1">{errors.name.message}</span>
              )}
            </div>

            <button className="fixed bottom-[130px]">
              <ButtonPrimary
                btnText="認証メールを送る"
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino text-center py-[12px] font-bold text-white"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
