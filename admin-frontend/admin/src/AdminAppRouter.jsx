import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./AdminLogin";
import AdminHomePage from "./AdminHomePage";

export default function AdminAppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/admin-home-page" element={<AdminHomePage/>} />
      </Routes>
    </Router>
  );
}