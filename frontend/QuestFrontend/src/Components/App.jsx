import React, { useState } from "react";
import DiscountsPage from "./pages/DiscountsPage";
import AlertsPage from "./pages/AlertsPage";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("discounts");

  return (
    <div className="app">
      <nav className="navbar">
        <button
          className={page === "discounts" ? "active" : ""}
          onClick={() => setPage("discounts")}
        >
          Discounts
        </button>
        <button
          className={page === "alerts" ? "active" : ""}
          onClick={() => setPage("alerts")}
        >
          Alerts & Notifications
        </button>
      </nav>

      <main className="container">
        {page === "discounts" && <DiscountsPage />}
        {page === "alerts" && <AlertsPage />}
      </main>
    </div>
  );
}
