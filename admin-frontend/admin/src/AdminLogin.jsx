import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";   // 👈 add this
import "./AdminLogin.css";
import logo from "./assets/pai-silks-logo.png";
import { loginDetails } from "./adminDetails.js";
import { ContextApp } from "@/ContextApp";

function AdminLogin() {
  const { email, password, setEmail, setPassword } = useContext(ContextApp);
  const navigate = useNavigate();  // 👈 hook for navigation

  const loginCheck = (e) => {
    e.preventDefault(); // stop form from reloading page

    if (
      loginDetails[0].email === email &&
      loginDetails[0].password === password
    ) {
      alert("Log In successful!");
      navigate("/admin-home-page"); // 👈 redirect to ItemManagement page
    } else {
      alert("Try again :(");
    }
  };

  return (
    <div className="login-page">
      <div className="admin-image-section">
        <img src={logo} className="pai-logo" />
      </div>
      <div className="login-credentials-section">
        <div className="login-area">
          <h2>Login</h2>
          <a href="/">Forgot your password?</a>
          <form className="form" onSubmit={loginCheck}>
            <input
              type="email"
              placeholder="Email"
              onBlur={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onBlur={(e) => setPassword(e.target.value)}
            />
            <label>
              <input type="checkbox" defaultChecked />
              Keep me Logged in
            </label>
            <button type="submit">
              <h4>LOGIN</h4>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
