import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import ButtonPrimary from "../../../components/ButtonPrimary";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import UseGetOrganizations from "../../../hooks/Dashboard/UseGetOrganizations";
import ClientForm from "../../../components/Form/ClientForm";
import { useState } from "react"; // Added import for useState

/**
 * CreateNewSalesAgent component for registering new client accounts
 * @returns {JSX.Element} CreateNewSalesAgent component
 */
const CreateNewSalesAgent = () => {
  const { refetch, isLoading } = UseGetOrganizations();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Added state for tracking submission status

  /**
   * Handle form submission to create a new client
   * @param {Object} data - Form data
   */
  const onSubmit = async (data) => {
    console.log("submit call holo...");
    setIsSubmitting(true); // Set submitting state to true

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
    console.log("Sending request with data:", requestBody);

    try {
      // Make sure the URL is correct and the API endpoint exists
      const response = await axiosPrivate.post(
        "/admins/organizations",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response);

      if (response.status === 200 || response.status === 201) {
        toast.success("新しいクライアントが正常に作成されました！");
        await refetch(); // Make sure refetch completes
        navigate("/dashboard/client");
      } else {
        const errorMessage = "クライアントの作成に失敗しました。";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("API request failed:", error);

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        Object.entries(error.response?.data || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ") ||
        "エラーが発生しました。もう一度お試しください。";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false); // Reset submitting state regardless of outcome
    }
  };

  /**
   * Submit form and close modal
   */
  const submitForm = () => {
    const form = document.getElementById("clientForm");
    if (form) {
      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      document.getElementById("my_modal_9").close();
    } else {
      console.error("Client form element not found");
      toast.error("フォームが見つかりません。ページを更新してお試しください。");
    }
  };

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#49BBDF"
          ariaLabel="Loading"
          visible
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="font-semibold text-[27px] text-[#73879C]">
          クライアント
        </h2>
        <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px] p-10 ">
          <h4 className="font-semibold text-[18px] text-[#73879C] pb-4">
            クライアントアカウント新規登録
          </h4>
          <div className="border-b-[3px] mb-5"></div>

          {/* Client form component */}
          <div id="clientForm">
            <ClientForm onSubmit={onSubmit} />
          </div>

          {/* Registration button */}
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={() => document.getElementById("my_modal_9").showModal()}
              disabled={isSubmitting}
            >
              <ButtonPrimary
                style={`rounded-full ${
                  isSubmitting ? "bg-gray-400" : "bg-[#49BBDF]"
                } w-[342px] text-[#FFFFFF] font-bold text-lg`}
                btnText={isSubmitting ? "処理中..." : "登録する"}
              />
            </button>
          </div>

          {/* Confirmation modal */}
          <dialog id="my_modal_9" className="modal w-[400px] mx-auto">
            <div className="modal-box bg-[#F9F9F9] p-0 pt-7">
              <div className="pb-8">
                <p className="text-center">
                  こちらの内容でメンバーを
                  <br />
                  新規作成しますか？
                </p>
                <p className="text-center mt-7">
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
                    disabled={isSubmitting}
                  >
                    <span className="ml-8">
                      {isSubmitting ? "処理中..." : "登録する"}
                    </span>
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
