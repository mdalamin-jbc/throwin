import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import closeIcon from "../../../assets/icons/close.png";
import logo from "../../../assets/images/socialLogin/logo2.png";
import ButtonPrimary from "../../../components/ButtonPrimary";
import useAxiosPublic from "../../../hooks/axiosPublic";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();
  const { login, user } = useContext(AuthContext);

  // const { email = "" } = location.state || {};

  const handleClose = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.post(`/auth/login`, {
        email: data.mail,
        password: data.password,
      });

      if (response.data.msg === "Login Successful") {
        console.log("Login successful!", response.data);

        // Use the login function from context
        login(response.data.data);

        // Show success message
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${response.data.msg}`,
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log(response.data.data.access);

        // Fetch user details
        const res = await axiosPublic.get(`/auth/users/me`, {
          headers: response.data.data.access
            ? { Authorization: `Bearer ${response.data.data.access}` }
            : {},
          ...(response.data.data.access && { withCredentials: true }),
        });

        if (res.status === 200) {
          // Check if the user has a name or not
          if (res.data.name === null || res.data.name === "Anonymous user") {
            navigate("/nickName_reg");
          } else {
            console.log(res);
            navigate("/search");
          }
        }
      } else {
        console.error("Login failed:", response.data.msg);

        // Show error message
        Swal.fire({
          position: "top",
          icon: "error",
          title: `${response.data.msg}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response ? error.response.data : error
      );

      // Show error message
      Swal.fire({
        position: "top",
        icon: "error",
        title: `${error.response?.data.msg || "Login failed"}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4 overflow-hidden bg-[#f8f9fb]">
      <div className="absolute inset-0  h-screen"></div>

      <div className="bg-white py-[18px] px-10 rounded-[10px] shadow-xl text-center relative w-[380px] h-auto">
        <img src={logo} alt="Logo" className="w-[221px] h-auto mx-auto mb-4" />
        <label className="label flex font-bold text-lg justify-center">
          <span className="label-text font-Noto mb-[21px]">企業アカウントログイン</span>
        </label>

        <div className="flex flex-col justify-center p-0 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* --------------------------------------- */}
            <div className="form-control">
              <input
                {...register("mail", { required: "Name is required" })}
                name="mail"
                type="mail"
                placeholder="ログインメールアドレス"
                className="input rounded-none py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                defaultValue={user?.name}
              />
              {errors.mail && (
                <span className="text-red-500 mt-1">{errors.mail.message}</span>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("password", { required: "Name is required" })}
                name="password"
                type="password"
                placeholder="パスワード"
                className="input rounded-none py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                defaultValue={user?.name}
              />
              {errors.password && (
                <span className="text-red-500 mt-1">{errors.mail.message}</span>
              )}
            </div>

            <button className=" mt-8">
              <ButtonPrimary
                btnText="ログイン"
                style=" bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[115px] text-center py-[10px] font-normal  text-white text-sm"
              />
            </button>
          </form>
        </div>
      </div>

      {/* Close Icon Button Below the Form */}
      <button className="mt-6 p-2 relative" onClick={handleClose}>
        <img
          src={closeIcon}
          alt="Close"
          className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700"
        />
      </button>
    </div>
  );
};

export default AdminLogin;
