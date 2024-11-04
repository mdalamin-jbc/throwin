import { GoChevronRight } from "react-icons/go";
import TitleBar from "../../components/TitleBar";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="w-full  mx-auto mb-[120px]">
      <TitleBar title={"スタッフを探す"} />
      <div className="w-full max-w-[380px] mx-auto">
        <h3 className="mt-7 font-hiragino font-semibold text-lg text-[#44495B]">
          基本情報
        </h3>
        {/* Display name */}
        <Link to={"display_name"}>
          <div className="flex justify-between border-b-[1.5px] my-5">
            <h4>表示名</h4>
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
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold"> abcde@gmail.com</span>
              <GoChevronRight className="text-3xl " />
            </h4>
          </div>
        </Link>
        {/* Change Password */}
        <Link to={"change_password"}>
          <div className="flex justify-between border-b-[1.5px] my-5">
            <h4>パスワードの変更</h4>
            <h4 className="flex items-center text-[#9F9999] mb-5">
              <span className="text-sm font-semibold"> *******</span>
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
        <div className="flex justify-between border-b-[1.5px] my-5">
          <h4>規約とポリシー</h4>
          <h4 className="flex items-center text-[#9F9999] mb-5">
            <span className="text-sm font-semibold"> </span>
            <GoChevronRight className="text-3xl " />
          </h4>
        </div>
        {/* Logout */}
        <div
          onClick={handleLogout}
          className="flex justify-between border-b-[1.5px] my-5 hover:cursor-pointer"
        >
          <h4>ログアウト</h4>
          <h4 className="flex items-center text-[#9F9999] mb-5">
            <span className="text-sm font-semibold"> </span>
            <GoChevronRight className="text-3xl " />
          </h4>
        </div>
        {/* Delete account */}
        <div className="flex justify-between border-b-[1.5px] my-5">
          <h4>アカウントを削除する</h4>
          <h4 className="flex items-center text-[#9F9999] mb-5">
            <span className="text-sm font-semibold"> </span>
            <GoChevronRight className="text-3xl " />
          </h4>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
