import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

/**
 * ClientForm component for creating or editing client information
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to handle form submission
 * @returns {JSX.Element} Client form component
 */
const ClientForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      accountType: "futsuu", // Default account type is "ordinary"
    },
  });

  // Handle form submission
  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <table className="table border-none">
        <tbody>
          {/* Company Name */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">
              企業名 (会社)
            </td>
            <td className="pl-0">
              <input
                type="text"
                {...register("companyName", { required: true })}
                placeholder="株式会社フリーカンパニー"
                className="input input-bordered w-full"
              />
              {errors.companyName && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </td>
          </tr>

          {/* Contact Person */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">担当者名</td>
            <td className="pl-0">
              <input
                type="text"
                {...register("contactName", { required: true })}
                placeholder="中島 裕介"
                className="input input-bordered w-full"
              />
              {errors.contactName && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </td>
          </tr>

          {/* Phone Number */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">電話番号</td>
            <td className="pl-0">
              <input
                type="text"
                {...register("telephoneNumber", { required: true })}
                placeholder="0669355869"
                className="input input-bordered w-full"
              />
              {errors.telephoneNumber && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </td>
          </tr>

          {/* Email Address */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">
              メールアドレス
            </td>
            <td className="pl-0">
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="ggu.bbel@free-company.co.jp"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message || "This field is required"}
                </span>
              )}
            </td>
          </tr>

          {/* Postal Code */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">郵便番号</td>
            <td className="pl-0">
              <input
                type="text"
                {...register("postCode", { required: true })}
                placeholder="564-0095"
                className="input input-bordered w-full"
              />
              {errors.postCode && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </td>
          </tr>

          {/* Address */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">住所</td>
            <td className="pl-0">
              <input
                type="text"
                {...register("address", { required: true })}
                placeholder="大阪市住吉区長居3-4059"
                className="input input-bordered w-full"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </td>
          </tr>

          {/* Industry */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">業種</td>
            <td className="pl-0">
              <input
                type="text"
                {...register("industry", { required: true })}
                placeholder="バスケットボールチーム"
                className="input input-bordered w-full"
              />
              {errors.industry && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </td>
          </tr>

          {/* Invoice Number */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">
              インボイス適格請求書番号
            </td>
            <td className="pl-0">
              <input
                type="text"
                {...register("invoiceNumber", { required: true })}
                placeholder="バスケットボールチーム"
                className="input input-bordered w-full"
              />
              {errors.invoiceNumber && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </td>
          </tr>

          {/* Corporate Number (Optional) */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">
              法人番号（任意）
            </td>
            <td className="pl-0">
              <input
                type="text"
                {...register("corporateNumber")}
                placeholder="バスケットボールチーム"
                className="input input-bordered w-full"
              />
            </td>
          </tr>

          {/* Agency Code */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">
              代理店コード
            </td>
            <td className="pl-0">
              <input
                type="text"
                {...register("agencyCode", { required: true })}
                placeholder="1485980 (代理店がログインしている場合は自動表示)"
                className="input input-bordered w-full"
              />
              {errors.agencyCode && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </td>
          </tr>

          {/* Bank Account Information */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0">
              振込先口座情報
            </td>
            <td className="pl-0 grid grid-cols-3 gap-2">
              <input
                type="text"
                {...register("bankName", { required: true })}
                placeholder="三井住友"
                className="input input-bordered"
              />
              <div className="flex items-center">
                <input
                  type="text"
                  {...register("branchName", { required: true })}
                  placeholder="東京"
                  className="input input-bordered mr-2"
                />
                <span>支店</span>
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  {...register("accountType", { required: true })}
                  placeholder="普通"
                  className="input input-bordered mr-2"
                />
                <span>預金</span>
              </div>
              {(errors.bankName || errors.branchName || errors.accountType) && (
                <span className="text-red-500 text-sm col-span-3">
                  All bank fields are required
                </span>
              )}
            </td>
          </tr>

          {/* Account Number and Account Holder Name */}
          <tr className="border-none">
            <td className="w-1/4 text-[#73879C] font-medium pl-0"></td>
            <td className="pl-0 grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  {...register("accountNumber", { required: true })}
                  placeholder="口座番号"
                  className="input input-bordered w-full"
                />
                {errors.accountNumber && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("accountHolderName", { required: true })}
                  placeholder="振込先名"
                  className="input input-bordered w-full"
                />
                {errors.accountHolderName && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

ClientForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ClientForm;
