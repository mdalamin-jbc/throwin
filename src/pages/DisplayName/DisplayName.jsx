import Swal from "sweetalert2";
import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { RiArrowLeftSLine } from "react-icons/ri";
import { motion } from "framer-motion"; // Import Framer Motion

const DisplayName = () => {
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
      Swal.fire({
        position: "top",
        icon: "success",
        title: `名前が正常に変更されました。`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        reset();
        setError(null);
        navigate("/myPage");
      });
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

      setError({ name: errorMessage });

      Swal.fire({
        position: "top",
        icon: "error",
        title: "すでに使用されているニックネームです",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
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

      <motion.h4
        className="mt-4 mb-4 font-semibold font-hiragino text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        ニックネーム（表示名）をご登録ください
      </motion.h4>

      <div className="flex flex-col justify-center">
        <motion.form
          className="flex flex-col w-[342px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="form-control">
            <motion.input
              {...register("name", { required: "Name is required" })}
              name="name"
              type="text"
              placeholder="名前"
              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              defaultValue={user?.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            {errors.name && (
              <motion.span
                className="text-[#F43C3C]  text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {errors.name.message}
              </motion.span>
            )}
            {error?.name && (
              <motion.span
                className="text-[#F43C3C] text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {error.name}
              </motion.span>
            )}
          </div>

          <motion.button
            className="fixed bottom-[130px]"
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ButtonPrimary
              btnText="新規登録"
              style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino text-center py-[12px] font-bold text-white"
            />
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default DisplayName;
