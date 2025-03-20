import { Link, useRouteError } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import img from "../../assets/images/error_png.png";
import { motion } from "framer-motion";

const ErrorPage = () => {
  // Get the error from React Router if available
  const error = useRouteError();

  // Determine error type (404 or general error)
  const isNotFound =
    error?.status === 404 || error?.message?.includes("not found");
  const statusCode = isNotFound ? 404 : error?.status || 500;

  // Determine the message to display
  const getErrorMessage = () => {
    if (isNotFound) {
      return "申し訳ありませんが、お探しのページは見つかりませんでした。ホームページに戻ってください。";
    } else if (error?.message) {
      return error.message;
    } else {
      return "予期しないエラーが発生しました。後でもう一度お試しください。それでも解決しない場合はサポートにお問い合わせください。";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Title Bar */}
      <TitleBar
        back={
          <RiArrowLeftSLine
            onClick={() => window.history.back()}
            style={{ cursor: "pointer" }}
          />
        }
        title="エラーページ"
      />

      {/* Error Content */}
      <div className="flex-grow flex items-center justify-center bg-white p-6">
        <div className="text-center max-w-lg w-full">
          <motion.h1
            className="text-6xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {statusCode}
          </motion.h1>

          <motion.h2
            className="text-xl font-semibold text-gray-600 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {isNotFound
              ? "ページが見つかりません！"
              : "おっと、問題が発生しました！"}
          </motion.h2>

          {/* Error Illustration */}
          <motion.div
            className="my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {isNotFound ? (
              <img
                src={img}
                alt="ページが見つかりません"
                className="w-40 h-40 mx-auto"
              />
            ) : (
              <img
                src="/images/spilled-coffee.png"
                alt="エラーのイラスト"
                className="w-40 h-40 mx-auto"
              />
            )}
          </motion.div>

          <motion.p
            className="text-sm text-gray-600 mt-4 mb-6 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {getErrorMessage()}
          </motion.p>

          {/* Buttons */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <Link
                to="/"
                className="block bg-[#49bbdf] text-white font-semibold py-3 px-4 rounded-full w-full text-center transition duration-200"
              >
                ホームに戻る
              </Link>
            </motion.div>

            {!isNotFound && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8 }}
              >
                <button
                  onClick={() => window.location.reload()}
                  className="block bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-full w-full max-w-[400px] mx-auto text-center transition duration-200"
                >
                  再試行
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
