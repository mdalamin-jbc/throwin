import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { RiArrowLeftSLine } from "react-icons/ri";
import toast from "react-hot-toast";
import UseUserDetails from "../../hooks/UseUserDetails";
import { Circles } from "react-loader-spinner";

const DisplayName = () => {
  const [error, setError] = useState();
  const { userDetails, isLoading } = UseUserDetails();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Set the name field value when userDetails is loaded
  useEffect(() => {
    if (userDetails?.name) {
      setValue("name", userDetails.name);
    }
  }, [userDetails, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivate.post(`auth/users/name`, {
        name: data.name,
      });

      toast.success("名前が正常に変更されました。", {
        position: "top-center",
        duration: 1500,
      });

      setTimeout(() => {
        reset();
        setError(null);
        navigate("/myPage");
      }, 500);
    } catch (error) {
      console.error(
        "Error setting name:",
        error.response ? error.response.data : error
      );

      const errorMessage =
        error.response?.data?.name?.[0] ===
        "User with this name already exists."
          ? "すでに使用されているニックネームです"
          : "エラーが発生しました";

      setError({ name: errorMessage }); // Set the error state with the appropriate message

      toast.error("すでに使用されているニックネームです", {
        position: "top-center",
        duration: 1500,
      });
    }
  };

  if (isLoading) {
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
    <div className="">
      <Helmet>
        <title>Throwin | Display Name</title>
      </Helmet>
      <TitleBar
        back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        }
        title={"スタッフを探す"}
      />
      <h4 className="mt-4 mb-4 font-semibold font-hiragino text-center">
        ニックネーム（表示名）をご登録ください
      </h4>

      <div className="flex flex-col justify-center">
        <form
          className="flex flex-col w-[342px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control">
            <input
              {...register("name", { required: "名前が必要です" })}
              name="name"
              type="text"
              placeholder={userDetails?.name || "名前"}
              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              defaultValue={userDetails?.name}
            />
            {errors.name && (
              <span className="text-[#F43C3C]  text-sm mt-2">
                {errors.name.message}
              </span>
            )}
            {error?.name && (
              <span className="text-[#F43C3C] text-sm mt-2">{error.name}</span>
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
  );
};

export default DisplayName;
