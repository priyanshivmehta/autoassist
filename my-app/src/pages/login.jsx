// import React, { useState } from "react";
// import "../styles/login.css"; // Your CSS file path
// import {
//   BiUser,
//   BiLockAlt,
//   BiEnvelope,
//   BiLogoGoogle,
//   BiLogoFacebook,
//   BiLogoGithub,
//   BiLogoLinkedin,
// } from "react-icons/bi";
// import axios from "axios";

// const LoginSignup = () => {
//   const [isLoginActive, setIsLoginActive] = useState(true);

//   return (
//     <div className={`container ${isLoginActive ? "" : "active"}`}>
//       {/* Login Form */}
//       <div className="form-box login">
//         <form onSubmit={(e) => e.preventDefault()}>
//           <h1>Login</h1>
//           <div className="input-box">
//             <input type="text" placeholder="Username" required />
//             <BiUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input type="password" placeholder="Password" required />
//             <BiLockAlt className="icon" />
//           </div>
//           <div className="forgot-link">
//             <a href="#">Forgot Password?</a>
//           </div>
//           <button type="submit" className="btn">
//             Login
//           </button>
//           <p>or login with social platforms</p>
//           <div className="social-icons">
//             <a href="#">
//               <BiLogoGoogle />
//             </a>
//             <a href="#">
//               <BiLogoFacebook />
//             </a>
//             <a href="#">
//               <BiLogoGithub />
//             </a>
//             <a href="#">
//               <BiLogoLinkedin />
//             </a>
//           </div>
//         </form>
//       </div>

//       {/* Register Form */}
//       <div className="form-box register">
//         <form onSubmit={(e) => e.preventDefault()}>
//           <h1>Registration</h1>
//           <div className="input-box">
//             <input type="text" placeholder="Username" required />
//             <BiUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input type="email" placeholder="Email" required />
//             <BiEnvelope className="icon" />
//           </div>
//           <div className="input-box">
//             <input type="password" placeholder="Password" required />
//             <BiLockAlt className="icon" />
//           </div>
//           <button type="submit" className="btn">
//             Register
//           </button>
//           <p>or register with social platforms</p>
//           <div className="social-icons">
//             <a href="#">
//               <BiLogoGoogle />
//             </a>
//             <a href="#">
//               <BiLogoFacebook />
//             </a>
//             <a href="#">
//               <BiLogoGithub />
//             </a>
//             <a href="#">
//               <BiLogoLinkedin />
//             </a>
//           </div>
//         </form>
//       </div>

//       {/* Toggle Box */}
//       <div className="toggle-box">
//         <div className="toggle-panel toggle-left">
//           <h1>Hello, Welcome!</h1>
//           <p>Don't have an account?</p>
//           <button
//             className="btn register-btn"
//             onClick={() => setIsLoginActive(false)}
//           >
//             Register
//           </button>
//         </div>

//         <div className="toggle-panel toggle-right">
//           <h1>Welcome Back!</h1>
//           <p>Already have an account?</p>
//           <button
//             className="btn login-btn"
//             onClick={() => setIsLoginActive(true)}
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import {
  BiUser,
  BiLockAlt,
  BiEnvelope,
  BiLogoGoogle,
} from "react-icons/bi";
import axios from "axios";

import { GoogleLogin } from "@react-oauth/google";

const LoginSignup = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLoginActive ? "/login" : "/register";
    const url = `http://localhost:5000${endpoint}`;

    try {
      const response = await axios.post(url, formData);
      if (isLoginActive) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Registration successful!");
      }
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  // Handle Google Login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      // Send token to backend for verification and get app token
      const response = await axios.post("http://localhost:5000/google-login", { token });
      localStorage.setItem("token", response.data.token);
      alert("Google login successful!");
      navigate("/");
    } catch (error) {
      alert("Google login failed.");
    }
  };

  // Handle Google Login failure
  const handleGoogleFailure = () => {
    alert("Google login failed.");
  };

  const toggleForm = (loginState) => {
    setIsLoginActive(loginState);
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className={`container ${isLoginActive ? "" : "active"}`}>
      <div className={`form-box ${isLoginActive ? "login" : "register"}`}>
        <form onSubmit={handleSubmit}>
          <h1>{isLoginActive ? "Login" : "Registration"}</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <BiUser className="icon" />
          </div>
          {!isLoginActive && (
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <BiEnvelope className="icon" />
            </div>
          )}
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <BiLockAlt className="icon" />
          </div>

          <button type="submit" className="btn">
            {isLoginActive ? "Login" : "Register"}
          </button>

          <p>or login with social platforms</p>

          <div className="social-icons" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />

          </div>
        </form>
      </div>
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button className="btn register-btn" onClick={() => toggleForm(false)}>
            Register
          </button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button className="btn login-btn" onClick={() => toggleForm(true)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
