import { useForm } from "react-hook-form";
import ButtonPrimary from "../../../components/ButtonPrimary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import UseGetOrganizations from "../../../hooks/Dashboard/UseGetOrganizations";
import { Circles } from "react-loader-spinner";

const CreateNewSalesAgent = () => {
  const { refetch, isLoading } = UseGetOrganizations();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      accountType: "futsuu",
    },
  });

  const onSubmit = async (data) => {
    const requestBody = {
      company_name: data.companyName,
      address: data.address,
      agency_code: data.agencyCode,
      post_code: data.postCode,
      industry: data.industry,
      invoice_number: data.invoiceNumber,
      corporate_number: data.corporateNumber,
      owner_name: data.contactName,
      telephone_number: data.telephoneNumber,
      email: data.email,
      bank_name: data.bankName,
      branch_name: data.branchName,
      account_type: data.accountType,
      account_number: data.accountNumber,
      account_holder_name: data.accountHolderName,
    };

    try {
      const response = await axiosPrivate.post("/admins/organizations", requestBody);

      if (response.status === 200 || response.status === 201) {
        toast.success("New client created successfully!");
        refetch();
        navigate("/dashboard/client");
      } else {
        const errorMessage =
          response.data?.detail ||
          response.data?.message ||
          "Failed to create client.";
        toast.error(errorMessage);
      }
    } catch (error) {
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

  const submitForm = () => {
    handleSubmit(onSubmit)();
    document.getElementById("my_modal_9").close();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles height="80" width="80" color="#49BBDF" ariaLabel="loading" visible />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="font-semibold text-[27px] text-[#73879C]">クライアント</h2>
        <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px] p-10 ">
          <h4 className="font-semibold text-[18px] text-[#73879C] pb-4">クライアントアカウント新規登録</h4>
          <div className="border-b-[3px] mb-5"></div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <table className="table border-none">
              <tbody>
                {/* Company Name */}
                <tr className="hover">
                  <td><label>企業名（屋号）*</label></td>
                  <td>
                    <input {...register("companyName", { required: "必須入力項目です" })} type="text" placeholder="居酒屋ABC 梅田店" className="w-full border rounded px-4 py-2" />
                    {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName.message}</p>}
                  </td>
                </tr>

                {/* Contact Name */}
                <tr className="hover">
                  <td><label>担当者名*</label></td>
                  <td>
                    <input {...register("contactName", { required: "必須入力項目です" })} type="text" placeholder="中嶋 祐介" className="w-full border rounded px-4 py-2" />
                    {errors.contactName && <p className="text-red-500 text-xs">{errors.contactName.message}</p>}
                  </td>
                </tr>

                {/* Telephone */}
                <tr className="hover">
                  <td><label>電話番号*</label></td>
                  <td>
                    <input {...register("telephoneNumber", { required: "必須入力項目です" })} type="tel" placeholder="0666935869" className="w-full border rounded px-4 py-2" />
                    {errors.telephoneNumber && <p className="text-red-500 text-xs">{errors.telephoneNumber.message}</p>}
                  </td>
                </tr>

                {/* Email */}
                <tr className="hover">
                  <td><label>メールアドレス*</label></td>
                  <td>
                    <input
                      {...register("email", {
                        required: "必須入力項目です",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "有効なメールアドレスを入力してください",
                        },
                      })}
                      type="email"
                      placeholder="sample@domain.co.jp"
                      className="w-full border rounded px-4 py-2"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </td>
                </tr>

                {/* Post Code */}
                <tr className="hover">
                  <td><label>郵便番号*</label></td>
                  <td>
                    <input {...register("postCode", { required: "必須入力項目です" })} type="text" placeholder="554-0095" className="w-full border rounded px-4 py-2" />
                    {errors.postCode && <p className="text-red-500 text-xs">{errors.postCode.message}</p>}
                  </td>
                </tr>

                {/* Address */}
                <tr className="hover">
                  <td><label>住所*</label></td>
                  <td>
                    <input {...register("address", { required: "必須入力項目です" })} type="text" placeholder="大阪市住吉区長居東3-4059" className="w-full border rounded px-4 py-2" />
                    {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                  </td>
                </tr>

                {/* Industry */}
                <tr className="hover">
                  <td><label>業種*</label></td>
                  <td>
                    <input {...register("industry", { required: "必須入力項目です" })} type="text" placeholder="飲食店" className="w-full border rounded px-4 py-2" />
                    {errors.industry && <p className="text-red-500 text-xs">{errors.industry.message}</p>}
                  </td>
                </tr>

                {/* Invoice Number */}
                <tr className="hover">
                  <td><label>インボイス番号*</label></td>
                  <td>
                    <input {...register("invoiceNumber", { required: "必須入力項目です" })} type="text" placeholder="T1234567890123" className="w-full border rounded px-4 py-2" />
                    {errors.invoiceNumber && <p className="text-red-500 text-xs">{errors.invoiceNumber.message}</p>}
                  </td>
                </tr>

                {/* Agency Code */}
                <tr className="hover">
                  <td><label>代理店コード*</label></td>
                  <td>
                    <input {...register("agencyCode", { required: "必須入力項目です" })} type="text" placeholder="1485980" className="w-full border rounded px-4 py-2" />
                    {errors.agencyCode && <p className="text-red-500 text-xs">{errors.agencyCode.message}</p>}
                  </td>
                </tr>

                {/* Corporate Number */}
                <tr className="hover">
                  <td><label>法人番号*</label></td>
                  <td>
                    <input {...register("corporateNumber", { required: "必須入力項目です" })} type="text" placeholder="1234567890123" className="w-full border rounded px-4 py-2" />
                    {errors.corporateNumber && <p className="text-red-500 text-xs">{errors.corporateNumber.message}</p>}
                  </td>
                </tr>

                {/* Bank Info */}
                <tr className="hover">
                  <td><label>振込先口座情報*</label></td>
                  <td>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <input {...register("bankName", { required: "必須入力項目です" })} type="text" placeholder="銀行名" className="border rounded px-2 py-2 w-full" />
                        {errors.bankName && <p className="text-red-500 text-xs">{errors.bankName.message}</p>}
                      </div>
                      <div>
                        <input {...register("branchName", { required: "必須入力項目です" })} type="text" placeholder="支店名" className="border rounded px-2 py-2 w-full" />
                        {errors.branchName && <p className="text-red-500 text-xs">{errors.branchName.message}</p>}
                      </div>
                      <div>
                        <select {...register("accountType", { required: "必須入力項目です" })} className="border rounded px-2 py-2 w-full">
                          <option value="futsuu">普通</option>
                        </select>
                        {errors.accountType && <p className="text-red-500 text-xs">{errors.accountType.message}</p>}
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input {...register("accountNumber", { required: "必須入力項目です" })} type="text" placeholder="口座番号" className="border rounded px-2 py-2 w-full" />
                        {errors.accountNumber && <p className="text-red-500 text-xs">{errors.accountNumber.message}</p>}
                      </div>
                      <div>
                        <input {...register("accountHolderName", { required: "必須入力項目です" })} type="text" placeholder="口座名義" className="border rounded px-2 py-2 w-full" />
                        {errors.accountHolderName && <p className="text-red-500 text-xs">{errors.accountHolderName.message}</p>}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Submit Button */}
            <div className="flex justify-center mt-5">
              <button type="button" onClick={() => document.getElementById("my_modal_9").showModal()}>
                <ButtonPrimary style="rounded-full bg-[#49BBDF] w-[342px] text-[#FFFFFF] font-bold text-lg" btnText={"作成する"} />
              </button>
            </div>
          </form>

          {/* Modal */}
          <dialog id="my_modal_9" className="modal w-[400px] mx-auto">
            <div className="modal-box bg-[#F9F9F9] p-0 pt-7">
              <div className="pb-8">
                <p className="text-center">こちらの内容でメンバーを<br />新規作成しますか？</p>
                <p className="text-center mt-7">入力されたクライアントのメールアドレスに、<br />パスワード設定用のメールが送信されます。</p>
              </div>
              <div className="flex justify-center gap-4 border-t-2">
                <form method="dialog">
                  <button className="px-4 py-4 border-r-2 border-gray-300 flex items-center justify-center">
                    <span className="mr-10">編集する</span>
                  </button>
                </form>
                <div>
                  <button onClick={submitForm} className="px-4 py-4 flex items-center justify-center text-[#2976EA]">
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
