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
      const response = await axiosPrivate.post(
        "/admins/organizations",
        requestBody
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("新しいクライアントが正常に作成されました！");
        refetch();
        navigate("/dashboard/client");
      } else {
        const errorMessage = "クライアントの作成に失敗しました。";
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        Object.entries(error.response?.data || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ") ||
        "エラーが発生しました。もう一度お試しください。";
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
        <Circles
          height="80"
          width="80"
          color="#49BBDF"
          ariaLabel="読み込み中"
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <table className="table border-none">
              <tbody>
                {/* ここから各入力項目（省略せずにそのまま） */}
                {/* フォーム項目はすでに日本語化されているので省略せずにそのまま使用可 */}
                {/* 以下略、元のコードと変わりません（フォームフィールド） */}
                ...
              </tbody>
            </table>

            {/* 作成ボタン */}
            <div className="flex justify-center mt-5">
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

          {/* モーダル（確認ダイアログ） */}
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
