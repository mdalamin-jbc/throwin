import { useForm } from "react-hook-form";

const CreateANewAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log("Form Data:", data);
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
          >
            <table className="table border-none">
              <tbody>
                {/* row 1 */}
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
            <div className="text-center">
              <button
                className="bg-[#4EBDF3] text-white py-3 px-10 rounded-lg text-lg"
                onClick={() =>
                  document.getElementById("my_modal_7").showModal()
                }
              >
                作成する
              </button>
            </div>
          </form>
          {/* ------------------------- */}

          <dialog id="my_modal_7" className="modal max-w-[343px] mx-auto">
            <div className="modal-box bg-[#F9F9F9] p-0 pt-7">
              {/* Modal box with green background */}
              <div>
                <p className="text-center text-lg  ">
                  こちらの内容で店舗（チーム）を
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

export default CreateANewAccount;
