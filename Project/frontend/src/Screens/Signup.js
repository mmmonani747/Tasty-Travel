import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';
import '../css/Signup.css';
import ReCAPTCHA from "react-google-recaptcha";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phon_no: "",
    cnpassword: ""
  });
  const [error, setError] = useState(null);
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

    if (credentials.password !== credentials.cnpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();

      if (response.ok) {
        alert('User registered successfully!');
        navigate('/login');
      } else {
        setError(json.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error in signup:', error);
      setError('Error connecting to the server');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  return (
    <div className="login-page">
     
      <div style={{ marginTop: '80px' }}>
        <div className={`login-container ${slideIn ? "slide-in" : ""}`}>
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Sign Up</h2>
            {error && <p className="text-danger">{error}</p>}
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="input-field"
              value={credentials.name}
              onChange={handleChange}
              required
            />
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
            <input
              type="password"
              name="cnpassword"
              placeholder="Confirm Password"
              className="input-field"
              value={credentials.cnpassword}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phon_no"
              placeholder="Phone Number"
              className="input-field"
              value={credentials.phon_no}
              onChange={handleChange}
              required
            />
            <ReCAPTCHA
              sitekey="6Ldv3GsqAAAAANLb1x8XT86pkSMUvBOjuxBDKYqd"
              onChange={onCaptchaChange}
            />
            <button type="submit" className="login-btn">Sign Up</button>
          </form>
          <p className="signup-prompt">
            Already have an account? <Link to="/login" className="signup-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
