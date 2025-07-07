import { useState } from "react";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import { useNavigate, useParams } from "react-router-dom";

const ActivateNewAccount = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords
    if (formData.password !== formData.confirm_password) {
      setError("パスワードが一致しません");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosPrivate.post(
        `/admins/activate/new/account/${uid}/${token}`,
        {
          token: token,
          password: formData.password,
          confirm_password: formData.confirm_password,
        }
      );

      // Check for success status directly, not response.ok
      if (response.status === 200) {
        setMessage("アカウントが正常に有効化されました！ログインできるようになりました。");
        navigate("/admin/login");
      } else {
        throw new Error(response.data?.message || "アカウントの有効化に失敗しました");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || err.message || "アカウントの有効化中にエラーが発生しました"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          アカウントを有効化する
        </h1>

        {message ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                新しいパスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                minLength="8"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirm_password"
              >
                パスワード（確認用）
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                minLength="8"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={loading}
              >
                {loading ? "処理中..." : "アカウントを有効化する"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ActivateNewAccount;