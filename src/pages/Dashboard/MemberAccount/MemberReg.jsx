import { useState } from "react"; // Import useState to manage the count
import { useForm } from "react-hook-form";
import ButtonPrimary from "../../../components/ButtonPrimary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import { BiSolidDownArrow } from "react-icons/bi";
import StaffPreviewSection from "./StaffPreviewSection";

const MemberReg = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const store = JSON.parse(localStorage.getItem("store"));
  console.log(store.uid);

  const [nameCount, setNameCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [bioCount, setBioCount] = useState(0);
  const [thanksMessageCount, setThanksMessageCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleMemberReg = async (data) => {
    const staffCreatData = {
      name: data.name,
      email: data.email,
      public_status: "public",
      introduction: data.bio,
      fun_fact: data.gacha,
      thank_message: data.thanksMessage,
      store_uid: store.uid,
    };
    console.log("Form Data Submitted:", staffCreatData);

    try {
      const response = await axiosPrivate.post(
        "/restaurant-owner/staff",
        staffCreatData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct content type for file upload
          },
        }
      );

      console.log("Member registered:", response.data);

      toast.success("Member registered successfully!", {
        duration: 3000,
        position: "top-center",
      });

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error("Error registering member:", error);
      toast.error("Registration failed. Please try again.", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex gap-10 mb-[120px]">
      {/* Left Panel */}
      <div className="">
        <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
        <div className="bg-white mt-5 rounded-xl p-8 max-w-[587px] shadow mb-[120px]">
          <h4 className="font-semibold text-[18px] text-[#73879C] pb-4">
            {store.name} メンバー新規登録
          </h4>
          <div className="border-b-[3px] mb-5"></div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleMemberReg)} className="space-y-6">
            <table className="table border-none">
              {/* row 1 */}
              <tr className="hover">
                <td className="flex items-center gap-[17px]">
                  <label className="block text-gray-700">メンバー名</label>
                </td>
                <td>
                  <div className="flex gap-5 items-center">
                    <input
                      {...register("name", {
                        required: "メンバー名は必須です。",
                        maxLength: {
                          value: 10,
                          message: "メンバー名は10文字以内で入力してください。",
                        },
                        onChange: (e) => setNameCount(e.target.value.length),
                      })}
                      type="text"
                      placeholder="居酒屋ABC 梅田店"
                      className="w-full border rounded px-4 py-2 "
                      maxLength={10}
                    />
                    <p>{nameCount}/10</p>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {errors.name && (
                      <p className="text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                </td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <td className="flex items-center gap-[17px]">
                  <label className="block text-gray-700">
                    メンバーのメール
                  </label>
                </td>
                <td>
                  <div className="flex gap-5 items-center">
                    <input
                      {...register("email", {
                        required: " メンバーのメールは必須です。",
                        maxLength: {
                          message:
                            "メールアドレスは10文字以内で入力してください。",
                        },
                        onChange: (e) => setEmailCount(e.target.value.length),
                      })}
                      type="email"
                      placeholder="example@domain.com"
                      className="w-full border rounded px-4 py-2"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </td>
              </tr>

              {/* row 3 */}
              <tr className="hover">
                <td className="flex items-center gap-[17px]">
                  <p>TOP画像</p>
                </td>
                <td>
                  <input
                    {...register("topImage")}
                    type="file"
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </td>
              </tr>

              {/* row 4 */}
              <tr className="hover">
                <td className="flex items-center gap-[17px]">
                  <label className="block text-gray-700">自己紹介</label>
                </td>
                <td className="">
                  <div className="flex gap-5">
                    <textarea
                      {...register("bio", {
                        maxLength: {
                          value: 30,
                          message: "自己紹介は30文字以内で入力してください。",
                        },
                        onChange: (e) => setBioCount(e.target.value.length),
                      })}
                      placeholder="今日は、かりんです！店長を初めて3年目です。お客様の笑顔を見ることが日々のやりがいです！"
                      className="w-full border rounded px-4 py-2 h-20 resize-none"
                      maxLength={30}
                    ></textarea>
                    <p className="text-xs text-gray-500 text-right">
                      {bioCount}/30
                    </p>
                  </div>
                </td>
              </tr>

              {/* row 5 */}
              <tr className="hover">
                <td className="flex items-center gap-[17px]">
                  <label className="block text-gray-700">
                    サンクスページ メッセージ
                  </label>
                </td>
                <td className="">
                  <div className="flex gap-5">
                    <textarea
                      {...register("thanksMessage", {
                        maxLength: {
                          value: 30,
                          message: "メッセージは30文字以内で入力してください。",
                        },
                        onChange: (e) =>
                          setThanksMessageCount(e.target.value.length),
                      })}
                      placeholder="ありがとうございます！ スタッフにこちらの画面を提示してください。"
                      className="w-full border rounded px-4 py-2 h-20 resize-none"
                      maxLength={30}
                    ></textarea>
                    <p className="text-xs text-gray-500 text-right">
                      {thanksMessageCount}/30
                    </p>
                  </div>
                </td>
              </tr>

              {/* row 6 */}
              <tr>
                <td>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    ガチャ券付与
                  </label>
                </td>

                <td>
                  <div className="relative w-[248px]">
                    {/* Custom Select Box with Flex Layout */}
                    <div className="w-full border rounded px-4 py-2 flex items-center justify-between cursor-pointer">
                      {/* Left Side: Arrow Icon */}
                      <BiSolidDownArrow className="text-[#3BC2EE] text-sm" />

                      {/* Right Side: Select Dropdown */}
                      <select
                        {...register("gacha")}
                        className="bg-transparent w-full focus:outline-none appearance-none text-right"
                      >
                        <option value="yes">有り</option>
                        <option value="no">無し</option>
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            {/* Submit Button */}
            <div className="flex justify-center mt-5 ">
              <button type="submit">
                <ButtonPrimary
                  style="rounded-full bg-[#49BBDF] w-[342px] text-[#FFFFFF] font-bold text-lg"
                  btnText={"作成する"}
                />
              </button>
            </div>
          </form>
          {/* ------------------------- */}
        </div>
      </div>
      <div className="mt-14">
        <StaffPreviewSection />
      </div>
    </div>
  );
};

export default MemberReg;
