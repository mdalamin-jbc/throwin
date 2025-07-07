import { useForm } from "react-hook-form";
import logo from "../../../assets/images/socialLogin/logo2.png";
import QRCode from "react-qr-code";
import ButtonPrimary from "../../../components/ButtonPrimary";
import UseGetRestaurantOwnerStoreList from "../../../hooks/Dashboard/UseGetRestaurantOwnerStoreList";
import UseGetStaffByStoreCode from "../../../hooks/Dashboard/UseGetStaffByStoreCode";
import { useState, useEffect } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

const QrCreation = () => {
  const { storeList } = UseGetRestaurantOwnerStoreList();
  const [store_code, setStore_code] = useState("");
  const [member_username, setMemberUsername] = useState("");
  const [qrLink, setQrLink] = useState("https://alpha.throwin-glow.com");

  const { restaurantStaffListByStoreCode = [], refetch } =
    UseGetStaffByStoreCode(store_code);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    clearErrors,
    setValue
  } = useForm();

  const team = watch("team");
  const member = watch("member");

  // Update QR link when store_code or member_username changes
  useEffect(() => {
    if (store_code && member_username) {
      // If both store and member are selected
      setQrLink(
        `https://alpha.throwin-glow.com/store/${store_code}/staff/${member_username}`
      );
    } else if (store_code) {
      // If only store is selected
      setQrLink(`https://alpha.throwin-glow.com/store/${store_code}`);
    } else {
      // Default link if nothing is selected
      setQrLink("https://alpha.throwin-glow.com");
    }
  }, [store_code, member_username]);

  // Fetch staff list when store code changes
  useEffect(() => {
    if (store_code) {
      refetch();
      // Reset member username when store changes
      setMemberUsername("");
      setValue("member", ""); // Also reset the form value
    }
  }, [store_code, refetch, setValue]);

  const handleStoreCode = (event) => {
    const selectedValue = event.target.value;
    // Clear team error when selection changes
    clearErrors("team");
    setValue("team", selectedValue);
    
    const selectedStore = storeList.find(
      (store) => store.name === selectedValue
    );
    if (selectedStore) {
      setStore_code(selectedStore.code);
    } else {
      // Clear store code if "選択してください" is selected
      setStore_code("");
    }
  };

  const handleMemberChange = (event) => {
    const selectedValue = event.target.value;
    // Clear member error when selection changes
    clearErrors("member");
    setValue("member", selectedValue);
    setMemberUsername(selectedValue);
  };

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="max-w-4xl p-6">
      <h2 className="font-semibold text-[27px] text-[#73879C]">QR作成</h2>
      <div className="flex">
        <div className="bg-white mt-6 rounded-xl pb-8 shadow-md min-w-[450px] px-6">
          <h4 className="font-semibold text-lg text-[#73879C] pt-6 pb-5 border-b border-gray-300">
            店舗（チーム）・メンバー別のQR付チラシを作成
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6">
              <label className="block font-bold text-sm text-[#434343]">
                チーム（店舗）の選択
              </label>
              <div className="relative">
                <div className="absolute left-3 top-[calc(0.5rem+12px)] pointer-events-none">
                  <BiSolidDownArrow className="text-[#3BC2EE]" />
                </div>
                <select
                  {...register("team", { required: "チームの選択は必須です" })}
                  onChange={handleStoreCode}
                  className="w-full mt-[9px] rounded py-[6px] pl-10 pr-3 border border-[#D9D9D9] appearance-none"
                >
                  <option value="">選択してください</option>
                  {storeList.map((store) => (
                    <option key={store.uid} value={store.name}>
                      {store.name}
                    </option>
                  ))}
                </select>
                {errors.team && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.team.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-bold text-sm text-[#434343]">
                メンバーの選択
              </label>
              <div className="relative">
                <div className="absolute left-3 top-[calc(0.5rem+12px)] pointer-events-none">
                  <BiSolidDownArrow className="text-[#3BC2EE] " />
                </div>
                <select
                  {...register("member", {
                    required: store_code ? "メンバーの選択は必須です" : false,
                  })}
                  onChange={handleMemberChange}
                  disabled={!store_code}
                  className="appearance-none w-full mt-[9px] rounded py-[6px] pl-10 pr-12 border border-[#D9D9D9]"
                >
                  <option value="">選択してください</option>
                  {restaurantStaffListByStoreCode.map((staff) => (
                    <option key={staff.uid} value={staff.username}>
                      {staff.name}
                    </option>
                  ))}
                </select>
                {errors.member && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.member.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-bold text-sm text-[#434343]">
                フリーテキスト
              </label>
              <textarea
                {...register("freeText")}
                value={qrLink}
                readOnly
                className="w-full mt-[9px] rounded py-2 px-2 h-[215px] border border-[#D9D9D9]"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button type="submit">
                <ButtonPrimary
                  btnText="設定"
                  style="bg-[#49BBDF] text-white rounded-full "
                />
              </button>
            </div>
          </form>
        </div>

        <div
          className="bg-white mt-6 pb-8 shadow-md min-w-[435px] mx-10"
          id="downloadContent"
        >
          <div className="my-[26px] mx-[29px] ">
            <p className="font-bold text-sm">チラシ</p>
            <div className="mt-12 flex justify-center">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <div className="flex justify-center">
            <QRCode size={256} value={qrLink} viewBox="0 0 256 256" />
          </div>
          <div className="text-center mt-9 text-[#454545]">
            <h5 className="font-normal text-xl text-[#454545]">{team}</h5>
            <h5 className="font-semibold text-[33px] text-[#454545]">
              {member}
            </h5>
            <p className="font-normal text-sm mt-14">
              応援よろしくお願いします！
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <button onClick={() => console.log("Downloading...")}>
              <ButtonPrimary
                btnText="ダウンロードする"
                style="bg-[#49BBDF] text-white rounded-full "
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCreation;