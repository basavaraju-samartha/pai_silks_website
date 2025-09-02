import "./MyOrders.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { orders } from "./userOrder";
import { CartContext } from "./CartContext";
import { useEffect, useState, useContext } from "react";

const MyOrders = ({}) => {

    let today = new Date();
    // // let diffMs = today - orderDate;
    // let diffDays = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
    // console.log("Days difference:", diffDays);
    

    const { cartItems, setCartItems,wishListItems, setWishListItems } = useContext(CartContext);

    const updateCart = (dynamicCartItem) => setCartItems(dynamicCartItem);
    const updateWishList = (dynamicWishListItem) => setWishListItems(dynamicWishListItem);

    const[recentOrders,setRecentOrders]=useState([])
    const[previousOrders,setPreviousOrders]=useState([])


    useEffect(() => {
      const recent = orders.filter((item) => {
        let orderDate = new Date(item.orderDate);
        let diff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
        return diff < 30;
      });

      const previous = orders.filter((item) => {
        let orderDate = new Date(item.orderDate);
        let diff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
        return diff > 30;
      });

      setRecentOrders(recent);
      setPreviousOrders(previous);
      console.log("Recent orders:", recent);
      console.log("Previous orders:", previous);
    }, [orders]);

  return (
    <>
      <Header
        cartItems={cartItems}
        onUpdate={updateCart}
        wishListItems={wishListItems}
        onWishListUpdate={updateWishList}
      />
      <div className="your-orders">
        <div className="orders-heading-section">
          <h1>
            <u>My Orders</u>
          </h1>
        </div>
        <div className="recent-order"></div>
        <div className="previous-order"></div>
        <h1>Recent Orders</h1>
        <div className="order-component">
          {recentOrders.length === 0 ? (
            <p className="text">No recent orders</p>
          ) : (
            recentOrders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div className="order-product-image">
                  <img src={order.imageUrl} alt={order.name} width={80} />
                </div>
                <div className="order-product-description">
                  <div>
                    <h2>{order.name}</h2>
                  </div>
                  <div>
                    <p>Qty: {order.quantity}</p>
                  </div>
                  <div>
                    <h3>₹ {order.price}</h3>
                  </div>
                  {/* <div><h3>{today.toString()}</h3></div> */}
                </div>
              </div>
            ))
          )}
        </div>

        <h1>Previous Orders</h1>
        <div className="order-component">
          {previousOrders.length === 0 ? (
            <p className="text">No recent orders</p>
          ) : (previousOrders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-product-image">
                <img src={order.imageUrl} alt={order.name} width={80} />
              </div>
              <div className="order-product-description">
                <div>
                  <h2>{order.name}</h2>
                </div>
                <div>
                  <p>Qty: {order.quantity}</p>
                </div>
                <div>
                  <h3>₹ {order.price}</h3>
                </div>
              </div>
            </div>
          )))
        }
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
