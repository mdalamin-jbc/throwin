import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ROLES } from "../constants/role";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const email = Cookies.get("email");
      const accessToken = Cookies.get("access_token");
      const refreshToken = Cookies.get("refresh_token");
      const role = Cookies.get("user_role");

      if (email && accessToken && role) {
        setUser({ email, access: accessToken, refresh: refreshToken, role });
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  const clearCookies = () => {
    Cookies.remove("email");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user_role");
    localStorage.removeItem("userRole");
  };

  const login = (userData) => {
    clearCookies();
    // Prevent login if an existing session with a different role exists
    const currentRole = Cookies.get("user_role");
    if (currentRole && currentRole !== userData.role) {
      toast.error(
        "別のアカウントでログインしています。ログアウトしてください。",
        {
          duration: 3000,
        }
      );
      return;
    }

    setUser(userData);
    Cookies.set("email", userData.email, { expires: 7 });
    Cookies.set("access_token", userData.access, { expires: 7 });
    Cookies.set("refresh_token", userData.refresh, { expires: 7 });
    Cookies.set("user_role", userData.role, { expires: 7 });
  };
  const logout = () => {
    // Store the user role before clearing cookies for redirect logic
    const userRole = user?.role || Cookies.get("user_role");

    setUser(null);
    clearCookies();

    // Redirect based on user role
    if (userRole === ROLES.CONSUMER) {
      window.location.href = "/login";
    } else {
      window.location.href = "/admin/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
