import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (step === 1 && formData.email) {
      setStep(2);
    } else if (step === 2 && formData.password && formData.confirmPassword) {
      handleSubmit();
    } else {
      setError("すべてのフィールドに記入してください。");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://api-dev.throwin-glow.com/api/v1/auth/register/consumer',
        {
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true  
        }
      );

      if (response.data.detail === "User Created Successfully") {
        navigate('/mail_check');
      } else {
        setError("登録に失敗しました。もう一度お試しください。");
      }
    } catch (error) {
      setError(error.response ? error.response.data.detail : "エラーが発生しました");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {step === 1 && (
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button onClick={handleNext}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;