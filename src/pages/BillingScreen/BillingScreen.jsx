import { useEffect, useState } from "react";
import logo from "../../assets/images/home/logo.png";
import { useParams } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { FaRegHeart, FaHeart, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import throws from "../../assets/icons/Throw .png";
import throw_wh from "../../assets/icons/throw_white.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";
import { useForm } from "react-hook-form";

const BillingScreen = () => {
  const [data, setData] = useState([]);
  const [staffMember, setStaffMember] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { id } = useParams();
  const [selectedAmount, setSelectedAmount] = useState(null);

  useEffect(() => {
    fetch("/stores.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setData(data);
        const matchedStaff = data
          .flatMap((store) => store.items)
          .find((item) => item._id === id);
        setStaffMember(matchedStaff);
      })
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, [id]);

  const handleHeartToggle = () => setIsLiked((prev) => !prev);

  const handlePaymentMethodChange = (event) =>
    setSelectedPaymentMethod(event.target.value);

  const buttonStyle = `flex justify-center w-full rounded-full font-hiragino py-[12px] font-bold text-white ${
    selectedPaymentMethod
      ? "bg-gradient-to-r from-[#65D0F2] to-[#2399F4]"
      : "bg-gray-400 text-gray-700"
  }`;

  const amounts = ["1,000円", "3,000円", "5,000円", "10,000円"];
  const handleClick = (amount) => {
    setSelectedAmount(amount);
    console.log(`Selected Amount: ${amount}`); // This logs the selected amount
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div>
      <div>
        <TitleBar
          style="mb-0 w-full"
          icon={
            <img className="w-[110px] items-center " src={logo} alt="logo " />
          }
        ></TitleBar>
      </div>
      <div className="w-[430px] mx-auto mb-[120px] text-[#44495B]">
        <div className="w-[416px] mx-auto">
          <div className="relative">
            <img
              src={staffMember?.image}
              alt={`${staffMember?.staff_name} image`}
              className="object-cover rounded-lg w-[416px] h-[277px]"
            />
            <div className="absolute bottom-0 left-0 w-[416px] px-6 mb-[22px] p-2 text-white rounded-b-lg">
              <div className="flex justify-between items-center">
                <div className="bg-white text-[#F06464] flex items-center gap-1 px-2 py-1 rounded-full shadow-md">
                  <IoMdStar />
                  {staffMember?.rating}
                </div>
                <h3 className="text-2xl font-bold">
                  {staffMember?.staff_name}
                </h3>
                <div
                  className="text-2xl font-bold cursor-pointer"
                  onClick={handleHeartToggle}
                >
                  {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#80D0E91A] pt-5 pb-[17px] px-[26px] w-[416px]">
            <h2 className="font-semibold text-lg mb-2">自己紹介</h2>
            <p className="font-light text-sm">
              {staffMember?.self_introduction}
            </p>
          </div>

          <div className="flex justify-between items-center px-5 mt-[51px] border-b-2 pb-2 text-[#C0C0C0]">
            <h4 className="font-semibold text-sm">金額</h4>
            <h3 className="font-semibold text-[28px]">0円</h3>
          </div>

          <div className="flex gap-[14px] overflow-x-auto scrollbar-hide font-semibold text-sm text-[#49BBDF]">
            {amounts.map((amount, index) => (
              <h4
                key={index}
                onClick={() => handleClick(amount)}
                className={`border rounded-lg mt-[22px] px-4 py-2 whitespace-nowrap cursor-pointer 
            ${
              selectedAmount === amount
                ? "bg-[#49BBDF] text-white"
                : "border-[#49BBDF] text-[#49BBDF]"
            }`}
              >
                {amount}
              </h4>
            ))}
          </div>

          <div className="mt-7">
            <h2 className="font-semibold text-lg text-[#44495B] mb-2">
              応援メッセージ
            </h2>
            <textarea
              className="border-[1px] rounded-md w-full h-[200px] px-5 py-3 text-[#C0C0C0] font-light text-sm"
              placeholder="メッセージを書く..."
            />
          </div>

          <div className="mt-6">
            <h2 className="font-semibold text-lg">決済方法</h2>
            <h2 className="font-bold text-sm my-4">スマホ決済</h2>
          </div>

          <div className="flex gap-[9px] text-3xl font-semibold">
            <h3 className="flex items-center border rounded px-3 py-2 gap-1">
              <FaApple />
              <span>Pay</span>
            </h3>
            <h3 className="flex items-center border rounded px-3 gap-1">
              <FcGoogle />
              <span>Pay</span>
            </h3>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-sm text-gray-700 mb-4">
              クレジットカード決済
            </h3>

            <div className="flex items-start mb-4">
              <input
                type="radio"
                id="existing-card"
                name="payment_method"
                value="existing-card"
                className="mt-1 mr-3"
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="existing-card" className="flex flex-col">
                <span className="font-medium text-sm text-gray-800">
                  Visa (オーナーズカード)
                </span>
                <span className="text-gray-500 text-xs">Visa 下4桁 1234</span>
              </label>
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="flex items-start">
              <input
                type="radio"
                id="new-card"
                name="payment_method"
                value="new-card"
                className="mt-1 mr-3"
                onChange={handlePaymentMethodChange}
              />
              <label
                htmlFor="new-card"
                className="font-medium text-sm text-gray-800"
              >
                新規クレジットカード
              </label>
            </div>

            {/* Conditionally render the form when "new-card" is selected */}
            {selectedPaymentMethod === "new-card" && (
              <div className="mt-4">
                {/* credit card details */}

                <div className="mt-6">
                  {/* Enter your credit card number */}
                  <div className="form-control">
                    <h4 className="mb-2">クレジットカード番号入力</h4>
                    <input
                      {...register("name", { required: "Name is required" })}
                      name="name"
                      type="text"
                      placeholder=""
                      className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                    />
                    {errors.name && (
                      <span className="text-[#F43C3C]  text-sm mt-2">
                        {errors.name.message}
                      </span>
                    )}
                    {/* {error?.name && (
<span className="text-[#F43C3C] text-sm mt-2">{error.name}</span>
)} */}
                  </div>

                  {/* date of expiry */}
                  <h4 className="mb-2">有効期限</h4>
                  <div className="flex items-center gap-3">
                    <div className="form-control">
                      <input
                        {...register("name", { required: "Name is required" })}
                        name="name"
                        type="text"
                        placeholder=""
                        className="input rounded-[5px] py-4 mt-1 mb-[9px] w-[68px] pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                      />
                      {errors.name && (
                        <span className="text-[#F43C3C]  text-sm mt-2">
                          {errors.name.message}
                        </span>
                      )}
                      {/* {error?.name && (
<span className="text-[#F43C3C] text-sm mt-2">{error.name}</span>
)} */}
                    </div>
                    <p>月</p>
                    <div className="form-control">
                      <input
                        {...register("name", { required: "Name is required" })}
                        name="name"
                        type="text"
                        placeholder=""
                        className="input rounded-[5px] py-4 mt-1 mb-[9px] w-[94px] pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                      />
                      {errors.name && (
                        <span className="text-[#F43C3C]  text-sm mt-2">
                          {errors.name.message}
                        </span>
                      )}
                      {/* {error?.name && (
<span className="text-[#F43C3C] text-sm mt-2">{error.name}</span>
)} */}
                    </div>
                    <p>月</p>
                  </div>
                </div>

                {/* Security Code */}

                <div className="form-control">
                  <h4 className="mb-2">セキュリティコード</h4>
                  <input
                    {...register("name", { required: "Name is required" })}
                    name="name"
                    type="text"
                    placeholder=""
                    className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                  />
                  {errors.name && (
                    <span className="text-[#F43C3C]  text-sm mt-2">
                      {errors.name.message}
                    </span>
                  )}
                  {/* {error?.name && (
<span className="text-[#F43C3C] text-sm mt-2">{error.name}</span>
)} */}
                </div>

                {/* Credit card holder name */}

                <div className="form-control">
                  <h4 className="mb-2">クレジットカード名義</h4>
                  <input
                    {...register("name", { required: "Name is required" })}
                    name="name"
                    type="text"
                    placeholder=""
                    className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                  />
                  {errors.name && (
                    <span className="text-[#F43C3C]  text-sm mt-2">
                      {errors.name.message}
                    </span>
                  )}
                  {/* {error?.name && (
                    <span className="text-[#F43C3C] text-sm mt-2">{error.name}</span>
                    )} */}
                </div>
              </div>
            )}
          </div>

          <button className="mt-6 w-full">
            <ButtonPrimary
              disabled={!selectedPaymentMethod}
              icon={
                <img
                  className="mr-4"
                  src={selectedPaymentMethod ? throws : throw_wh}
                  alt="search icon"
                />
              }
              btnText="スローインする！"
              style={buttonStyle}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingScreen;
