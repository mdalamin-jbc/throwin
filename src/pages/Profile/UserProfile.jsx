import { GoChevronRight } from "react-icons/go";
import { CgLogOut } from "react-icons/cg";
import TitleBar from "../../components/TitleBar";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseUserDetails from "../../hooks/UseUserDetails";
import { Helmet } from "react-helmet";
import { MdDeleteOutline } from "react-icons/md";

const UserProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { userDetails, refetch } = UseUserDetails();

  console.log(userDetails);

  const handleLogout = () => {
    logout();
    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "You have been logged out successfully.",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/login");
    });
  };
  return (
    <div className="w-full  mx-auto mb-[120px]">
      <Helmet>
        <title>Throwin | My Page</title>
      </Helmet>
      <TitleBar title={"スタッフを探す"} />
      <div className="w-full max-w-[380px] mx-auto">
        <h3 className="mt-7 font-hiragino font-semibold text-lg text-[#44495B]">
          基本情報
        </h3>
        {/* Display name */}
        <Link to={"display_name"}>
          <div className="flex justify-between  border-b-[1.5px] my-5">
            <h4>{userDetails?.name}</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold"> たろう</span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </div>
        </Link>
        {/* Email */}

        <Link to={"Change_email"}>
          <div className="flex justify-between border-b-[1.5px] my-5">
            <h4>メールアドレス</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5 ">
              <span className="text-sm font-semibold pb-1">
                {userDetails?.email}
              </span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </div>
        </Link>
        {/* Change Password */}
        <Link to={"change_password"}>
          <div className="flex justify-between border-b-[1.5px] my-5">
            <h4>パスワードの変更</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold"> ******* </span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </div>
        </Link>
        <h3 className="font-semibold text-lg mt-[53px]">
          コンテンツとサポート
        </h3>
        {/* Content and Support options */}
        <div className="flex justify-between border-b-[1.5px] my-5">
          <h4>表示名</h4>
          <h4 className="flex items-center text-[#9F9999] mb-5">
            <span className="text-sm font-semibold"></span>
            <GoChevronRight className="text-3xl " />
          </h4>
        </div>
        {/* Report an issue */}
        <div className="flex justify-between border-b-[1.5px] my-5">
          <h4>問題を報告</h4>
          <h4 className="flex items-center text-[#9F9999] mb-5">
            <span className="text-sm font-semibold"> </span>
            <GoChevronRight className="text-3xl " />
          </h4>
        </div>
        {/* Terms and Policies */}
        <Link className="hover:cursor-pointer" to="/terms">
          <div className="flex justify-between border-b-[1.5px] my-5">
            <h4>規約とポリシー</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold"> </span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </div>
        </Link>
        {/* Logout */}
        

        {/* -------------------------------------------------------------------------------------- */}

        <div className="text-[#44495B] p-0">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
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
              {" "}
              {/* Removed padding */}
              <p className="text-center text-lg mb-4 underline">
                ログアウトしますか？
              </p>
              <div className="flex justify-center gap-4 border-t-2">
                <form method="dialog">
                  <button className="px-4 py-4 text-blue-500 border-r-2 border-gray-300 flex items-center justify-center">
                    <span className="mr-10">いいえ</span>{" "}
                  </button>
                </form>
                <form method="dialog">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-4 text-blue-500 flex items-center justify-center"
                  >
                    <span className="ml-8">はい</span>{" "}
                    {/* Add some spacing between text and border */}
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        {/* Delete account */}
        <div className="flex justify-between border-b-[1.5px] my-5 text-[#DC143C]">
          <h4>アカウントを削除する</h4>
          <h4 className="flex items-center text-[#9F9999] mb-5">
            <span className="text-sm font-semibold"> </span>
            <MdDeleteOutline className="text-3xl text-[#DC143C]" />
          </h4>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
