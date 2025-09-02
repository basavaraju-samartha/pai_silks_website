import React, { useEffect, useState, useContext } from "react";
import "./Checkout.css";
import CheckOutItem from './components/CheckOutItem.jsx'
import logo from './assets/logo.svg'
import { CartContext } from "./CartContext.jsx";
import payment_gateway from './assets/payment_gateway.svg'

const Checkout = ({  }) => {
 const { dynamicCartItem, total } = useContext(CartContext);
 const [country, setCountry]=useState('Select')
 const [selectedAddressOption, setSelectedAddressOption] = useState(false);
 const [selectedBillingAddressOption, setSelectedBillingAddressOption] = useState(false);

useEffect(() => { 
    
    dynamicCartItem.map(item=>console.log(item,item.quantity));
    console.log(total);
 }, []);


const handleShippingClick = () => {
  setSelectedAddressOption((prev) => !prev); // toggle on/off
};
const handleDifferentBillingClick = () => {
  setSelectedBillingAddressOption((prev) => !prev); // toggle on/off
};
  return (
    <>
      <header className="checkout-header">
        <img src={logo} alt="" />
      </header>
      <div className="checkout-section">
        <form action="/">
          <div className="checkout-details-section">
            <div className="contact">
              <h3>Contact</h3>

              <div className="input-group">
                <input
                  className="email-field"
                  type="email"
                  name="email_id"
                  id=""
                  required
                />
                <label >Email</label>
              </div>

              <label htmlFor="checkbox">
                <input
                  className="check-box"
                  type="checkbox"
                  name="email-checkbox"
                  id=""
                />
                Keep me updated with offers and news.
              </label>
            </div>

            <div className="delivery">
              <div className="floating-dropdown input-group">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="India">India</option>
                </select>
                <label className={country ? "active" : ""}>Country</label>
              </div>

              <div className="user-name">
                <div className="input-group">
                  <input
                    className="name"
                    type="text"
                    name="firstname"
                    id=""
                    required
                  />
                  <label htmlFor="firs-tname">First Name</label>
                </div>

                <div className="input-group">
                  <input
                    className="name"
                    type="text"
                    name="lastname"
                    id=""
                    required
                  />
                  <label htmlFor="last-name">Last Name</label>
                </div>
              </div>

              <div className="input-group">
                <input
                  className="address"
                  type="text"
                  name="address"
                  id=""
                  required
                />
                <label htmlFor="address">Address</label>
              </div>

              <div className="input-group">
                <input
                  className="address"
                  type="text"
                  name="apartment-num"
                  id=""
                  required
                />
                <label htmlFor="apartment">Apartment, suite, etc. (optional)</label>
              </div>

              <div className="city-state-pincode">
                <div className="input-group ">
                  <input
                    className="city"
                    type="text"
                    name="city"
                    id=""
                    required
                  />
                  <label htmlFor="city">City</label>
                </div>

                <div className="input-group ">
                  <input
                    className="state"
                    type="text"
                    name="state"
                    id=""
                    required
                  />
                  <label htmlFor="state">State</label>
                </div>

                <div className="input-group ">
                  <input
                    className="pincode"
                    type="text"
                    name="pincode"
                    id=""
                    required
                  />
                  <label htmlFor="pin-code">Pin Code</label>
                </div>
              </div>
            </div>

            <h3>Payment</h3>

            <div className="payment-input pay-label">
              <label htmlFor="payment">
                <input type="radio" name="RazorPay" id="" />{" "}
                Razorpay
              </label>
              <img src={payment_gateway} alt="" />
            </div>

            <div className="billing-address">
              <div className="payment-input" onClick={handleShippingClick}>
                <label htmlFor="shipping address">
                  <input
                    type="radio"
                    name="same-billing-address"
                    id=""
                    className="billing1"
                    checked={selectedAddressOption}
                  />{" "}
                  Same as shipping address
                </label>
              </div>
              <div
                className="payment-input"
                onClick={handleDifferentBillingClick}
              >
                <label htmlFor="bill-addr">
                  <input
                    type="radio"
                    name="different-billing-address"
                    id=""
                    className="billing2"
                    checked={selectedBillingAddressOption}
                  />
                  Use a different billing address
                </label>
              </div>
            </div>

            <h3>Remember Me</h3>
            <div className="remember-me payment-input">
                <label htmlFor="remember">
                  <input
                    type="checkbox"
                    name="remeber-me"
                    id=""
                    className="billing2"
                    // checked
                  />
                  Save my information for a faster checkout
                </label>
            </div>
            <button className="submit-button" type="submit">Pay now</button>
          </div>
        </form>

        <div className="checkout-items-section">
          {dynamicCartItem.map(
              (item, index)=>
                (<CheckOutItem
                key={item.id}
                item={item}
                index={index}
                quantity={item.quantity}
              />)
              )}
              <div className="total-section ">
                <h3>Subtotal</h3>
                <h3>₹ {total}</h3>
              </div>
              <div className="total-section total-bottom">
                <h3>Shipping Charge</h3>
                <h3>₹ 99</h3>
              </div>
              <div className="total-section total-amount">
                <h3>Total</h3>
                <h3>₹  {total+99}</h3>
              </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;