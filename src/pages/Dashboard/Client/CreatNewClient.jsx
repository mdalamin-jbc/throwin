import { useForm } from "react-hook-form";
import ButtonPrimary from "../../../components/ButtonPrimary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import UseGetOrganizations from "../../../hooks/Dashboard/UseGetOrganizations";

const CreateNewSalesAgent = () => {
  const { refetch, isLoading, isError, error } = UseGetOrganizations();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Validate on change for better user experience
    defaultValues: {
      accountType: "futsuu", // Set default account type
    },
  });

  const onSubmit = async (data) => {
    // Create API request body with all required fields
    const requestBody = {
      company_name: data.companyName,
      address: data.address || "", // Default to empty string if not provided
      agency_code: data.agencyCode || "", // Default to empty string if not provided
      post_code: data.postCode,
      industry: data.industry,
      invoice_number: data.invoiceNumber || "", // Default to empty string if not provided
      corporate_number: data.corporateNumber || "", // Default to empty string if not provided
      owner_name: data.contactName,
      telephone_number: data.telephoneNumber,
      email: data.email,
      bank_name: data.bankName,
      branch_name: data.branchName,
      account_type: data.accountType || "futsuu",
      account_number: data.accountNumber,
      account_holder_name: data.accountHolderName,
    };

    console.log("Submitting data:", requestBody);

    try {
      const response = await axiosPrivate.post(
        "/admins/organizations",
        requestBody
      );

      console.log("API Response:", response);

      if (response.status === 200 || response.status === 201) {
        toast.success("New client created successfully!");
        refetch();
        navigate("/dashboard/client");
      } else {
        // Show detailed error if available
        const errorMessage =
          response.data?.detail ||
          response.data?.message ||
          "Failed to create client.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      // Show more detailed error messages from API if available
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        Object.entries(error.response?.data || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ") ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Function to handle form submission from modal
  const submitForm = () => {
    handleSubmit(onSubmit)();
    document.getElementById("my_modal_9").close();
  };

  return (
    <div className="">
      <div className="">
        <h2 className="font-semibold text-[27px] text-[#73879C]">
          クライアント
        </h2>
        <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px] p-10 ">
          <h4 className="font-semibold text-[18px] text-[#73879C] pb-4">
            クライアントアカウント新規登録
          </h4>
          <div className="border-b-[3px] mb-5"></div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <table className="table border-none">
              <tbody>
                {/* row 1 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">
                      企業名（屋号）*
                    </label>
                  </td>
                  <td>
                    <input
                      {...register("companyName", {
                        required: "必須入力項目です",
                      })}
                      type="text"
                      placeholder="居酒屋ABC 梅田店"
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs">
                        {errors.companyName.message}
                      </p>
                    )}
                  </td>
                </tr>
                {/* row 2 */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">担当者名*</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("contactName", {
                          required: "必須入力項目です",
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
                    <label className="block text-gray-700">電話番号*</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("telephoneNumber", {
                          required: "必須入力項目です",
                        })}
                        type="tel"
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
                      メールアドレス*
                    </label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("email", {
                          required: "必須入力項目です",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "有効なメールアドレスを入力してください",
                          },
                        })}
                        type="email"
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
                    <label className="block text-gray-700">郵便番号*</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("postCode", {
                          required: "必須入力項目です",
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
                    <label className="block text-gray-700">住所*</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("address", {
                          required: "必須入力項目です",
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
                    <label className="block text-gray-700">業種*</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("industry", {
                          required: "必須入力項目です",
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
                        {...register("invoiceNumber")}
                        type="text"
                        placeholder="T1234567890123"
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
                        {...register("agencyCode")}
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
                {/* Corporate Number Field */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">法人番号</label>
                  </td>
                  <td>
                    <div className="">
                      <input
                        {...register("corporateNumber")}
                        type="text"
                        placeholder="1234567890123"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {errors.corporateNumber && (
                        <p className="text-red-500">
                          {errors.corporateNumber.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {/* row 10 - Bank account information section */}
                <tr className="hover">
                  <td className="flex items-center gap-[17px]">
                    <label className="block text-gray-700">
                      振込先口座情報*
                    </label>
                  </td>
                  <td>
                    <div className="grid grid-cols-3 gap-8 md:gap-16">
                      <div>
                        <div className="flex items-center gap-[14px]">
                          <input
                            {...register("bankName", {
                              required: "必須入力項目です",
                            })}
                            type="text"
                            placeholder="三井住友"
                            className="w-[94px] border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          />
                          <label className="block text-black">銀行</label>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.bankName && (
                            <p className="text-red-500">
                              {errors.bankName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-[14px]">
                          <input
                            {...register("branchName", {
                              required: "必須入力項目です",
                            })}
                            type="text"
                            placeholder="梅田支店"
                            className="w-[94px] border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          />
                          <label className="block text-black">支店</label>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.branchName && (
                            <p className="text-red-500">
                              {errors.branchName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-[14px]">
                          <select
                            {...register("accountType", {
                              required: "アカウントタイプを選択してください",
                            })}
                            className="w-[120px] md:w-[150px] border rounded px-2 md:px-4 py-2 focus:outline-none focus:border-blue-500"
                          >
                            <option value="futsuu">普通</option>
                          </select>
                          <label className="block text-black">種別</label>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.accountType && (
                            <p className="text-red-500">
                              {errors.accountType.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-5 mt-3">
                      <div>
                        <div className="">
                          <input
                            {...register("accountNumber", {
                              required: "必須入力項目です",
                            })}
                            type="text"
                            placeholder="口座番号"
                            className="w-full md:w-[245px] border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.accountNumber && (
                            <p className="text-red-500">
                              {errors.accountNumber.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="">
                          <input
                            {...register("accountHolderName", {
                              required: "必須入力項目です",
                            })}
                            type="text"
                            placeholder="口座名義"
                            className="w-full md:w-[245px] border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {errors.accountHolderName && (
                            <p className="text-red-500">
                              {errors.accountHolderName.message}
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
                type="button"
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

          {/* Modal */}
          <dialog id="my_modal_9" className="modal w-[400px] mx-auto ">
            <div className="modal-box bg-[#F9F9F9] p-0 pt-7">
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
                <div>
                  <button
                    onClick={submitForm}
                    className="px-4 py-4 flex items-center justify-center text-[#2976EA]"
                  >
                    <span className="ml-8">登録する</span>
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default CreateNewSalesAgent;
