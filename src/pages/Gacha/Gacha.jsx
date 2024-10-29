import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";

const Gacha = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-[390px] mx-auto">
      <TitleBar title={"スタッフを探す"} />
      <h4 className="mt-4 mb-4 font-semibold font-hiragino text-center">
        ニックネーム（表示名）をご登録ください
      </h4>

      <div className="flex flex-col justify-center">
        <form className="flex flex-col w-[342px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control ">
            <input
              {...register("name", {
                required: "name is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              name="name"
              type="text"
              placeholder="メールアドレス"
              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
            />
            {errors.mail && (
              <span className="text-red-500 mt-1">{errors.mail.message}</span>
            )}
          </div>

          <div className="fixed bottom-[130px]  ">
            <ButtonPrimary
              btnText="新規登録"
              style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino text-center py-[12px] font-bold text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Gacha;
