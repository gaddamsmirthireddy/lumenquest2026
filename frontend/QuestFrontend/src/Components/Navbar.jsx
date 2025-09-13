import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isWelcomePage = false, isAuthPage = false }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow fixed-top ${
        isWelcomePage ? "mx-4 px-4 py-2 rounded-pill mt-3" : "w-100"
      }`}
      style={{
        backgroundColor: isWelcomePage ? "#f0f8ff" : "#1a1a2e",
        zIndex: 1030,
        marginTop: isWelcomePage ? "1rem" : "0",
        padding: isWelcomePage ? "" : "0.5rem 1rem",
      }}
    >
      {/* Brand */}
      <Link
        className="navbar-brand d-flex align-items-center fw-bold"
        to={isAuthPage ? "/" : "/dashboard"}
        style={{ color: isWelcomePage ? "inherit" : "white" }}
      >
        Subscription Management System
      </Link>

      {/* Auth Page → Home Button */}
      {isAuthPage ? (
        <div className="ms-auto">
          <Link to="/" className="btn btn-light fw-semibold auth-home-btn">
            Home
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={isWelcomePage ? {} : { color: "white" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu Items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {isWelcomePage ? (
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link fw-semibold text-dark" href="#Welcome">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-semibold text-dark" href="#features">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-semibold text-dark" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-semibold text-dark" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link to="/userDashboard" className="nav-link fw-semibold text-white">
                    User Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/adminDashboard" className="nav-link fw-semibold text-white">
                    Admin Dashboard
                  </Link>
                </li>
              </ul>
            )}

            {/* Right Side Buttons */}
            <div className="d-flex">
              {isWelcomePage ? (
                <>
                  {/* Login Button */}
                  <Link to="/login" className="btn nav-btn me-2">
                    Login
                  </Link>

                  {/* Sign Up Button */}
                  <Link to="/signup" className="btn nav-btn-dark">
                    Sign Up
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="btn nav-btn">
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
