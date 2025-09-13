import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import DiscountsPage from "./Components/DiscountsPage";
import AlertsPage from "./Components/AlertsPage";
import SubscribeModal from "./Components/SubscribeModal";
import Authentication from "./Components/Authentication";
import Welcome from "./Components/Welcome";
import Navbar from "./Components/Navbar";
import DiscountManagement from "./Components/DiscountManagement";
import PromoForm from "./Components/promoform";

import "./App.css";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/discounts">Discounts</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/subscribe">Subscribe</Link>
        <Link to="/auth">Authentication</Link>
        <Link to="/manage-discounts">Manage Discounts</Link>
        <Link to="/promoform">Promo Form</Link>
      </nav>

      {/* Routes */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/discounts" element={<DiscountsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/subscribe" element={<SubscribeModal />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/manage-discounts" element={<DiscountManagement />} />
          <Route path="/promoform" element={<PromoForm />} />
          {/* Navbar component route (optional) */}
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </main>
    </Router>
  );
}
