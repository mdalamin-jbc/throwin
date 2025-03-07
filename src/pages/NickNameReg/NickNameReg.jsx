import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useState } from "react";
import toast from "react-hot-toast";

const NickNameReg = () => {
  const [error, setError] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivate.post(`auth/users/name`, {
        name: data.name,
      });
      console.log(response);
      toast.success("ニックネームが正常に設定されました。", {
        position: "top-center",
        duration: 1500,
      });
  
      // Redirect after the toast notification is shown
      setTimeout(() => {
        reset();
        setError(null);
        navigate("/reg_complete");
      }, 500);
    } catch (error) {
      console.error(
        "Error setting name:",
        error.response ? error.response.data : error
      );
  
      const errorMessage =
        error.response?.data?.name?.[0] === "User with this name already exists."
          ? "すでに使用されているニックネームです"
          : "エラーが発生しました";
  
      setError({ name: errorMessage }); // Set the error state with the appropriate message
  
      toast.error(errorMessage, {
        position: "top-center",
        duration: 1500,
      });
    }
  };
  

  return (
    <div className="">
      <TitleBar title={"スタッフを探す"} />
      <h4 className="mt-4 mb-4 font-semibold font-hiragino text-center">
        ニックネーム（表示名）をご登録ください
      </h4>
      <div>
        <div className="flex flex-col justify-center">
          <form
            className="flex flex-col w-[342px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <input
                {...register("name", { required: "Name is required" })}
                name="name"
                type="text"
                placeholder="名前"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                defaultValue={user?.name}
              />
              {errors.name && (
                <span className="text-[#F43C3C]  text-sm mt-2">
                  {errors.name.message}
                </span>
              )}
              {error?.name && (
                <span className="text-[#F43C3C] text-sm mt-2">
                  {error.name}
                </span>
              )}
            </div>

            <button className="fixed bottom-[130px]">
              <ButtonPrimary
                btnText="新規登録"
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino text-center py-[12px] font-bold text-white"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NickNameReg;
