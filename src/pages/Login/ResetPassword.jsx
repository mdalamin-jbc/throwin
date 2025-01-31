import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// Assume these imports are working correctly
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import useAxiosReg from "../../hooks/axiosReg";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const axiosReg = useAxiosReg();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch("password");

  const handleClose = () => {
    navigate("/socialLogin");
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      // Make sure both passwords match
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "validate",
          message: "パスワードが一致しません"
        });
        return;
      }

      // Ensure the URL parameters are present
      if (!userId || !token) {
        setErrorMessage("無効なリセットリンクです。");
        return;
      }

      // Updated URL structure to match Django's URL pattern
      const response = await axiosReg.post(
        `auth/password/reset-confirm/${userId}/${token}`, // Removed leading slash and trailing slash
        {
          new_password: data.password,
          confirm_password: data.confirmPassword,
        }
      );

      if (response.status === 200 || response.status === 204) {
        // Show success message
        await toast.promise(
          Promise.resolve(),
          {
            loading: 'パスワードを更新中...',
            success: 'パスワードが正常にリセットされました！',
            error: 'エラーが発生しました。'
          },
          {
            position: "top-center",
            duration: 4000
          }
        );

        // Redirect to login page after successful reset
        navigate("/login");
      }
    } catch (error) {
      console.error('Password reset error:', error);
      
      if (error.response) {
        // Handle specific API error responses
        if (error.response.data.new_password) {
          setError("password", {
            type: "manual",
            message: Array.isArray(error.response.data.new_password) 
              ? error.response.data.new_password.join(" ")
              : error.response.data.new_password
          });
        } else if (error.response.data.detail) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("パスワードのリセットに失敗しました。もう一度お試しください。");
        }
      } else {
        setErrorMessage("サーバーとの通信に失敗しました。インターネット接続を確認してください。");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen overflow-auto bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="fixed inset-0 bg-[#072233fb] min-h-screen overflow-auto"></div>

      <div className={`bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] ${
        errors.password ? "h-[545px]" : "h-[490px]"
      }`}>
        <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto mb-4" />

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {errorMessage && (
              <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
            )}

            <div className="form-control">
              <label className="label font-bold text-sm">
                <span className="label-text font-hiragino">パスワード設定</span>
              </label>
              <input
                {...register("password", {
                  required: "パスワードを入力してください",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上である必要があります"
                  }
                })}
                type="password"
                placeholder="パスワード"
                className="input border rounded-[3px] py-4 mt-4 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <input
                {...register("confirmPassword", {
                  required: "確認用パスワードを入力してください",
                  validate: (value) => value === password || "パスワードが一致しません"
                })}
                type="password"
                placeholder="パスワード（確認用）"
                className="input border rounded-[3px] py-4 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm my-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
            >
              <ButtonPrimary
                btnText={isSubmitting ? "処理中..." : "リセット"}
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino text-center py-[10px] font-bold text-white"
              />
            </button>
          </form>

          <div className="mt-11 grid gap-4 font-hiragino font-light text-[10px] text-start text-[#6B6969]">
            <p>ご利用情報がSNSに公開されることはありません。</p>
            <p>
              複数アカウントの作成、保有、または利用する行為は
              禁止されており、会員アカウントを停止・永久凍結も
              しくは強制退化させていただきます。
            </p>
          </div>
        </div>
      </div>

      <button 
        className="mt-8 relative" 
        onClick={handleClose}
        disabled={isSubmitting}
      >
        <img
          src={closeIcon}
          alt="Close"
          className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700"
        />
      </button>
    </div>
  );
};

export default ResetPassword;