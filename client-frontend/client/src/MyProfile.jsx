import "./MyProfile.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartContext } from "./CartContext";
import { useEffect, useState, useContext } from "react";

const MyProfile = ({}) => {

    const { cartItems, setCartItems,wishListItems, setWishListItems } = useContext(CartContext);

    const updateCart = (dynamicCartItem) => setCartItems(dynamicCartItem);
    const updateWishList = (dynamicWishListItem) => setWishListItems(dynamicWishListItem);

    const [user, setUser] = useState({
      name: "Likhith Shivaji",
      email: "likhith@example.com",
      phone: "9876543210",
      dob: "2001-10-05",
    });

    const [isEditing, setIsEditing] = useState(false);

    // handle change in input fields
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prev) => ({ ...prev, [name]: value }));
    };

    // save data to backend
    const handleSave = async () => {
      try {
        // Example using fetch (Node.js backend API endpoint)
        const response = await fetch(
          "http://localhost:5000/api/update-profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const result = await response.json();
        console.log("Update success:", result);

        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };

  return (
    <>
      <Header
        cartItems={cartItems}
        onUpdate={updateCart}
        wishListItems={wishListItems}
        onWishListUpdate={updateWishList}
      />
      <div className="my-profile-details">
        <h1>
          <u>My Profile</u>
        </h1>
        <div className="detail-section">
          <div className="name-detail">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
          </div>

          <br />

          <div className="email-detail">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
          </div>

          <br />

          <div className="phone-detail">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
          </div>

          <br />

          <div className="dob-detail">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleChange}
            disabled={!isEditing}
          />
          </div>

          <br />
          <br />

          {isEditing ? (
            <button className="update-button" onClick={handleSave}><h3>Save Details</h3></button>
          ) : (
            <button className="update-button" onClick={() => setIsEditing(true)}>
              <h3>Update My Details</h3>
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
