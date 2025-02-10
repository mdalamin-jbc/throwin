import { useForm } from "react-hook-form";
import ButtonPrimary from "../../../components/ButtonPrimary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";

const MemberReg = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const store = JSON.parse(localStorage.getItem("store"));
  console.log(store.uid);
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
            居酒屋ABC_大阪店 メンバー新規登録
          </h4>
          <div className="border-b-[3px] mb-5"></div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleMemberReg)} className="space-y-6">
            <table className="table border-none">
              <tbody>
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
                        })}
                        type="text"
                        placeholder="居酒屋ABC 梅田店"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <p>0/10</p>
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
                        })}
                        type="email"
                        placeholder="example@domain.com"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <p>0/10</p>
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
                        {...register("bio", { maxLength: 30 })}
                        placeholder="今日は、かりんです！店長を初めて3年目です。お客様の笑顔を見ることが日々のやりがいです！"
                        className="w-full border rounded px-4 py-2 h-20 resize-none"
                      ></textarea>
                      <p className="text-xs text-gray-500 text-right">0/30</p>
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
                        {...register("thanksMessage", { maxLength: 30 })}
                        placeholder="ありがとうございます！ スタッフにこちらの画面を提示してください。"
                        className="w-full border rounded px-4 py-2 h-20 resize-none"
                      ></textarea>
                      <p className="text-xs text-gray-500 text-right">0/30</p>
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
                    <select
                      {...register("gacha")}
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="有り">有り</option>
                      <option value="無し">無し</option>
                    </select>
                  </td>
                </tr>
              </tbody>
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

          <dialog id="my_modal_8" className="modal max-w-[343px] mx-auto">
            <div className="modal-box bg-[#F9F9F9] p-0 pt-7">
              <div>
                <p className="text-center text-lg">
                  こちらの内容でメンバーを
                  <br /> 新規作成しますか？
                </p>
              </div>

              <div className="flex justify-center gap-4 border-t-2">
                <form method="dialog">
                  <button className="px-4 py-4  border-r-2 border-gray-300 flex items-center justify-center ">
                    <span className="mr-10">編集する</span>
                  </button>
                </form>
                <form method="dialog">
                  <button
                    type="submit"
                    className="px-4 py-4  flex items-center justify-center text-[#2976EA]"
                  >
                    <span className="ml-8">登録する</span>
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default MemberReg;
