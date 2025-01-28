import { useForm } from "react-hook-form";
import ButtonPrimary from "../../../components/ButtonPrimary";

const MemberReg = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex gap-10">
      {/* Left Panel */}
      <div className="">
        <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
        <div className="bg-white mt-5 rounded-xl p-8 max-w-[587px] shadow">
          <h4 className="font-semibold text-[18px] text-[#73879C] pb-4">
            居酒屋ABC_大阪店 メンバー新規登録
          </h4>
          <div className="border-b-[3px] mb-5"></div>

          {/* Tabs */}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        {...register("storeName", {
                          required: "店舗名は必須です",
                        })}
                        type="text"
                        placeholder="居酒屋ABC 梅田店"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <p>0/10</p>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.storeName && (
                        <p className="text-red-500">
                          {errors.storeName.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 2 */}
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
                {/* row 3 */}
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
                    {errors.throwinAmount && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.throwinAmount.message}
                      </p>
                    )}
                  </td>
                </tr>
                {/* row 4 */}
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
                    {errors.throwinAmount && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.throwinAmount.message}
                      </p>
                    )}
                  </td>
                </tr>
                {/* row 5 */}
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
              <button
                onClick={() =>
                  document.getElementById("my_modal_8").showModal()
                }
              >
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
              {/* Modal box with green background */}
              <div>
                <p className="text-center text-lg  ">
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
                    //   onClick={handleUserIdDelete}
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
