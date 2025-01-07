import { useEffect, useState } from "react";
import logo from "../../assets/images/home/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { FaApple, FaCcPaypal, FaPaypal } from "react-icons/fa";
import { SlPaypal } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import throws from "../../assets/icons/Throw .png";
import throw_wh from "../../assets/icons/throw_white.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";
import { useForm } from "react-hook-form";
import UseGetByStaffName from "../../hooks/UseGetByStaffName";
import { Helmet } from "react-helmet";
import useGetFavoriteStuff from "../../hooks/UseGetFavorite_stuff";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import UseUserDetails from "../../hooks/UseUserDetails";
import { RiArrowLeftSLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Circles } from "react-loader-spinner";
import StaffProfileCard from "../../components/StaffProfileCard/StaffProfileCard";

const BillingScreen = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Prevent rapid toggling
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { username } = useParams();
  const { staff } = UseGetByStaffName(username);
  const {
    favoriteStuffs,
    refetch: favRefetch,
    isLoading,
  } = useGetFavoriteStuff();
  const axiosPrivate = useAxiosPrivate();

  const { userDetails } = UseUserDetails();

  const navigate = useNavigate();

  // console.log(userDetails);
  // console.log(staff);

  // billing data
  const [billingData, setBillingData] = useState({});
  const [selectedAmount, setSelectedAmount] = useState("0");
  const [message, setMessage] = useState("");

  const handleHeartToggle = async () => {
    if (isProcessing) return; // Prevent duplicate requests
    setIsProcessing(true);

    try {
      const response = await axiosPrivate.post(
        `/auth/users/staff/${staff.uid}/like`
      );

      console.log("API Response:", response);

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        setIsLiked((prev) => !prev);

        await favRefetch();

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "成功 !",
          text: isLiked
            ? "あなたはこのスタッフをいいねから削除しました。"
            : "あなたはこのスタッフをいいねしました。",

          confirmButtonText: "はい",
        });
      } else {
        throw new Error("いいねのステータスの更新に失敗しました。");
      }
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "おっと!",
        text: "何かがうまくいきませんでした",
      });

      console.error(
        "Error updating like status:",
        error.response?.data?.detail || error.message
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // console.log(favoriteStuffs);
  useEffect(() => {
    if (staff && favoriteStuffs.length > 0) {
      const isStaffLiked = favoriteStuffs.some(
        (favorite) => favorite.uid === staff.uid
      );
      setIsLiked(isStaffLiked);
      // console.log(isStaffLiked);
    }
  }, [staff, favoriteStuffs]);

  const handlePaymentMethodChange = (event) =>
    setSelectedPaymentMethod(event.target.value);

  const {
    register,

    formState: { errors },
  } = useForm();

  const buttonStyle = `flex justify-center w-full rounded-full font-hiragino py-[12px] font-bold text-white ${
    selectedPaymentMethod
      ? "bg-gradient-to-r from-[#65D0F2] to-[#2399F4]"
      : "bg-gray-400 text-gray-700"
  }`;

  const amounts = ["1,000", "3,000", "5,000", "10,000"];
  const handleClick = (amount) => {
    setSelectedAmount(amount);
    // console.log(`Selected Amount: ${amount}`);
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
    // console.log(event.target.value);
  };

  const persAmount = parseInt(selectedAmount.replace(/,/g, ""), 10);

  useEffect(() => {
    setBillingData({
      staff_uid: staff?.uid,
      nickname: userDetails?.name || "Guest",
      // amount: persAmount,
      amount: 50,
      currency: "USD",
      payment_method: "paypal",
      return_url: "http://localhost:5173/staff/HW7S3qYskT/chargeCompleted",
      cancel_url: "http://frontend.com/payment-cancel/",
    });
  }, [persAmount, userDetails, staff?.uid]);

  const handlePayment = async () => {
    try {
      if (!billingData.amount || billingData.amount <= 0) {
        throw new Error("Payment amount must be greater than zero.");
      }

      if (!billingData.staff_uid) {
        throw new Error("Staff ID is required.");
      }

      console.log("Sending Billing Data:", billingData);

      const response = await axiosPrivate.post(
        `/payment_service/make-payment/`,
        billingData
      );

      console.log(response);
      if (response.status === 200 || response.status === 201) {
        const approvalUrl = response.data.approval_url;
        console.log("Redirecting to PayPal Approval URL:", approvalUrl);

        // Redirect to PayPal for user approval
        window.location.href = approvalUrl;
      } else {
        throw new Error("Failed to create payment. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error creating payment:",
        error.response?.data?.detail || error.message
      );

      Swal.fire({
        icon: "error",
        title: "支払いの作成に失敗しました！",
        text: error.response?.data?.detail || error.message,
        confirmButtonText: "はい",
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Circles
            height="80"
            width="80"
            color="#49BBDF"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      ) : (
        <div>
          <Helmet>
            <title>Throwin | Billing Page</title>
          </Helmet>
          <div>
            <TitleBar
              style="mb-0 w-full"
              back={
                <RiArrowLeftSLine
                  onClick={() => navigate(-1)}
                  style={{ cursor: "pointer" }}
                />
              }
              title=""
              icon={
                <img className="w-[110px] items-center" src={logo} alt="logo" />
              }
            ></TitleBar>
          </div>
          <div className="max-w-[430px] mx-auto mb-[120px] text-[#44495B]">
            <div className="py-4 text-center">
              <h2 className="font-bold text-[25px]">{staff.name}</h2>
              <p className="font-bold text-[10px]">{staff?.introduction}</p>
            </div>
            <div className="max-w-[416px] mx-auto">
              <StaffProfileCard
                staff={staff}
                isLiked={isLiked}
                isProcessing={isProcessing}
                handleHeartToggle={handleHeartToggle}
              />
              <div className="px-3">
                <div className="flex justify-between items-center px-5 mt-[51px] border-b-2 pb-2 text-[#C0C0C0]">
                  <h4 className="font-semibold text-sm">金額</h4>
                  <h3 className="font-semibold text-[28px]">
                    {selectedAmount}円
                  </h3>
                </div>

                {/* amount */}
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
                      {amount}円
                    </h4>
                  ))}
                </div>

                <div className="mt-7">
                  <h2 className="font-semibold text-lg text-[#44495B] mb-2">
                    応援メッセージ
                  </h2>
                  {/* Message of Support */}
                  <textarea
                    onChange={handleMessage}
                    value={message} // Bind state to the textarea
                    className="border-[1px] rounded-md w-full h-[200px] px-5 py-3 text-[#C0C0C0] font-light text-sm"
                    placeholder="メッセージを書く..."
                  />
                </div>

                <div className="mt-6">
                  <h2 className="font-semibold text-lg">決済方法</h2>
                  <h2 className="font-bold text-sm my-4">スマホ決済</h2>
                </div>
                {/* google pay and apple pay */}
                <div className="flex gap-[9px] text-3xl font-semibold">
                  <h3 className="flex items-center border rounded px-3 py-2 gap-1">
                    <FaApple />
                    <span>Pay</span>
                  </h3>
                  <h3 className="flex items-center border rounded px-3 gap-1">
                    <FcGoogle />
                    <span>Pay</span>
                  </h3>
                  <h3 className="flex items-center border rounded px-3 gap-1">
                    <SlPaypal />
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
                      <span className="text-gray-500 text-xs">
                        Visa 下4桁 1234
                      </span>
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
                  <div>
                    {selectedPaymentMethod === "new-card" && (
                      <div className="mt-4">
                        {/* Credit Card Details */}
                        <div className="mt-6">
                          {/* Credit Card Number */}
                          <div className="form-control">
                            <h4 className="mb-2">クレジットカード番号入力</h4>
                            <input
                              {...register("cardNumber", {
                                required: "カード番号は必須です",
                                pattern: {
                                  value: /^[0-9]{16}$/,
                                  message:
                                    "有効な16桁のカード番号を入力してください",
                                },
                              })}
                              name="cardNumber"
                              type="text"
                              placeholder="1234 5678 1234 5678"
                              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                            />
                            {errors.cardNumber && (
                              <span className="text-[#F43C3C] text-sm mt-2">
                                {errors.cardNumber.message}
                              </span>
                            )}
                          </div>

                          {/* Expiry Date */}
                          <h4 className="mb-2">有効期限</h4>
                          <div className="flex items-center gap-3">
                            <div className="form-control">
                              <input
                                {...register("expiryMonth", {
                                  required: "月は必須です",
                                  pattern: {
                                    value: /^(0[1-9]|1[0-2])$/,
                                    message:
                                      "有効な月 (01-12) を入力してください",
                                  },
                                })}
                                name="expiryMonth"
                                type="text"
                                placeholder="MM"
                                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-[68px] pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                              />
                              {errors.expiryMonth && (
                                <span className="text-[#F43C3C] text-sm mt-2">
                                  {errors.expiryMonth.message}
                                </span>
                              )}
                            </div>
                            <p>月</p>
                            <div className="form-control">
                              <input
                                {...register("expiryYear", {
                                  required: "年は必須です",
                                  pattern: {
                                    value: /^[0-9]{2}$/,
                                    message: "有効な年 (YY) を入力してください",
                                  },
                                })}
                                name="expiryYear"
                                type="text"
                                placeholder="YY"
                                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-[94px] pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                              />
                              {errors.expiryYear && (
                                <span className="text-[#F43C3C] text-sm mt-2">
                                  {errors.expiryYear.message}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Security Code */}
                          <div className="form-control">
                            <h4 className="mb-2">セキュリティコード</h4>
                            <input
                              {...register("securityCode", {
                                required: "セキュリティコードは必須です",
                                pattern: {
                                  value: /^[0-9]{3,4}$/,
                                  message:
                                    "有効なセキュリティコードを入力してください",
                                },
                              })}
                              name="securityCode"
                              type="text"
                              placeholder="123"
                              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                            />
                            {errors.securityCode && (
                              <span className="text-[#F43C3C] text-sm mt-2">
                                {errors.securityCode.message}
                              </span>
                            )}
                          </div>

                          {/* Cardholder Name */}
                          <div className="form-control">
                            <h4 className="mb-2">クレジットカード名義</h4>
                            <input
                              {...register("cardHolder", {
                                required: "カード名義は必須です",
                                pattern: {
                                  value: /^[a-zA-Z\s]+$/,
                                  message: "英文字で名前を入力してください",
                                },
                              })}
                              name="cardHolder"
                              type="text"
                              placeholder="名前"
                              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                            />
                            {errors.cardHolder && (
                              <span className="text-[#F43C3C] text-sm mt-2">
                                {errors.cardHolder.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedPaymentMethod ? (
                  <>
                    {/* ------------------------------------- */}
                    <div className="text-[#44495B] p-0">
                      {/* Open the modal using document.getElementById('ID').showModal() method */}
                      <button
                        className="w-full"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        <ButtonPrimary
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

                      <dialog
                        id="my_modal_1"
                        className="modal max-w-[343px] mx-auto "
                      >
                        <div className="modal-box p-0 ">
                          <div className="px-10 pt-10 pb-6">
                            <p className=" text-lg  ">
                              <span className="underline ">{staff.name}</span>{" "}
                              に、スローインします。 よろしいですか？
                            </p>
                            <p>金額 : {selectedAmount}円</p>
                            <div className="flex gap-1">
                              <p>決済方法 : VISA </p>
                              <p>下4桁 : 1111 </p>
                            </div>
                          </div>

                          <div className="flex justify-center gap-4 border-t-2">
                            <form method="dialog">
                              <button className="px-4 py-4  border-r-2 border-gray-300 flex items-center justify-center">
                                <span className="mr-10">キャンセル</span>{" "}
                              </button>
                            </form>
                            <form method="dialog">
                              <button
                                // onClick={handleLogout}
                                className="px-4 py-4 text-blue-500 flex items-center justify-center"
                              >
                                <span onClick={handlePayment} className="ml-8">
                                  確定
                                </span>{" "}
                                {/* Add some spacing between text and border */}
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </>
                ) : (
                  <button className="mt-6 w-full" disabled>
                    <ButtonPrimary
                      disabled
                      icon={
                        <img
                          className="mr-4"
                          src={throw_wh}
                          alt="search icon"
                        />
                      }
                      btnText="スローインする！"
                      style={buttonStyle}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillingScreen;
