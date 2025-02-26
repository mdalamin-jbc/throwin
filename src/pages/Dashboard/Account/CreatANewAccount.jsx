import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import { BiSolidDownArrow } from "react-icons/bi";

const CreateANewAccount = () => {
  const [topImage, setTopImage] = useState(null);
  const [amounts, setAmounts] = useState([]);

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
    setTopImage(e.target.files[0]);
  };

  // Form Submit Function
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    console.log("Amounts:", amounts);
    console.log("Top Image:", topImage);

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
        const response = await axiosPrivate.post("restaurant-owner/stores", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Response:", response);

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

        <div className="mx-[33px] mt-6 space-y-6 px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-8 mt-6 space-y-6"
          >
            <table className="table border-none">
              <tbody>
                <tr className="hover">
                  <td>店舗（チーム）名</td>
                  <td>
                    <input
                      {...register("storeName", {
                        required: "店舗名は必須です",
                        maxLength: 30,
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
                <tr className="hover">
                  <td>TOP画像</td>
                  <td>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full border rounded px-4 py-2"
                    />
                  </td>
                </tr>
                <tr className="hover">
                  <td>Throwin額の選択</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      {amounts.map((amount, index) => (
                        <div
                          key={index}
                          className="border px-[14px] py-2 rounded-[3px] cursor-pointer"
                          onClick={() => removeAmount(amount)}
                        >
                          {amount} 円
                        </div>
                      ))}
                      <input
                        type="number"
                        {...register("throwinAmount", { min: 500, max: 50000 })}
                        className="border px-4 py-2 w-40"
                        placeholder="金額を入力"
                        onKeyDown={(e) => e.key === "Enter" && addAmount()}
                      />
                      <button
                        type="button"
                        onClick={addAmount}
                        className="px-4 py-2"
                      >
                        ※最低500円
                      </button>
                    </div>
                    {errors.throwinAmount && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.throwinAmount.message}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>ガチャ券付与</td>
                  <td>
                    <div className="relative w-[120px]">
                      <div className="w-full border rounded px-4 py-2 flex items-center cursor-pointer">
                        <BiSolidDownArrow className="text-[#3BC2EE] text-sm" />
                        <select
                          {...register("gacha_enabled")}
                          className="bg-transparent w-full"
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
