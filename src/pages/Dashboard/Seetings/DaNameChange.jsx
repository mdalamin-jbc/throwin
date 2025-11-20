import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import { useState } from "react";

const DaNameChange = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/restaurant-owner/settings/change-name",
        { name }
      );

      navigate("/dashboard/settings");
    } catch (error) {
      console.error("Error changing name", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter new name"
        />
        <button type="submit">Change Name</button>
      </form>
    </div>
  );
};

export default DaNameChange;
