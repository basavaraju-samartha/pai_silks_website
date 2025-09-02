import React, { useState } from "react";
import "./ProfileSection.css";
import rightarrow from '../assets/rightarrow.svg'
import { useLocation, useNavigate } from "react-router-dom";

const Profile = ({onClose}) => {
  const navigate = useNavigate();

  return (
    <div className="profile-wrapper">
      <div className="my-profile-panel">
        <div className="my-profile-naming-and-button">
          <p className="profile-main-name">My Profile</p>
          <button className="close-button" onClick={onClose}></button>
        </div>

        <div className="profile-navigation-options" onClick={(e)=>{navigate("/my-orders");e.stopPropagation()}}>
          {/* My Orders */}
          <div className="my-orders">
            <div className="navigation-name">
              <h3>My Orders</h3>
              <img src={rightarrow} alt="" />
            </div>
          </div>

          {/* About Us */}
          <div className="about-us" onClick={(e)=>{navigate("/about-us");e.stopPropagation()}}>
            <div className="navigation-name">
              <h3>About Us</h3>
              <img src={rightarrow} alt="" />
            </div>
          </div>

          {/* Sort Option */}
          <div className="my-profile-sub-navigation" onClick={(e)=>{navigate("/my-profile");e.stopPropagation()}}>
            <div className="navigation-name">
              <h3>My Profile</h3>
              <img src={rightarrow} alt="" />
            </div>
          </div>
        </div>

        {/* Login Button */}
        <div className="login-button">
          <button className="login">
            <h4>Login/Register</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
