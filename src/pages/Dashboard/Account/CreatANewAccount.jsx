import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import { BiSolidDownArrow } from "react-icons/bi";

const CreateANewAccount = () => {
  const [topImage, setTopImage] = useState(null);
  const [amounts, setAmounts] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [predefinedAmounts] = useState(["1,000", "5,000", "10,000"]);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const throwinAmount = watch("throwinAmount", "");
  const storeName = watch("storeName", "");

  // Add Amount Function
  const addAmount = () => {
    const amountValue = parseInt(throwinAmount, 10);
    if (!isNaN(amountValue) && amountValue >= 500 && amountValue <= 50000) {
      if (!amounts.includes(amountValue.toString())) {
        setAmounts((prev) => [...prev, amountValue.toString()]);
        setValue("throwinAmount", ""); // Clear input
      } else {
        toast.error("この金額は既に追加されています。");
      }
    } else {
      toast.error("金額は500円から50,000円の間で選択してください。");
    }
  };

  // Remove Amount Function
  const removeAmount = (amountToRemove) => {
    setAmounts((prev) => prev.filter((amount) => amount !== amountToRemove));
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTopImage(file);
      setSelectedFileName(file.name);
    }
  };

  // Select predefined amount
  const selectPredefinedAmount = (amount) => {
    const cleanAmount = amount.replace(/,/g, "");
    if (!amounts.includes(cleanAmount)) {
      setAmounts((prev) => [...prev, cleanAmount]);
    } else {
      toast.error("この金額は既に追加されています。");
    }
  };

  // Form Submit Function
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.storeName);
    formData.append("location", data.location);
    formData.append("gacha_enabled", data.gacha_enabled);

    // Ensure throwin_amounts is sent correctly
    if (amounts.length > 0) {
      amounts.forEach((amount) => formData.append("throwin_amounts", amount));
    } else {
      toast.error("Throwin額を1つ以上追加してください。");
      return;
    }

    if (topImage) {
      formData.append("banner", topImage);
    }

    try {
      const response = await axiosPrivate.post(
        "restaurant-owner/stores",
        formData,
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
      console.error("Error:", error);
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

        <div className="mx-[33px] mt-6 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <table className="table w-full border-none">
              <tbody>
                <tr className="border-none">
                  <td className="w-1/4 text-gray-700 align-middle">
                    店舗（チーム）名
                  </td>
                  <td className="w-3/4">
                    <div className="flex items-center">
                      <input
                        {...register("storeName", {
                          required: "店舗名は必須です",
                          maxLength: 30,
                        })}
                        type="text"
                        placeholder="居酒屋ABC 梅田店"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <span className="ml-2 text-gray-500">
                        {storeName?.length || 0}/30
                      </span>
                    </div>
                    {errors.storeName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.storeName.message}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-none">
                  <td className="text-gray-700 align-middle">TOP画像</td>
                  <td>
                    <div className="flex items-center">
                      <input
                        type="file"
                        id="topImage"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="topImage"
                        className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-8 text-center text-gray-600"
                      >
                        ファイル選択
                      </label>
                      {selectedFileName && (
                        <span className="ml-4 text-gray-600">
                          {selectedFileName}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
                <tr className="border-none">
                  <td className="text-gray-700 align-top pt-4">
                    Throwin額の選択ボタン
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {predefinedAmounts.map((amount, index) => (
                        <button
                          key={index}
                          type="button"
                          className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50"
                          onClick={() => selectPredefinedAmount(amount)}
                        >
                          {amount} 円
                        </button>
                      ))}
                    </div>
                    <div className="text-gray-500 text-sm">※最低500円</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {amounts.map((amount, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 px-4 py-2 rounded-md flex items-center"
                        >
                          <span>{Number(amount).toLocaleString()} 円</span>
                          <button
                            type="button"
                            className="ml-2 text-gray-500"
                            onClick={() => removeAmount(amount)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr className="border-none">
                  <td className="text-gray-700 align-middle">ガチャ券付与</td>
                  <td>
                    <div className="relative w-[120px]">
                      <div className="w-full border rounded px-4 py-2 flex items-center justify-between cursor-pointer">
                        <select
                          {...register("gacha_enabled")}
                          className="bg-transparent w-full outline-none appearance-none"
                          defaultValue="yes"
                        >
                          <option value="yes">有り</option>
                          <option value="no">無し</option>
                        </select>
                        <BiSolidDownArrow className="text-[#3BC2EE] text-sm" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-[#4EBDF3] text-white py-3 px-10 rounded-lg text-lg font-medium"
              >
                編集する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateANewAccount;
