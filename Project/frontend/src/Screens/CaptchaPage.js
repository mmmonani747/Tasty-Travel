import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptchaPage = () => {
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  const handleSubmit = () => {
    if (captchaToken) {
      alert("Captcha verified! Proceeding...");
      // Navigate to the desired page (e.g., login or signup completion)
      navigate('/nextpage'); // Replace with your desired path
    } else {
      alert("Please verify that you are not a robot.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2>Please verify that you are not a robot</h2>
      <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Submit
      </button>
    </div>
  );
};

export default CaptchaPage;
