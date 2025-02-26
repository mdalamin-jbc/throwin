import { useState } from "react";
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

  const [topImage, setTopImage] = useState(null);
  const [nameCount, setNameCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [bioCount, setBioCount] = useState(0);
  const [thanksMessageCount, setThanksMessageCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    setTopImage(e.target.files[0]);
  };

  const handleMemberReg = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("public_status", "public");
    formData.append("introduction", data.bio);
    formData.append("fun_fact", data.gacha);
    formData.append("thank_message", data.thanksMessage);
    formData.append("store_uid", store.uid);

    if (topImage) {
      formData.append("image", topImage);
    }

    try {
      const response = await axiosPrivate.post(
        "/restaurant-owner/staff",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Member registered successfully!", {
        duration: 3000,
        position: "top-center",
      });

      setTimeout(() => navigate(-1), 1500);
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
      <div>
        <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
        <div className="bg-white mt-5 rounded-xl p-8 max-w-[587px] shadow mb-[120px]">
          <h4 className="font-semibold text-[18px] text-[#73879C] pb-4">
            {store.name} メンバー新規登録
          </h4>
          <div className="border-b-[3px] mb-5"></div>

          <form onSubmit={handleSubmit(handleMemberReg)} className="space-y-6">
            <table className="table border-none">
              <tr className="hover">
                <td className="flex items-center gap-[17px]">
                  <label className="block text-gray-700">メンバー名</label>
                </td>
                <td>
                  <div className="flex gap-5 items-center">
                    <input
                      {...register("name", {
                        required: "メンバー名は必須です。",
                        maxLength: 10,
                      })}
                      type="text"
                      className="w-full border rounded px-4 py-2"
                      placeholder="居酒屋ABC 梅田店"
                      maxLength={10}
                      onChange={(e) => setNameCount(e.target.value.length)}
                    />
                    <p>{nameCount}/10</p>
                  </div>
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </td>
              </tr>

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
                      })}
                      type="email"
                      className="w-full border rounded px-4 py-2"
                      placeholder="abcd@gmail.com"
                      onChange={(e) => setEmailCount(e.target.value.length)}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </td>
              </tr>

              <tr className="hover">
                <td className="flex items-center gap-[17px]">
                  <p>TOP画像</p>
                </td>
                <td>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full border rounded px-4 py-2"
                  />
                </td>
              </tr>

              <tr className="hover">
                <td className="flex items-center gap-[17px]">
                  <label className="block text-gray-700">自己紹介</label>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    {" "}
                    {/* Added flex and gap */}
                    <textarea
                      {...register("bio", { maxLength: 30 })}
                      className="w-full border rounded px-4 py-2 h-20 resize-none"
                      placeholder="今日は、かりんです！店長を初めて3年目です。お客様の笑顔を見ることが日々のやりがいです！"
                      maxLength={30}
                      onChange={(e) => setBioCount(e.target.value.length)}
                    ></textarea>
                    <p>{bioCount}/30</p>
                  </div>
                </td>
              </tr>

              <tr className="hover">
                <td className="flex items-center gap-[17px]">
                  <label className="block text-gray-700">
                    サンクスページ メッセージ
                  </label>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    {" "}
                    <textarea
                      {...register("thanksMessage", { maxLength: 30 })}
                      className="w-full border rounded px-4 py-2 h-20 resize-none"
                      placeholder="ありがとうございます！ スタッフにこちらの画面を提示してください。"
                      maxLength={30}
                      onChange={(e) =>
                        setThanksMessageCount(e.target.value.length)
                      }
                    ></textarea>
                    <p>{thanksMessageCount}/30</p>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    ガチャ券付与
                  </label>
                </td>
                <td>
                  <div className="relative w-[248px]">
                    <div className="w-full border rounded px-4 py-2 flex items-center justify-between cursor-pointer">
                      <BiSolidDownArrow className="text-[#3BC2EE] text-sm" />
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

            <div className="flex justify-center mt-5">
              <button type="submit">
                <ButtonPrimary
                  style="rounded-full bg-[#49BBDF] w-[342px] text-[#FFFFFF] font-bold text-lg"
                  btnText={"作成する"}
                />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-14">
        <StaffPreviewSection />
      </div>
    </div>
  );
};

export default MemberReg;
