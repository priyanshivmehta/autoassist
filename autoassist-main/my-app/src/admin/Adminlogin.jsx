import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { BiUser, BiLockAlt, BiEnvelope, BiPhoneCall, BiMap } from "react-icons/bi";
import axios from "axios";
import { useEffect } from "react";

const AdminMechanicLogin = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLoginActive ? "/admin/login" : "/admin/signup";
    const url = `http://localhost:3000${endpoint}`;

    try {
      const response = await axios.post(url, formData, { withCredentials: true });
      
      if (isLoginActive) {
        // Store user type in localStorage
        localStorage.setItem("userType", response.data.userType);
        alert(response.data.message);
        navigate(response.data.redirect);
      } else {
        alert(response.data.message);
        navigate(response.data.redirect);
      }
      
      setFormData({ username: "", email: "", number: "", password: "" });
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  const toggleForm = (loginState) => {
    setIsLoginActive(loginState);
    setFormData({ username: "", email: "", number: "", password: "" });
  };

  return (
    <div>
      <div className="flex justify-between items-center w-full px-6 pt-5 pl-8 absolute top-0 left-0 z-50">
        <h2 className="text-3xl">
          Auto<span className="text-[#ed832d]">Assist</span>
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          User Login
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
              <>
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
                <div className="input-box">
                  <input
                    type="text"
                    name="number"
                    placeholder="Phone Number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                  <BiPhoneCall className="icon" />
                </div>
              </>
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
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, <span className={`text-[#ed832d]`}>Mechanic!</span></h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => toggleForm(false)}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome <span className={`text-[#ed832d]`}>Back!</span></h1>
            <p>Already registered?</p>
            <button className="btn login-btn" onClick={() => toggleForm(true)}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMechanicLogin;
