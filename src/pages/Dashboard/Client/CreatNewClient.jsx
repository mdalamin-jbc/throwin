import ClientForm from "../../../components/client/ClientForm";
import UseGetOrganizations from "../../../hooks/Dashboard/UseGetOrganizations";

const CreateNewClient = () => {
  const { refetch, isLoading } = UseGetOrganizations();

  return (
    <div className="">
      <div className="">
        <h2 className="font-semibold text-[27px] text-[#73879C]">
          クライアント
        </h2>

        {/* Using the reusable ClientForm component */}
        <ClientForm
          refetch={refetch}
          redirectPath="/dashboard/client"
          onSuccess={(data) => {
            // Any additional actions after successful creation
          }}
        />
      </div>
    </div>
  );
};

export default CreateNewClient;
