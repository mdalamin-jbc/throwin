import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/axiosPublic";
import toast from "react-hot-toast";

const LineLoginCallBack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");

    if (code && state) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axiosPublic.post("auth/social/line", {
            code: code,
            redirect_uri: "http://localhost:5173/search",
          });

          console.log("ログイン成功:", response.data);
          navigate("/search"); // Redirect after successful login
          
        } catch (error) {
          const errorMessage = error.response?.data?.detail || error.message;
          console.error("ログイン失敗:", errorMessage);
          
          setError(errorMessage);
          
          if (errorMessage.includes("LINE_CHANNEL_ID")) {
            toast.error("サーバー設定エラー: LINEログイン設定が不完全です。管理者にお問い合わせください。", {
              duration: 4000,
            });
          } else {
            toast.error("ログインに失敗しました。", {
              duration: 1500,
            });
          }
          
          // Wait 2 seconds before redirecting back to login
          setTimeout(() => {
            navigate("/socialLogin");
          }, 2000);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setError("LINEログインに必要なパラメータが見つかりません");
      setLoading(false);
      toast.error("LINEログインに失敗しました。もう一度お試しください。");
      
      // Redirect back to login after error
      setTimeout(() => {
        navigate("/socialLogin");
      }, 2000);
    }
  }, [location.search, navigate, axiosPublic]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#072233fb]">
      <div className="bg-white p-6 rounded-[10px] shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">
          {error ? "ログインエラー" : "LINEログインを処理中です"}
        </h2>
        
        {loading ? (
          <div className="flex justify-center my-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#06C755]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            {error.includes("LINE_CHANNEL_ID") ? (
              <p>サーバー側の設定に問題があります。<br/>開発チームに連絡してください。</p>
            ) : (
              <p>{error}</p>
            )}
            <p className="mt-4 text-gray-600">ログインページにリダイレクトします...</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LineLoginCallBack;