// AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const email = Cookies.get("email");
      const accessToken = Cookies.get("access_token");

      if (email && accessToken) {
        setUser({ email, access: accessToken });
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("email", userData.email, { expires: 7 });
    Cookies.set("access_token", userData.access, { expires: 7 });
    Cookies.set("refresh_token", userData.refresh, { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("email");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  };

  const authInfo = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// Define PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
