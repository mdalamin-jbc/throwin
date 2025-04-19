import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import UseGetResturentWonerSettings from "../../../hooks/Dashboard/UseGetResturentWonerSettings";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import UseUserDetails from "../../../hooks/UseUserDetails";

const DeSettings = () => {
  const { refetch: userRefetch } = UseUserDetails();
  const userRole = localStorage.getItem("userRole");
  const { resturentWonerSettings, refetch, isLoading } =
    UseGetResturentWonerSettings();
  const axiosPrivate = useAxiosPrivate();
  console.log(resturentWonerSettings);

  // Name change states
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("");

  // Email change states
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (resturentWonerSettings) {
      setName(resturentWonerSettings.owner_name || "");
      setEmail(resturentWonerSettings.email || "");
    }
  }, [resturentWonerSettings]);

  // Handle edit name button click
  const handleEditName = () => {
    setName(""); // Clear name to show placeholder
    setIsEditingName(true);
  };

  // Handle Name Change
  const handleSaveName = async () => {
    if (!name.trim()) {
      toast.error("ご担当者名を入力してください。");
      return;
    }

    try {
      let endpoint = "";
      if (userRole === "fc_admin" || userRole === "glow_admin"||userRole === "sales_agent") {
        endpoint = "/admins/settings/change-name";
      } else {
        endpoint = "/restaurant-owner/settings/change-name";
      }

      const response = await axiosPrivate.post(endpoint, { name });

      if (response.status === 201) {
        toast.success("ご担当者名が正常に変更されました！");
        refetch();
        userRefetch();
      }

      console.log("Name changed successfully", response.status);
      setIsEditingName(false);
    } catch (error) {
      toast.error("名前の変更に失敗しました。");
      console.error("Error changing name", error);
    }
  };

  // Handle Email Change
  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("メールアドレスとパスワードを入力してください。");
      return;
    }

    const toastId = toast.loading("変更を送信中...");

    try {
      const response = await axiosPrivate.post(
        "admins/settings/change-email-request",
        { email, password }
      );

      if (response.status === 200) {
        toast.success("確認メールを送信しました！", { id: toastId });
      }

      setIsEditingEmail(false);
      refetch();
    } catch (error) {
      console.error("Error changing email", error);

      const errorMessage =
        error?.response?.data?.message ||
        "メールアドレスの変更に失敗しました。";
      toast.error(errorMessage, { id: toastId });
    }
  };

  // change password
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle Password Change
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      toast.error("全てのフィールドを入力してください。");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("新しいパスワードが一致しません。");
      return;
    }

    const toastId = toast.loading("パスワードを変更中...");

    try {
      const response = await axiosPrivate.put("/auth/password/change", {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (response.status === 200) {
        toast.success("パスワードが正常に変更されました！", { id: toastId });
      }

      setIsEditingPassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password", error);
      toast.error("パスワードの変更に失敗しました。", { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#49BBDF"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">設定</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px]">
          ご登録情報の閲覧・編集
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="overflow-x-auto mt-6">
            <table className="table font-semibold text-[#58687A]">
              <tbody>
                <tr className="hover">
                  <td>企業名・屋号</td>
                  <td>{resturentWonerSettings?.company_name || "未登録"}</td>
                </tr>
                <tr className="hover">
                  <td>代表電話番号</td>
                  <td>{resturentWonerSettings?.phone_number || "未登録"}</td>
                </tr>
                <tr className="hover">
                  <td>所在地</td>
                  <td>
                    {resturentWonerSettings?.location ||
                      "〒555-0000 大阪市〇〇"}
                  </td>
                </tr>
                <tr className="hover">
                  <td>業種</td>
                  <td>{resturentWonerSettings?.industry || "未登録"}</td>
                </tr>
                <tr className="hover">
                  <td>法人番号</td>
                  <td>
                    {resturentWonerSettings?.corporate_number || "000000000000"}
                  </td>
                </tr>
                <tr className="hover">
                  <td>インボイス適格請求書番号</td>
                  <td>
                    {resturentWonerSettings?.invoice_number || "T000000000000"}
                  </td>
                </tr>

                {/* Name Change */}
                <tr className="hover">
                  <td>ご担当者名</td>
                  <td>
                    {isEditingName ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-1 w-full rounded-md"
                        placeholder={
                          resturentWonerSettings?.owner_name ||
                          resturentWonerSettings?.name
                        }
                      />
                    ) : (
                      resturentWonerSettings?.owner_name ||
                      resturentWonerSettings?.name
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        isEditingName ? handleSaveName() : handleEditName()
                      }
                      className="border py-1 px-3 rounded-md bg-gray-200"
                    >
                      {isEditingName ? "提出する" : "情報の編集"}
                    </button>
                  </td>
                </tr>

                {/* Email Change */}
                <tr className="hover">
                  <td>メールアドレス</td>
                  <td>
                    {isEditingEmail ? (
                      <form onSubmit={handleSubmitEmail}>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border p-1 w-full rounded-md mb-2"
                          placeholder={
                            resturentWonerSettings?.email || "メールアドレス"
                          }
                        />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="パスワード"
                          className="border p-1 w-full rounded-md mb-2"
                        />
                        <button
                          type="submit"
                          className="border py-1 px-3 rounded-md bg-[#49bbdf] text-white"
                        >
                          提出する
                        </button>
                      </form>
                    ) : (
                      resturentWonerSettings?.email || "aaa@free-company.co.jp"
                    )}
                  </td>
                  <td className="text-center">
                    {!isEditingEmail && (
                      <button
                        onClick={() => {
                          setEmail("");
                          setPassword("");
                          setIsEditingEmail(true);
                        }}
                        className="border py-1 px-3 rounded-md bg-gray-200"
                      >
                        メールアドレスの変更
                      </button>
                    )}
                  </td>
                </tr>

                <tr className="hover">
                  <td>パスワード</td>
                  <td>
                    {isEditingPassword ? (
                      <form onSubmit={handleSubmitPassword}>
                        <input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="現在のパスワード"
                          className="border p-1 w-full rounded-md mb-2"
                        />
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="新しいパスワード"
                          className="border p-1 w-full rounded-md mb-2"
                        />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="新しいパスワード（確認）"
                          className="border p-1 w-full rounded-md mb-2"
                        />
                        <button
                          type="submit"
                          className="border py-1 px-3 rounded-md bg-[#49bbdf] text-white"
                        >
                          提出する
                        </button>
                      </form>
                    ) : (
                      "********"
                    )}
                  </td>
                  <td className="text-center">
                    {!isEditingPassword && (
                      <button
                        onClick={() => setIsEditingPassword(true)}
                        className="border py-1 px-3 rounded-md bg-gray-200"
                      >
                        パスワードの変更
                      </button>
                    )}
                  </td>
                </tr>

                <tr className="hover">
                  <td>振込先口座情報</td>
                  <td>
                    {resturentWonerSettings?.bank_name || "未登録"} 銀行　
                    {resturentWonerSettings?.branch_name || "未登録"} 支店　
                    {resturentWonerSettings?.account_type || "未登録"}　
                    {resturentWonerSettings?.account_number || "未登録"}
                  </td>
                  <td className="text-center">
                    <button className="border py-1 px-3 rounded-md bg-gray-200">
                      情報の編集
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeSettings;
