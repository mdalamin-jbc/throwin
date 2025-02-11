import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import { BiSolidDownArrow } from "react-icons/bi";

const CreateANewAccount = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [amounts, setAmounts] = useState([]); // Store selected amounts
  const throwinAmount = watch("throwinAmount", "");
  const storeName = watch("storeName", "");

  console.log(amounts);

  // Add Amount Function
  const addAmount = () => {
    const amountValue = parseInt(throwinAmount, 10);
    if (
      !isNaN(amountValue) &&
      amountValue >= 500 &&
      amountValue <= 50000 &&
      !amounts.includes(amountValue.toString())
    ) {
      setAmounts([...amounts, amountValue.toString()]);
      setValue("throwinAmount", ""); // Clear input
    } else {
      toast.error("金額は500円から50,000円の間で選択してください。");
    }
  };

  // Remove Amount Function
  const removeAmount = (amountToRemove) => {
    setAmounts(amounts.filter((amount) => amount !== amountToRemove));
  };

  // Form Submit Function
  const onSubmit = async (data) => {
    const storeCreateData = new FormData();
    storeCreateData.append("name", String(data.storeName)); // Ensure string
    storeCreateData.append("location", String(data.location)); // Ensure string
    storeCreateData.append("gacha_enabled", String(data.gacha_enabled)); // Ensure string
    storeCreateData.append(
      "throwin_amounts",
      JSON.stringify(amounts.map(String))
    ); // Ensure array of strings

    console.log(Object.fromEntries(storeCreateData)); // Debugging

    try {
      const response = await axiosPrivate.post(
        "restaurant-owner/stores",
        storeCreateData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("アカウントが正常に作成されました！");
        setTimeout(() => navigate("/dashboard/account"), 1500);
      } else {
        toast.error("アカウント作成に失敗しました！");
      }
    } catch (error) {
      toast.error("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px]">
          店舗（チーム）新規作成
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px] mt-6 space-y-6 px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-8 mt-6 space-y-6"
          >
            <table className="table border-none">
              <tbody className="border-none">
                {/* 店舗（チーム）名 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <p>店舗（チーム）名</p>
                  </td>
                  <td>
                    <div className="flex items-baseline gap-2">
                      <input
                        {...register("storeName", {
                          required: "店舗名は必須です",
                          maxLength: {
                            value: 30,
                            message: "最大30文字まで入力できます。",
                          },
                        })}
                        type="text"
                        placeholder="居酒屋ABC 梅田店"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                        value={storeName}
                        onChange={(e) => {
                          if (e.target.value.length <= 30) {
                            setValue("storeName", e.target.value);
                          }
                        }}
                      />
                      <p className="text-[#777A83]">{storeName.length}/30</p>
                    </div>
                    {errors.storeName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.storeName.message}
                      </p>
                    )}
                  </td>
                </tr>

                {/* TOP画像 */}
                <tr className="hover">
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
                </tr>

                {/* Throwin額の選択 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <p>Throwin額の選択</p>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-2">
                      {/* Selected Amounts List (Left Side) */}
                      <div className="flex space-x-1">
                        {amounts.map((amount, index) => (
                          <div
                            key={index}
                            className="border border-[#D9D9D9] text-[#777A83] px-[14px] py-2 rounded-[3px] text-sm flex gap-3 cursor-pointer"
                            onClick={() => removeAmount(amount)} // Click to remove
                          >
                            <p>{amount.toLocaleString()}</p>{" "}
                            <p className="text-[#434343]">円</p>
                          </div>
                        ))}
                      </div>

                      {/* Input Field and Add Button */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          {...register("throwinAmount", {
                            min: { value: 500, message: "最低金額は500円です" },
                            max: {
                              value: 50000,
                              message: "最大金額は50000円です",
                            },
                          })}
                          className="border-b-2 focus:border-none px-4 py-2 w-40"
                          placeholder="金額を入力"
                          onKeyDown={(e) => e.key === "Enter" && addAmount()}
                        />

                        <button
                          type="button"
                          onClick={addAmount}
                          className=" text-[#44495B] px-4 py-2 "
                        >
                          ※最低500円
                        </button>
                      </div>
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
                    <div className="relative w-[120px]">
                      {/* Custom Select Box with Flex Layout */}
                      <div className="w-full border rounded px-4 py-2 flex items-center justify-between cursor-pointer">
                        {/* Left Side: Arrow Icon */}
                        <BiSolidDownArrow className="text-[#3BC2EE] text-sm" />

                        {/* Right Side: Select Dropdown */}
                        <select
                          {...register("gacha_enabled")}
                          className="bg-transparent w-full focus:outline-none appearance-none text-right"
                        >
                          <option value="yes">有り</option>
                          <option value="no">無し</option>
                        </select>
                      </div>
                    </div>
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
