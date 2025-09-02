import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import App from "./App";
import ViewProductPage from "./components/ViewProductPage";
import AboutUs from "./components/AboutUs";
import MyOrders from './MyOrders'
import MyProfile from "./MyProfile";
import Checkout from "./Checkout"

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<App />} />
        <Route path="/product" element={<ViewProductPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}