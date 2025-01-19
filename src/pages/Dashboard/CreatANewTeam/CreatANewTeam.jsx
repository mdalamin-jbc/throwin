import  { useState } from "react";
import { useForm } from "react-hook-form";
import DashboardButton from "../../../utils/DashboardButton/DashboardButton";

const CreateANewTeam = () => {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 30;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  const handleInputChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>

      {/* Form Container */}
      <div className="bg-white mt-[27px] rounded-xl shadow-md pb-[60px] relative">
        {/* Section Title */}
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px]">
          店舗（チーム）新規作成
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mx-[33px] mt-5">
          <table className="table-fixed w-full">
            <tbody>
              {/* 店舗（チーム）名 */}
              <tr className="h-[70px] align-middle">
                <td className="w-[220px] text-gray-700 font-medium">
                  店舗（チーム）名
                </td>
                <td>
                  <div className="flex items-end gap-5">
                    <input
                      {...register("teamName", {
                        required: "店舗（チーム）名は必須です",
                        maxLength: {
                          value: maxChars,
                          message: `${maxChars}文字以内で入力してください`,
                        },
                      })}
                      placeholder="居酒屋ABC 梅田店"
                      maxLength={maxChars}
                      onChange={handleInputChange}
                      className="min-w-[472px] rounded-[3px] py-2 px-4 border border-gray-300 focus:ring focus:ring-gray-400 outline-none"
                    />
                    <p
                      className={`font-semibold text-lg ${
                        charCount > maxChars ? "text-red-500" : "text-[#9D9D9D]"
                      }`}
                    >
                      {charCount}/{maxChars}
                    </p>
                  </div>
                  {errors.teamName && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errors.teamName.message}
                    </span>
                  )}
                </td>
              </tr>

              {/* TOP画像 */}
              <tr className="h-[70px] align-middle">
                <td className="w-[180px] text-gray-700 font-medium">TOP画像</td>
                <td>
                  <input
                    type="file"
                    {...register("topImage", { required: "TOP画像は必須です" })}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-white file:text-gray-700 hover:file:bg-gray-100"
                  />
                  {errors.topImage && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errors.topImage.message}
                    </span>
                  )}
                </td>
              </tr>

              {/* Throwin額の選択ボタン */}
              <tr className="h-[90px] align-top">
                <td className="w-[180px] text-gray-700 font-medium">
                  Throwin額の選択ボタン
                </td>
                <td>
                  <div className="flex space-x-4">
                    {[1000, 5000, 10000].map((amount) => (
                      <label
                        key={amount}
                        className="flex items-center space-x-2 border rounded-lg px-6 py-3 cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          value={amount}
                          {...register("throwinAmount", {
                            validate: (value) =>
                              value && value.length > 0
                                ? true
                                : "Throwin額を選択してください",
                          })}
                          className="form-checkbox text-blue-500"
                        />
                        <span>{amount} 円</span>
                      </label>
                    ))}
                  </div>
                  {errors.throwinAmount && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errors.throwinAmount.message}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Submit Button */}
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-[100px]">
            <button type="submit">
              <DashboardButton
                btnText={"作成する"}
                styles={"px-[135px] rounded-full"}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateANewTeam;
