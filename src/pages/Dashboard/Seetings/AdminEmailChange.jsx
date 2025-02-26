import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import UseGetResturentWonerSettings from "../../../hooks/Dashboard/UseGetResturentWonerSettings";

const AdminEmailChange = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { resturentWonerSettings } = UseGetResturentWonerSettings();
  const [email, setEmail] = useState(resturentWonerSettings?.email || "");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/restaurant-owner/settings/change-email-request",
        { email, password }
      );
      console.log("Email change request sent successfully", response.data);
      navigate("/dashboard/settings");
    } catch (error) {
      console.error("Error changing email", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter new email"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
        />
        <button type="submit">Change Email</button>
      </form>
    </div>
  );
};

export default AdminEmailChange;
