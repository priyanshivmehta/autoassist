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
  BiPhone,
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
  const endpoint = isLoginActive ? "/user/login" : "/user/signup";
  const url = `http://localhost:3000${endpoint}`;

  // ✅ Validation for registration
  if (!isLoginActive) {
    const phoneRegex = /^[0-9]{10}$/; 

    if (!phoneRegex.test(formData.number)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }
  }

  try {
    const response = await axios.post(url, formData, { withCredentials: true });
    // if (isLoginActive) {
    //   localStorage.setItem("token", response.data.token);
    //   alert("Login successful!");
    // } else {
      //   alert("Registration successful!");
      // }
    navigate("/");
    setFormData({ username: "", email: "", number: "", password: "" });
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
    setFormData({ username: "", email: "", number: "", password: "" });
  };

  return (
    <div className="Background">
      <div className="flex justify-between items-center w-full px-6 pt-5 pl-8 absolute top-0 left-0 z-50">
        <h2 className="text-3xl">
          Auto<span className="text-[#ed832d]">Assist</span>
        </h2>
        <button
          onClick={() => navigate("/admin/Adminlogin")}
          className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          Admin Login
        </button>
      </div>

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
                type="text"
                name="number"
                placeholder="Phone Number"
                value={formData.number}
                onChange={handleInputChange}
                required
              />
              {/* Added phone icon */}
              <BiPhone className="icon" />
            </div>

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
            <h1>Hello, <span className={`text-[#ed832d]`}>Welcome!</span></h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => toggleForm(false)}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome <span className={`text-[#ed832d]`}>Back!</span></h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => toggleForm(true)}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
