import { useForm } from "react-hook-form";
import ButtonPrimary from "../../../components/ButtonPrimary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatNewClient = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleCreatNewClient = () => {
    toast.success("New client creat successfully!", {
      duration: 3000,
      position: "top-center",
    });

    setTimeout(() => {
      navigate("/dashboard/client");
    }, 1500);
  };

  return (
    <div className="">
      <div className="">
        <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
        <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px] p-10 ">
          <h4 className="font-semibold text-[18px] text-[#73879C] pb-4">
            クライアントアカウント新規登録
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
                    <label className="block text-gray-700">
                      企業名（屋号）
                    </label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("companyName", {
                          required: "株式会社フリーカンパニー",
                        })}
                        type="text"
                        placeholder="居酒屋ABC 梅田店"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.companyName && (
                        <p className="text-red-500">
                          {errors.companyName.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 2 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">担当者名</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("contactName", {
                          required: "株式会社フリーカンパニー",
                        })}
                        type="text"
                        placeholder="中嶋　祐介"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.contactName && (
                        <p className="text-red-500">
                          {errors.contactName.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 3 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">電話番号</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("telephoneNumber", {
                          required: "株式会社フリーカンパニー",
                        })}
                        type="number"
                        placeholder="0666935869"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.telephoneNumber && (
                        <p className="text-red-500">
                          {errors.telephoneNumber.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 4 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">
                      メールアドレス
                    </label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("email", {
                          required: "株式会社フリーカンパニー",
                        })}
                        type="mail"
                        placeholder="ggu.bbel@free-company.co.jp"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 5 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">郵便番号</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("postCode", {
                          required: "株式会社フリーカンパニー",
                        })}
                        type="text"
                        placeholder="554-0095"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.postCode && (
                        <p className="text-red-500">
                          {errors.postCode.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 6 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">住所</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("address", {
                          required: "株式会社フリーカンパニー",
                        })}
                        type="text"
                        placeholder="大阪市住吉区長居東3-4059"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.address && (
                        <p className="text-red-500">{errors.address.message}</p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 7 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">業種</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("industry", {
                          required: "株式会社フリーカンパニー",
                        })}
                        type="text"
                        placeholder="バスケットボールチーム"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.industry && (
                        <p className="text-red-500">
                          {errors.industry.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 8 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">
                      インボイス適格請求書番号
                    </label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("invoiceNumber", {
                          required: "株式会社フリーカンパニー",
                        })}
                        type="text"
                        placeholder="バスケットボールチーム"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.invoiceNumber && (
                        <p className="text-red-500">
                          {errors.invoiceNumber.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 9 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">代理店コード</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("agencyCode", {
                          required: "株式会社フリーカンパニー",
                        })}
                        type="text"
                        placeholder="1485980（代理店がログインしている場合は自動表示）"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.agencyCode && (
                        <p className="text-red-500">
                          {errors.agencyCode.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 10 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">
                      振込先口座情報
                    </label>
                  </td>
                  <td>
                    <div className="grid grid-cols-3 gap-16">
                      <div>
                        <div className="flex items-center gap-[14px]">
                          <input
                            {...register("bancAccountInfo", {
                              required: "株式会社フリーカンパニー",
                            })}
                            type="text"
                            placeholder="三井住友"
                            className=" w-[94px] border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          />
                          <label className="block text-black">銀行</label>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.bancAccountInfo && (
                            <p className="text-red-500">
                              {errors.bancAccountInfo.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-[14px]">
                          <input
                            {...register("storeName", {
                              required: "株式会社フリーカンパニー",
                            })}
                            type="text"
                            placeholder="三井住友"
                            className="w-[94px] border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          />
                          <label className="block text-black">銀行</label>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.storeName && (
                            <p className="text-red-500">
                              {errors.storeName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-[14px]">
                          <input
                            {...register("storeName", {
                              required: "株式会社フリーカンパニー",
                            })}
                            type="text"
                            placeholder="三井住友"
                            className="w-[94px] border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          />
                          <label className="block text-black">銀行</label>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.storeName && (
                            <p className="text-red-500">
                              {errors.storeName.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 mt-3">
                      <div>
                        <div className="">
                          <input
                            {...register("storeName", {
                              required: "株式会社フリーカンパニー",
                            })}
                            type="text"
                            placeholder="三井住友"
                            className="w-[245px]  border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.storeName && (
                            <p className="text-red-500">
                              {errors.storeName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="">
                          <input
                            {...register("storeName", {
                              required: "株式会社フリーカンパニー",
                            })}
                            type="text"
                            placeholder="三井住友"
                            className="w-[245px] border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.storeName && (
                            <p className="text-red-500">
                              {errors.storeName.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Submit Button */}
            <div className="flex justify-center mt-5 ">
              <button
                onClick={() =>
                  document.getElementById("my_modal_9").showModal()
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

          <dialog id="my_modal_9" className="modal w-[400px] mx-auto ">
            <div className="modal-box bg-[#F9F9F9] p-0 pt-7">
              {/* Modal box with green background */}
              <div className="pb-8">
                <p className="text-center ">
                  こちらの内容でメンバーを
                  <br /> 新規作成しますか？
                </p>
                <p className="text-center  mt-7">
                  入力されたクライアントのメールアドレスに、
                  <br />
                  パスワード設定用のメールが送信されます。
                </p>
              </div>

              <div className="flex justify-center gap-4 border-t-2">
                <form method="dialog">
                  <button className="px-4 py-4 border-r-2 border-gray-300 flex items-center justify-center">
                    <span className="mr-10">編集する</span>
                  </button>
                </form>
                <form method="dialog">
                  <button
                    onClick={handleCreatNewClient}
                    className="px-4 py-4 flex items-center justify-center text-[#2976EA]"
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

export default CreatNewClient;
