import { useState } from 'react'
import './AdminLogin.css'
import logo from './assets/pai-silks-logo.png'
import {loginDetails} from './adminDetails.js'

function AdminLogin() {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const loginCheck=()=> {
        if ((loginDetails[0].email==email)&&(loginDetails[0].password==password)){
            alert("Log In successful!")
        }
        else(alert("Try again:("))
    }

  return (
    <>
      <div className="login-page">
        <div className="admin-image-section">
          <img src={logo} className="pai-logo" />
        </div>
        <div className="login-credentials-section">
          <div className="login-area">
            <h2>Login</h2>
            <a href="/">Forgot your password?</a>
            <form action="#" className='form'>
              <input
                type="email"
                name="Email-id"
                id="input-email"
                placeholder="Email"
                onBlur={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="Password"
                id="input-password"
                placeholder="Password"
                onBlur={(e) => setPassword(e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  name="Logged-in-checkbox"
                  id="login-checkbox"
                  checked
                />
                Keep me Logged in
              </label>
              <button type="submit" onClick={loginCheck}>
                <h4>LOGIN</h4>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin
