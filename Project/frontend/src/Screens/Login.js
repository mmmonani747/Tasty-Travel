import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';
import '../css/Login.css';
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [slideIn, setSlideIn] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setSlideIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem('authToken', json.authToken);
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log('Login Error:', error);
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaVerified(!!value); // true if captcha is verified
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">

      <div style={{ marginTop: '80px' }}>
        <div className={`login-container ${slideIn ? "slide-in" : ""}`}>
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <ReCAPTCHA
              sitekey="6Ldv3GsqAAAAANLb1x8XT86pkSMUvBOjuxBDKYqd"
              onChange={onCaptchaChange}
            />
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="signup-prompt">
            Don’t have an account? <Link to="/createuser" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
