import { useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import UseGetOrganizations from "../../hooks/Dashboard/UseGetOrganizations";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import ClientForm from "./ClientForm";

const EditClient = () => {
  const { id } = useParams();
  const location = useLocation();
  const clientDataFromState = location.state?.clientData;
  const { refetch } = UseGetOrganizations();
  const axiosPrivate = useAxiosPrivate();
  const [clientData, setClientData] = useState(clientDataFromState || null);
  const [isLoading, setIsLoading] = useState(!clientDataFromState);
  const [error, setError] = useState(null);

  const formatClientData = useCallback((data, id) => {
    return {
      id: data.id || id,
      companyName: data.company_name || "",
      contactName: data.owner_name || "",
      telephoneNumber: data.telephone_number || "",
      email: data.email || "",
      postCode: data.post_code || "",
      address: data.address || "",
      industry: data.industry || "",
      invoiceNumber: data.invoice_number || "",
      agencyCode: data.agency_code || "",
      corporateNumber: data.corporate_number || "",
      bankName: data.bank_name || "",
      branchName: data.branch_name || "",
      accountType: data.account_type || "futsuu",
      accountNumber: data.account_number || "",
      accountHolderName: data.account_holder_name || "",
    };
  }, []);

  useEffect(() => {
    if (clientDataFromState) {
      console.log(
        "Using client data from navigation state:",
        clientDataFromState
      );
      return;
    }

    if (!id) {
      setError("クライアントIDが指定されていません");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchClientData = async () => {
      setIsLoading(true);
      try {
        let data;
        try {
          const response = await axiosPrivate.get(
            `/admins/organizations/${id}`,
            {
              signal: controller.signal,
            }
          );
          data = response.data;
        } catch (directError) {
          console.warn("Direct API call failed, trying organizations list");
          const organizationsResponse = await axiosPrivate.get(
            `/admins/organizations`,
            {
              signal: controller.signal,
            }
          );
          const clientFromList = Array.isArray(organizationsResponse.data)
            ? organizationsResponse.data.find(
                (org) => org.id === id || org.id === parseInt(id)
              )
            : null;
          if (!clientFromList) {
            throw new Error("クライアントが見つかりませんでした");
          }
          data = clientFromList;
        }

        if (!data || typeof data !== "object") {
          throw new Error("無効なデータ形式が受信されました");
        }
        console.log({ data });

        const formattedData = formatClientData(data, id);
        setClientData(formattedData);
        setIsLoading(false);
      } catch (err) {
        if (err.name === "CanceledError") {
          return;
        }
        console.error("Error fetching client data:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          "クライアント情報の取得に失敗しました";
        setError(errorMessage);
        toast.error(errorMessage);
        setIsLoading(false);
      }
    };

    fetchClientData();

    return () => {
      controller.abort();
    };
  }, [id, axiosPrivate, clientDataFromState, formatClientData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white mt-[27px] rounded-xl p-10 mr-[54px]">
        <div className="text-center py-10">
          <p className="text-red-500 font-medium">エラーが発生しました</p>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="font-semibold text-[27px] text-[#73879C] mb-6">
        クライアント編集
      </h2>
      {clientData && (
        <ClientForm
          defaultValues={clientData}
          isEditMode={true}
          refetch={refetch}
          redirectPath="/dashboard/client"
          onSuccess={(data) => {
            console.log("Client updated:", data);
            toast.success("クライアント情報が更新されました");
          }}
        />
      )}
    </div>
  );
};

EditClient.propTypes = {
  // No props are directly passed to EditClient, but defining PropTypes for clarity
};

// Define PropTypes for ClientForm to ensure correct prop types
ClientForm.propTypes = {
  defaultValues: PropTypes.shape({
    id: PropTypes.string,
    companyName: PropTypes.string,
    contactName: PropTypes.string,
    telephoneNumber: PropTypes.string,
    email: PropTypes.string,
    postCode: PropTypes.string,
    address: PropTypes.string,
    industry: PropTypes.string,
    invoiceNumber: PropTypes.string,
    agencyCode: PropTypes.string,
    corporateNumber: PropTypes.string,
    bankName: PropTypes.string,
    branchName: PropTypes.string,
    accountType: PropTypes.oneOf(["futsuu", "touza", "chochiku"]),
    accountNumber: PropTypes.string,
    accountHolderName: PropTypes.string,
  }).isRequired,
  isEditMode: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
  redirectPath: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditClient;
