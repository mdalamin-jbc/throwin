import { GoChevronRight } from "react-icons/go";
import { CgLogOut } from "react-icons/cg";
import TitleBar from "../../components/TitleBar";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseUserDetails from "../../hooks/UseUserDetails";
import { Helmet } from "react-helmet";
import { MdDeleteOutline } from "react-icons/md";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { motion } from "framer-motion"; // Import Framer Motion
import "./styles.css";

const UserProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { userDetails, refetch } = UseUserDetails();
  const axiosPrivate = useAxiosPrivate();

  console.log(userDetails);

  const handleLogout = () => {
    logout();
    Swal.fire({
      icon: "success",
      title: "ログアウト成功",
      text: "正常にログアウトされました",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/login");
    });
  };

  const handleUserIdDelete = async () => {
    try {
      const response = await axiosPrivate.delete(`/auth/users/delete`);
      console.log("User deleted successfully:", response.data);

      // Show SweetAlert for success
      Swal.fire({
        title: "成功しました！",
        text: "ユーザーが正常に削除されました。",
        icon: "success",
        confirmButtonText: "OK",
      });
      logout();
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );

      // Show SweetAlert for error
      Swal.fire({
        title: "エラー",
        text: error.response
          ? error.response.data.message || "削除に失敗しました。"
          : "何かがうまくいきませんでした。",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <motion.div
      className="w-full mx-auto mb-[120px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Helmet>
        <title>Throwin | My Page</title>
      </Helmet>
      <TitleBar title={"スタッフを探す"} />

      <motion.div
        className="w-full max-w-[430px] mx-auto px-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h3
          className="mt-7 font-hiragino font-semibold text-lg text-[#44495B]"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          基本情報
        </motion.h3>

        {/* Display name */}
        <Link to={"display_name"}>
          <motion.div
            className="flex justify-between border-b-[1.5px] my-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h4>{userDetails?.name}</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold">たろう</span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </motion.div>
        </Link>

        {/* Email */}
        <Link to={"Change_email"}>
          <motion.div
            className="flex justify-between border-b-[1.5px] my-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h4>メールアドレス</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold pb-1">{userDetails?.email}</span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </motion.div>
        </Link>

        {/* Change Password */}
        <Link to={"change_password"}>
          <motion.div
            className="flex justify-between border-b-[1.5px] my-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h4>パスワードの変更</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold"> ******* </span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </motion.div>
        </Link>

        <motion.h3
          className="font-semibold text-lg mt-[53px]"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          コンテンツとサポート
        </motion.h3>

        {/* gacha tickets */}
        <Link className="hover:cursor-pointer" to="/gacha/tickets">
          <motion.div
            className="flex justify-between border-b-[1.5px] my-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h4>景品BOXを見る</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold"> </span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </motion.div>
        </Link>

        {/* Content and Support options */}
        <Link to="notice">
          <motion.div
            className="flex justify-between border-b-[1.5px] my-5 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h4>お知らせ</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold"></span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </motion.div>
        </Link>

        {/* Report an issue */}
        <motion.div
          className="flex justify-between border-b-[1.5px] my-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h4>問題を報告</h4>
          <h4 className="flex items-center text-[#9F9999] mb-5">
            <span className="text-sm font-semibold"> </span>
            <GoChevronRight className="text-3xl " />
          </h4>
        </motion.div>

        {/* Terms and Policies */}
        <Link className="hover:cursor-pointer" to="/terms">
          <motion.div
            className="flex justify-between border-b-[1.5px] my-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h4>規約とポリシー</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold"> </span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </motion.div>
        </Link>

        {/* Logout */}
        <motion.div
          className="text-[#44495B] p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <button
            className="w-full"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <div className="flex justify-between border-b-[1.5px] hover:cursor-pointer text-[#ff00ff]">
              <h4>ログアウト</h4>
              <h4 className="flex items-center text-[#9F9999] mb-5">
                <span className="text-sm font-semibold"></span>
                <CgLogOut className="text-3xl text-[#ff00ff]" />
              </h4>
            </div>
          </button>

          <dialog id="my_modal_1" className="modal max-w-[343px] mx-auto ">
            <div className="modal-box p-0 pt-7">
              <p className="text-center text-lg mb-4 underline">
                ログアウトしますか？
              </p>
              <div className="flex justify-center gap-4 border-t-2">
                <form method="dialog">
                  <button className="px-4 py-4 text-blue-500 border-r-2 border-gray-300 flex items-center justify-center">
                    <span className="mr-10">いいえ</span>
                  </button>
                </form>
                <form method="dialog">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-4  flex items-center justify-center"
                  >
                    <span className="ml-8">はい</span>
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </motion.div>

        {/* Delete account */}
        <motion.div
          className="text-[#44495B] p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <button
            className="w-full"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            <div className="flex justify-between border-b-[1.5px] my-5 hover:cursor-pointer text-[#DC143C]">
              <h4>アカウントを削除する</h4>
              <h4 className="flex items-center text-[#9F9999] mb-5">
                <span className="text-sm font-semibold"> </span>
                <MdDeleteOutline className="text-3xl text-[#DC143C]" />
              </h4>
            </div>
          </button>

          <dialog id="my_modal_2" className="modal max-w-[343px] mx-auto">
            <div className="modal-box bg-[#F9F9F9] p-0 pt-7">
              <div>
                <p className="text-center text-lg underline">アカウント削除</p>
                <p className="text-center font-normal my-4 text-xs">
                  削除すると以下の情報が全て失われます。
                </p>
              </div>
              <div className="flex justify-center gap-4 border-t-2">
                <form method="dialog">
                  <button className="px-4 py-4 text-blue-500 border-r-2 border-gray-300 flex items-center justify-center">
                    <span className="mr-10">キャンセル</span>
                  </button>
                </form>
                <form method="dialog">
                  <button
                    onClick={handleUserIdDelete}
                    className="px-4 py-4  flex items-center justify-center"
                  >
                    <span className="ml-8">削除</span>
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
