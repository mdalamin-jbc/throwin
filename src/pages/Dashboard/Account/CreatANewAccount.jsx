import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";

const CreateANewAccount = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("フォーム送信データ:", data);
  
    const formData = new FormData();
    formData.append("name", data.storeName);
    formData.append("location", data.location);
    formData.append("throwin_amounts", data.throwinAmount);
    formData.append("gacha_enabled", data.gacha);
  
    try {
      const response = await axiosPrivate.post("restaurant-owner/stores", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        toast.success("アカウントが正常に作成されました！");
        setTimeout(() => navigate("/dashboard/account"), 1500);
      } else {
        console.error("エラーレスポンス:", response.data);
        toast.error("アカウント作成に失敗しました！");
      }
    } catch (error) {
      console.error("エラー:", error);
      toast.error("エラーが発生しました。もう一度お試しください。");
    }
  };
  

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px] ">
          店舗（チーム）新規作成
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px] mt-6 space-y-6 px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-8 mt-6 space-y-6"
            encType="multipart/form-data" // Ensures proper file upload handling
          >
            <table className="table border-none">
              <tbody>
                {/* 店舗（チーム）名 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <p>店舗（チーム）名</p>
                  </td>
                  <td>
                    <input
                      {...register("storeName", {
                        required: "店舗名は必須です",
                      })}
                      type="text"
                      placeholder="居酒屋ABC 梅田店"
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    {errors.storeName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.storeName.message}
                      </p>
                    )}
                  </td>
                </tr>

                {/* TOP画像 */}
                {/* <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <p>TOP画像</p>
                  </td>
                  <td>
                    <input
                      {...register("topImage", {
                        required: "画像をアップロードしてください",
                      })}
                      type="file"
                      accept="image/*"
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    {errors.topImage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.topImage.message}
                      </p>
                    )}
                  </td>
                </tr> */}

                {/* Throwin額の選択 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <p>Throwin額の選択ボタン</p>
                  </td>
                  <td className="">
                    <div className="flex space-x-4">
                      {[1000, 5000, 10000].map((amount) => (
                        <label
                          key={amount}
                          className="flex items-center space-x-2 border px-4 py-2 rounded cursor-pointer"
                        >
                          <input
                            type="radio"
                            {...register("throwinAmount", {
                              required: "金額を選択してください",
                            })}
                            value={amount}
                          />
                          <span>{amount.toLocaleString()} 円</span>
                        </label>
                      ))}
                    </div>
                    {errors.throwinAmount && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.throwinAmount.message}
                      </p>
                    )}
                  </td>
                </tr>

                {/* ガチャ券付与 */}
                <tr>
                  <td>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      ガチャ券付与
                    </label>
                  </td>
                  <td>
                    <select
                      {...register("gacha_enabled")}
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="yes">有り</option>
                      <option value="no">無し</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#4EBDF3] text-white py-3 px-10 rounded-lg text-lg"
              >
                作成する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateANewAccount;
