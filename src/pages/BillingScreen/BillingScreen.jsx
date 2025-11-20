import { useEffect, useState, useMemo } from "react";
import logo from "../../assets/images/home/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { SlPaypal } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import throws from "../../assets/icons/Throw .png";
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
import { ROLES } from "../../constants/role";

const BillingScreen = () => {
  const { store_code, username } = useParams();
  const { staff_details } = UseGetUserDetails(username, store_code);
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [savedCards, setSavedCards] = useState(JSON.parse(localStorage.getItem("savedCards")) || []);

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
  const [review, setReview] = useState("");

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Real-time validation states
  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryMonthError, setExpiryMonthError] = useState("");
  const [expiryYearError, setExpiryYearError] = useState("");
  const [securityCodeError, setSecurityCodeError] = useState("");
  const [cardHolderError, setCardHolderError] = useState("");
  const [cardType, setCardType] = useState("Unknown");

  // Luhn algorithm for card validation
  function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  // Function to detect card type
  const getCardType = (cardNumber) => {
    if (!cardNumber) return 'Unknown';
    if (/^4/.test(cardNumber)) return 'Visa';
    if (/^5[1-5]/.test(cardNumber) || /^2[2-7]/.test(cardNumber)) return 'Mastercard';
    return 'Unknown';
  };

  // Initialize GMO PG Multipayment
  useEffect(() => {
    if (window.Multipayment) {
      window.Multipayment.init("tshop00070718");
    }
  }, []);

  // Set the appropriate nickname based on user status
  const getNickname = () => {
    if (!userDetails || !userDetails.name) {
      return "Guest";
    } else if (
      userDetails?.role === ROLES.FC_ADMIN ||
      ROLES.RESTAURANT_OWNER ||
      ROLES.SALES_AGENT
    ) {
      return "Guest"; // FC admins should always show as "Guest"
    } else if (userDetails?.role === ROLES.CONSUMER) {
      return userDetails?.name; // Regular users show their actual name
    } else {
      return "Guest";
    }
  };

  const billingData = useMemo(
    () => ({
      nickname: getNickname(),
      staff_uid: staff?.uid,
      restaurant_uid: staff?.restaurant_uid,
      store_uid: staff?.store_uid,
      message: review,
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
      userDetails,
      staff?.uid,
      staff?.restaurant_uid,
      staff?.store_uid,
      review,
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

  const handlePaymentMethodChange = (event) => {
    const value = event.target.value;
    if (value.startsWith("existing-card-")) {
      setSelectedPaymentMethod("existing-card");
      setSelectedCardIndex(parseInt(value.split("-")[2]));
    } else {
      setSelectedPaymentMethod(value);
      setSelectedCardIndex(null);
    }
  };

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

      if (savedCards.length > 0 && selectedCardIndex !== null) {
        // Use saved card for real payment
        const selectedCard = savedCards[selectedCardIndex];
        if (!window.Multipayment) {
          if (modal) modal.close();
          toast.error("決済サービスが利用できません。", {
            position: "top-center",
            duration: 3000,
          });
          return;
        }

        const loadingToast = toast.loading("処理中...", {
          position: "top-center",
        });

        window.Multipayment.getToken(
          {
            cardno: selectedCard.cardNumber,
            expire: `${selectedCard.expiryYear}${selectedCard.expiryMonth}`,
            securitycode: selectedCard.securityCode,
            holdername: selectedCard.cardHolder,
            tokennumber: "1",
          },
          async (result) => {
            try {
              if (result.resultCode !== "000") {
                throw new Error(`トークン生成に失敗しました: ${result.resultCode}`);
              }

              let generatedToken = result.tokenObject.token;
              if (Array.isArray(generatedToken)) {
                generatedToken = generatedToken[0];
              }

              const paymentData = {
                nickname: getNickname(),
                staff_uid: staff?.uid,
                store_uid: staff?.store_uid,
                amount: billingData.amount.toString(),
                currency: "JPY",
                token: generatedToken,
                message: review,
              };

              const response = await axiosPrivate.post(
                "/payment_service/gmo-pg/credit-card/",
                paymentData
              );

              toast.dismiss(loadingToast);

              if (response.data.transaction_id) {
                if (modal) modal.close();

                localStorage.setItem(
                  "payment_details",
                  JSON.stringify({
                    paymentId: response.data.transaction_id,
                    PayerID: "CREDIT_CARD_DIRECT",
                    amount: selectedAmount.replace(/,/g, ""),
                    timestamp: Date.now(),
                    payment_method: "credit_card",
                  })
                );

                const chargeCompletedUrl = `/store/${store_code}/staff/${username}/chargeCompleted?paymentId=${response.data.transaction_id}&PayerID=CREDIT_CARD_DIRECT`;

                navigate(chargeCompletedUrl, { replace: true });
              } else {
                throw new Error("Transaction ID missing from response");
              }
            } catch (error) {
              toast.dismiss(loadingToast);
              if (modal) modal.close();
              toast.error(error.message || "支払い処理中にエラーが発生しました。", {
                position: "top-center",
                duration: 3000,
              });
            }
          }
        );
      } else {
        // Fallback to demo payment if no saved card
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
      }
    } catch (error) {
      if (modal) modal.close();
      console.error("Navigation error:", error);
      toast.error("エラーが発生しました。もう一度お試しください。", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

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
      const loadingToast = toast.loading("処理中...", {
        position: "top-center",
      });

      const paymentPromise = new Promise((resolve, reject) => {
        // ✅ Only send necessary fields for token generation
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
                nickname: getNickname(),
                staff_uid: staff?.uid,
                store_uid: staff?.store_uid,
                amount: billingData.amount.toString(),
                currency: "JPY",
                token: generatedToken,
                message: review,
              };

              const response = await axiosPrivate.post(
                "/payment_service/gmo-pg/credit-card/",
                paymentData
              );

              resolve(response.data);
            } catch (error) {
              reject(error);
              toast.dismiss(loadingToast);
            }
          }
        );
      });

      const resultData = await paymentPromise;
      toast.dismiss(loadingToast);

      if (resultData.transaction_id) {
        if (modal) modal.close();

        if (staff_details) {
          localStorage.setItem("staff_details", JSON.stringify(staff_details));
        }

                localStorage.setItem(
                  "payment_details",
                  JSON.stringify({
                    paymentId: resultData.transaction_id,
                    PayerID: "CREDIT_CARD_DIRECT",
                    amount: selectedAmount.replace(/,/g, ""),
                    timestamp: Date.now(),
                    payment_method: "credit_card",
                  })
                );

                // Save card if checked
                if (data.saveCard) {
                  const newCard = {
                    cardNumber: data.cardNumber,
                    expiryMonth: data.expiryMonth,
                    expiryYear: data.expiryYear,
                    securityCode: data.securityCode,
                    cardHolder: data.cardHolder,
                  };
                  // Check if card already exists
                  const cardExists = savedCards.some(card => card.cardNumber === newCard.cardNumber);
                  if (!cardExists) {
                    const updatedCards = [...savedCards, newCard];
                    setSavedCards(updatedCards);
                    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
                  }
                }

                const chargeCompletedUrl = `/store/${store_code}/staff/${username}/chargeCompleted?paymentId=${resultData.transaction_id}&PayerID=CREDIT_CARD_DIRECT`;        navigate(chargeCompletedUrl, { replace: true });
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
  const handleReview = (event) => setReview(event.target.value);
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
        const card = savedCards[selectedCardIndex];
        return card ? `${getCardType(card.cardNumber)} (下4桁: ${card.cardNumber.slice(-4)})` : "クレジットカード (下4桁: 1234)";
      case "new-card":
        return cardType === 'Unknown' ? "新規クレジットカード" : `新規${cardType}`;
      case "paypal":
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
                    onChange={handleReview}
                    value={review}
                    className="border-[1px] rounded-md w-full h-[200px] px-5 py-3 text-[#434343] text-sm"
                    placeholder="いつも明るい姿に元気をもらっています！
これからも変わらずお店の看板娘と
して頑張って欲しいです！"
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
                </div>

                <div className="py-4">
                  <h3 className="font-bold text-sm text-gray-700 mb-4">
                    クレジットカード決済
                  </h3>
                  {savedCards.length > 0 && (
                    <>
                      {savedCards.map((card, index) => (
                        <div key={index}>
                          <div
                            className={`flex items-start p-4 ${
                              selectedPaymentMethod === "existing-card" && selectedCardIndex === index && " bg-[#F4FCFF]"
                            }`}
                          >
                            <input
                              type="radio"
                              id={`existing-card-${index}`}
                              name="payment_method"
                              value={`existing-card-${index}`}
                              className="mt-1 mr-3"
                              onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor={`existing-card-${index}`} className="flex flex-col">
                              <span className="font-medium text-sm text-gray-800">
                                {getCardType(card.cardNumber)} (オーナーズカード)
                              </span>
                              <span className="text-gray-500 text-xs">
                                {getCardType(card.cardNumber)} 下4桁 {card.cardNumber.slice(-4)}
                              </span>
                            </label>
                          </div>
                          <hr className=" border-gray-300" />
                        </div>
                      ))}
                    </>
                  )}
                  <div
                    className={`flex  items-start p-4 ${
                      selectedPaymentMethod === "new-card" && " bg-[#F4FCFF]"
                    }`}
                  >
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
                      新規{cardType === 'Unknown' ? 'クレジットカード' : cardType}
                    </label>
                  </div>

                  {selectedPaymentMethod === "new-card" && (
                    <form
                      onSubmit={handleSubmit(handleCreditCardPayment)}
                      className="mt-4"
                    >
                      <div className="form-control mb-4">
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
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0,16);
                            setValue("cardNumber", value);
                            setCardType(getCardType(value));
                            if (value.length === 16 && !luhnCheck(value)) {
                              setCardNumberError("無効なカード番号です");
                            } else {
                              setCardNumberError("");
                            }
                          }}
                          name="cardNumber"
                          type="text"
                          placeholder="1234 5678 1234 5678"
                          className={`input rounded-[5px] py-4 mt-1 w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 ${
                            errors.cardNumber || cardNumberError
                              ? "border-red-500"
                              : "border-[#D9D9D9]"
                          } focus:border-[#707070] focus:outline-none`}
                          maxLength="16"
                        />
                        {(errors.cardNumber || cardNumberError) && (
                          <span className="text-red-500 text-sm mt-1 block">
                            {errors.cardNumber?.message || cardNumberError}
                          </span>
                        )}
                      </div>

                      {/* Expiry Date */}
                      <h4 className="mb-2">有効期限</h4>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="form-control">
                          <input
                            {...register("expiryMonth", {
                              required: "月は必須です",
                              pattern: {
                                value: /^(0[1-9]|1[0-2])$/,
                                message: "有効な月 (01-12) を入力してください",
                              },
                            })}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0,2);
                              setValue("expiryMonth", value);
                              if (value && (parseInt(value) < 1 || parseInt(value) > 12)) {
                                setExpiryMonthError("有効な月 (01-12) を入力してください");
                              } else {
                                setExpiryMonthError("");
                              }
                            }}
                            name="expiryMonth"
                            type="text"
                            placeholder="MM"
                            className={`input rounded-[5px] py-4 mt-1 w-[68px] pl-4 font-Noto text-[#44495B80] text-sm border-2 ${
                              errors.expiryMonth || expiryMonthError
                                ? "border-red-500"
                                : "border-[#D9D9D9]"
                            } focus:border-[#707070] focus:outline-none`}
                            maxLength="2"
                          />
                          {(errors.expiryMonth || expiryMonthError) && (
                            <span className="text-red-500 text-sm mt-1 block">
                              {errors.expiryMonth?.message || expiryMonthError}
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
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0,2);
                              setValue("expiryYear", value);
                              const currentYear = new Date().getFullYear() % 100;
                              if (value && parseInt(value) < currentYear) {
                                setExpiryYearError("有効期限が切れています");
                              } else {
                                setExpiryYearError("");
                              }
                            }}
                            name="expiryYear"
                            type="text"
                            placeholder="YY"
                            className={`input rounded-[5px] py-4 mt-1 w-[94px] pl-4 font-Noto text-[#44495B80] text-sm border-2 ${
                              errors.expiryYear || expiryYearError
                                ? "border-red-500"
                                : "border-[#D9D9D9]"
                            } focus:border-[#707070] focus:outline-none`}
                            maxLength="2"
                          />
                          {(errors.expiryYear || expiryYearError) && (
                            <span className="text-red-500 text-sm mt-1 block">
                              {errors.expiryYear?.message || expiryYearError}
                            </span>
                          )}
                        </div>
                        <p>年</p>
                      </div>
                      {/* Security Code */}
                      <div className="form-control mb-4">
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
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0,4);
                            setValue("securityCode", value);
                            if (value.length < 3) {
                              setSecurityCodeError("3-4桁のセキュリティコードを入力してください");
                            } else {
                              setSecurityCodeError("");
                            }
                          }}
                          name="securityCode"
                          type="text"
                          placeholder="123"
                          className={`input rounded-[5px] py-4 mt-1 w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 ${
                            errors.securityCode || securityCodeError
                              ? "border-red-500"
                              : "border-[#D9D9D9]"
                          } focus:border-[#707070] focus:outline-none`}
                          maxLength="4"
                        />
                        {(errors.securityCode || securityCodeError) && (
                          <span className="text-red-500 text-sm mt-1 block">
                            {errors.securityCode?.message || securityCodeError}
                          </span>
                        )}
                      </div>
                      {/* Cardholder Name */}
                      <div className="form-control mb-4">
                        <h4 className="mb-2">クレジットカード名義</h4>
                        <input
                          {...register("cardHolder", {
                            required: "カード名義は必須です",
                            pattern: {
                              value: /^[a-zA-Z\s]+$/,
                              message: "英文字で名前を入力してください",
                            },
                          })}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                            setValue("cardHolder", value);
                            if (value && !/^[a-zA-Z\s]+$/.test(value)) {
                              setCardHolderError("英文字で名前を入力してください");
                            } else {
                              setCardHolderError("");
                            }
                          }}
                          name="cardHolder"
                          type="text"
                          placeholder="名前"
                          className={`input rounded-[5px] py-4 mt-1 w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 ${
                            errors.cardHolder || cardHolderError
                              ? "border-red-500"
                              : "border-[#D9D9D9]"
                          } focus:border-[#707070] focus:outline-none`}
                        />
                        {(errors.cardHolder || cardHolderError) && (
                          <span className="text-red-500 text-sm mt-1 block">
                            {errors.cardHolder?.message || cardHolderError}
                          </span>
                        )}
                      </div>
                      {/* Save Card Checkbox */}
                      <div className="form-control mb-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register("saveCard")}
                            className="mr-2"
                          />
                          <span>このカードを保存する</span>
                        </label>
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
