import { useEffect, useState, useMemo } from "react";
import logo from "../../assets/images/home/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { SlPaypal } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import throws from "../../assets/icons/Throw .png";
import throw_wh from "../../assets/icons/throw_white.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import useGetFavoriteStuff from "../../hooks/UseGetFavorite_stuff";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import UseUserDetails from "../../hooks/UseUserDetails";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Circles } from "react-loader-spinner";
import StaffProfileCard from "../../components/StaffProfileCard/StaffProfileCard";
import toast from "react-hot-toast";
import UseGetUserDetails from "../../hooks/Staff/UseGetUserDetails";
import useAxiosPublic from "../../hooks/axiosPublic";

const BillingScreen = () => {
  const { store_code, username } = useParams();
  const { staff_details } = UseGetUserDetails(username, store_code);
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [token, setToken] = useState("");
  console.log(staff_details.throwin_amounts);

  const staff = JSON.parse(localStorage.getItem("staff"));
  const {
    favoriteStuffs,
    refetch: favRefetch,
    isLoading,
  } = useGetFavoriteStuff();
  const axiosPrivate = useAxiosPrivate();
  const axiosPublic = useAxiosPublic();
  const { userDetails } = UseUserDetails();
  const navigate = useNavigate();

  // billing data
  const [selectedAmount, setSelectedAmount] = useState("0");
  const [message, setMessage] = useState("");

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Initialize GMO PG Multipayment
  useEffect(() => {
    if (window.Multipayment) {
      window.Multipayment.init("tshop00070718");
    }
  }, []);

  const billingData = useMemo(
    () => ({
      nickname: userDetails?.name || "Guest",
      staff_uid: staff?.uid,
      restaurant_uid: staff?.restaurant_uid,
      store_uid: staff?.store_uid,
      message: message,
      amount: parseInt(selectedAmount.replace(/,/g, ""), 10),
      currency: "JPY",
      payment_method: "paypal",
      return_url: `https://alpha.throwin-glow.com/store/${encodeURIComponent(
        store_code
      )}/staff/${username}/chargeCompleted`,
      cancel_url: "https://alpha.throwin-glow.com/payment-cancle",
    }),
    [
      store_code,
      username,
      userDetails?.name,
      staff?.uid,
      staff?.restaurant_uid,
      staff?.store_uid,
      message,
      selectedAmount,
    ]
  );

  const validatePayment = (amount, paymentMethod) => {
    const numAmount = parseInt(amount.replace(/,/g, ""), 10);

    if (!paymentMethod) {
      toast.error("決済方法を選択してください。", {
        position: "top-center",
        duration: 3000,
      });
      return false;
    }

    if (numAmount < 500) {
      toast.error("金額は500円以上でなければなりません。", {
        position: "top-center",
        duration: 3000,
      });
      return false;
    }

    if (numAmount > 50000) {
      toast.error("金額は50,000円以下でなければなりません。", {
        position: "top-center",
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  const handleHeartToggle = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const response = await axiosPrivate.post(
        `/auth/users/staff/${staff?.uid}/like`
      );

      if ([200, 201, 204].includes(response.status)) {
        setIsLiked((prev) => !prev);
        await favRefetch();
        toast.success(
          isLiked
            ? "あなたはこのスタッフをいいねから削除しました。"
            : "あなたはこのスタッフをいいねしました。",
          { position: "top-center", duration: 3000 }
        );
      } else {
        throw new Error("いいねのステータスの更新に失敗しました。");
      }
    } catch (error) {
      toast.error("何かがうまくいきませんでした。", {
        position: "top-center",
        duration: 3000,
      });
      console.error(
        "Error updating like status:",
        error.response?.data?.detail || error.message
      );
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (staff && favoriteStuffs.length > 0) {
      const isStaffLiked = favoriteStuffs.some(
        (favorite) => favorite.uid === staff.uid
      );
      setIsLiked(isStaffLiked);
    }
  }, [staff, favoriteStuffs]);

  const handlePaymentMethodChange = (event) =>
    setSelectedPaymentMethod(event.target.value);

  const handleAmountChange = (event) => {
    let input = event.target.value.replace(/[^\d]/g, "").slice(0, 5);
    if (input === "") {
      setSelectedAmount("");
      return;
    }
    const number = parseInt(input, 10);
    if (!isNaN(number)) {
      const formattedValue = number.toLocaleString();
      setSelectedAmount(formattedValue);
    }
  };

  const handlePaypalPayment = async () => {
    const modal = document.getElementById("my_modal_6");

    try {
      if (!validatePayment(selectedAmount, "paypal")) {
        if (modal) modal.close();
        return;
      }

      const response = await axiosPrivate.post(
        `/payment_service/make-payment/`,
        billingData
      );

      if (response.status === 200 || response.status === 201) {
        window.location.href = response.data.approval_url;
        if (modal) modal.close();
      } else {
        throw new Error("Failed to create payment. Please try again.");
      }
    } catch (error) {
      if (modal) modal.close();
      toast.error(
        error.response?.data?.detail ||
          error.message ||
          "支払いの作成に失敗しました！",
        { position: "top-center", duration: 3000 }
      );
    }
  };

  const handleVisaPayment = () => {
    const modal = document.getElementById("visa_payment_modal");

    try {
      if (!validatePayment(selectedAmount, selectedPaymentMethod)) {
        if (modal) modal.close();
        return;
      }

      if (staff_details) {
        localStorage.setItem("staff_details", JSON.stringify(staff_details));
      }

      const mockPaymentId = `VISA_${Date.now()}`;
      navigate(`/store/${store_code}/staff/${username}/chargeCompleted`, {
        state: {
          paymentId: mockPaymentId,
          PayerID: "VISA_DIRECT",
          amount: selectedAmount,
          timestamp: Date.now(),
          payment_method: "visa",
        },
        replace: true,
      });

      if (modal) modal.close();
    } catch (error) {
      if (modal) modal.close();
      console.error("Navigation error:", error);
      toast.error("エラーが発生しました。もう一度お試しください。", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  // Replace the handleCreditCardPayment function with this improved version

  const handleCreditCardPayment = async (data) => {
    const modal = document.getElementById("visa_payment_modal");
  
    if (!window.Multipayment) {
      if (modal) modal.close();
      toast.error("決済サービスが利用できません。", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
  
    if (!validatePayment(selectedAmount, selectedPaymentMethod)) {
      if (modal) modal.close();
      return;
    }
  
    try {
      // Show loading indicator
      const loadingToast = toast.loading("処理中...", {
        position: "top-center",
      });
  
      const paymentPromise = new Promise((resolve, reject) => {
        window.Multipayment.getToken(
          {
            cardno: data.cardNumber,
            expire: `${data.expiryYear}${data.expiryMonth}`,
            securitycode: data.securityCode,
            holdername: data.cardHolder,
            tokennumber: "1",
          },
          async (result) => {
            try {
              if (result.resultCode !== "000") {
                throw new Error(
                  `トークン生成に失敗しました: ${result.resultCode}`
                );
              }
  
              let generatedToken = result.tokenObject.token;
              if (Array.isArray(generatedToken)) {
                generatedToken = generatedToken[0];
              }
  
              const paymentData = {
                nickname: userDetails?.name || "Guest",
                staff_uid: staff?.uid,
                store_uid: staff?.store_uid,
                amount: billingData.amount.toString(),
                currency: "JPY",
                token: generatedToken,
              };
  
              // Use axiosPrivate for consistent authorization handling
              const response = await axiosPrivate.post(
                "/payment_service/gmo-pg/credit-card/",
                paymentData
              );
  
              resolve(response.data);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
  
      const resultData = await paymentPromise;
      toast.dismiss(loadingToast);
  
      if (resultData.transaction_id) {
        if (modal) modal.close();
        
        // No success toast here - let the completion page handle it
        
        // Store staff_details in localStorage as done elsewhere in the code
        if (staff_details) {
          localStorage.setItem("staff_details", JSON.stringify(staff_details));
        }
  
        // Store payment details to localStorage as backup
        localStorage.setItem("payment_details", JSON.stringify({
          paymentId: resultData.transaction_id,
          PayerID: "CREDIT_CARD_DIRECT",
          amount: selectedAmount.replace(/,/g, ""),
          timestamp: Date.now(),
          payment_method: "credit_card"
        }));
  
        // Use React Router navigate without reloading the page but with the same URL format
        // Create the URL with query parameters format
        const chargeCompletedUrl = `/store/${store_code}/staff/${username}/PaymentCompleted?paymentId=${resultData.transaction_id}&PayerID=CREDIT_CARD_DIRECT`;
        
        // Navigate to the URL with replace to avoid browser history issues
        navigate(chargeCompletedUrl, { replace: true });
      } else {
        throw new Error("Transaction ID missing from response");
      }
    } catch (error) {
      if (modal) modal.close();
      
      toast.error(error.message || "支払い処理中にエラーが発生しました。", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  const amounts = staff_details?.throwin_amounts;
  const handleClick = (amount) => setSelectedAmount(amount);
  const handleMessage = (event) => setMessage(event.target.value);
  const persAmount = parseInt(selectedAmount.replace(/,/g, ""), 10);

  const buttonStyle = `flex justify-center w-full rounded-full font-hiragino py-[12px] font-bold text-white ${
    selectedPaymentMethod
      ? "bg-gradient-to-r from-[#65D0F2] to-[#2399F4]"
      : "bg-gray-400 text-gray-700"
  }`;

  // Dynamic payment method display
  const getPaymentMethodDisplay = () => {
    switch (selectedPaymentMethod) {
      case "existing-card":
        return "VISA (下4桁: 1234)";
      case "new-card":
        return "VISA";
      case "paypal": // Added for PayPal case
        return "PayPal";
      default:
        return "";
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
          />
          <div className="max-w-[430px] mx-auto mb-[120px] text-[#44495B]">
            <div className="py-4 text-center">
              <h2 className="font-bold text-[25px]">{staff_details?.name}</h2>
              <p className="font-bold text-[10px]">
                {staff_details?.introduction}
              </p>
            </div>
            <div className="max-w-[430px] mx-auto">
              <StaffProfileCard
                staff={staff_details}
                isLiked={isLiked}
                isProcessing={isProcessing}
                handleHeartToggle={handleHeartToggle}
              />
              <div className="px-3">
                <div className="flex justify-between items-center px-5 mt-[51px] border-b-2 pb-2 text-[#C0C0C0]">
                  <h4 className="font-semibold text-sm">金額</h4>
                  <div className="font-semibold text-[28px] text-[#C0C0C0]">
                    <input
                      type="text"
                      value={selectedAmount}
                      onChange={handleAmountChange}
                      className="text-right mr-1 bg-transparent max-w-[200px] focus:outline-none w-fit placeholder:text-[16px] placeholder:font-normal"
                    />
                    円
                  </div>
                </div>

                <div className="flex gap-[14px] overflow-x-auto scrollbar-hide font-semibold text-sm text-[#49BBDF]">
                  {amounts?.map((amount, index) => (
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
                  <textarea
                    onChange={handleMessage}
                    value={message}
                    className="border-[1px] rounded-md w-full h-[200px] px-5 py-3 text-[#434343] text-sm"
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
                  <h3 className="flex items-center border rounded px-3 py-2 gap-1">
                    <FcGoogle />
                    <span>Pay</span>
                  </h3>
                  <div className="text-[#44495B] p-0">
                    <button
                      className="w-full"
                      onClick={() =>
                        document.getElementById("my_modal_6").showModal()
                      }
                    >
                      <button
                        onClick={() =>
                          localStorage.setItem(
                            "staff_details",
                            JSON.stringify(staff_details)
                          )
                        }
                        className="flex items-center border rounded px-3 py-2 gap-1"
                      >
                        <SlPaypal />
                        <span>Pay</span>
                      </button>
                    </button>
                    <dialog
                      id="my_modal_6"
                      className="modal max-w-[343px] mx-auto rounded-lg shadow-lg"
                    >
                      <div className="modal-box p-0 rounded-lg overflow-hidden">
                        <div className="bg-[#49BBDF] text-white flex items-center justify-center py-4">
                          <img
                            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                            alt="PayPal Logo"
                            className="h-14 rounded-[10px]"
                          />
                        </div>
                        <div className="px-6 pt-4 pb-4">
                          <p className="text-base font-medium">
                            <span className="underline font-semibold">
                              {staff?.name}
                            </span>{" "}
                            に、スローインします。 よろしいですか？
                          </p>
                          <div className="flex justify-between items-center text-sm mt-4">
                            <p className="text-sm font-medium">
                              金額 : {selectedAmount}円
                            </p>
                            <p>決済方法 : PayPal</p>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 border-t border-gray-200">
                          <form method="dialog" className="w-1/2">
                            <button className="px-4 py-3 w-full text-red-600 border-r border-gray-300 text-center text-[15px]">
                              キャンセル
                            </button>
                          </form>
                          <button
                            onClick={handlePaypalPayment}
                            className="px-4 py-3 w-full text-blue-600 text-[15px] text-center"
                          >
                            確定
                          </button>
                        </div>
                      </div>
                    </dialog>
                  </div>
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

                  {selectedPaymentMethod === "new-card" && (
                    <form
                      onSubmit={handleSubmit(handleCreditCardPayment)}
                      className="mt-4"
                    >
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
                      <h4 className="mb-2">有効期限</h4>
                      <div className="flex items-center gap-3">
                        <div className="form-control">
                          <input
                            {...register("expiryMonth", {
                              required: "月は必須です",
                              pattern: {
                                value: /^(0[1-9]|1[0-2])$/,
                                message: "有効な月 (01-12) を入力してください",
                              },
                            })}
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
                    </form>
                  )}
                </div>

                {selectedPaymentMethod && (
                  <div className="text-[#44495B] p-0">
                    <button
                      className="w-full"
                      onClick={() =>
                        document
                          .getElementById("visa_payment_modal")
                          .showModal()
                      }
                    >
                      <ButtonPrimary
                        icon={
                          <img
                            className="mr-4"
                            src={throws}
                            alt="search icon"
                          />
                        }
                        btnText="スローインする！"
                        style={buttonStyle}
                      />
                    </button>

                    <dialog
                      id="visa_payment_modal"
                      className="modal max-w-[343px] mx-auto"
                    >
                      <div className="modal-box p-0">
                        <div className="px-10 pt-10 pb-6">
                          <p className="text-lg">
                            <span className="underline">{staff?.name}</span>{" "}
                            に、スローインします。よろしいですか？
                          </p>
                          <p>金額 : {selectedAmount}円</p>
                          <div className="flex gap-1">
                            <p>決済方法 : {getPaymentMethodDisplay()}</p>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 border-t-2">
                          <form method="dialog" className="w-1/2">
                            <button className="px-4 py-4 w-full border-r-2 border-gray-300">
                              <span>キャンセル</span>
                            </button>
                          </form>
                          <button
                            onClick={() => {
                              const modal =
                                document.getElementById("visa_payment_modal");
                              if (selectedPaymentMethod === "existing-card") {
                                handleVisaPayment();
                              } else {
                                handleSubmit(handleCreditCardPayment)();
                              }
                              // Ensure the modal closes even if there's an error in the payment handlers
                              setTimeout(() => {
                                if (modal) modal.close();
                              }, 100);
                            }}
                            className="px-4 py-4 text-blue-500 w-1/2"
                          >
                            <span>確定</span>
                          </button>
                        </div>
                      </div>
                    </dialog>
                  </div>
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
