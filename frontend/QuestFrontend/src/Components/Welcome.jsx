import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import Navbar from "./Navbar";

export default function Welcome() {
  const images = [img1, img2, img3];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="position-relative">
      {/* Background Image Slider */}
      <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: -2 }}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentImage === idx ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          />
        ))}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
          }}
        />
      </div>

      <Navbar isWelcomePage={true} />

      {/* Hero Section */}
      <div className="position-relative" style={{ zIndex: 1, paddingTop: "100px" }}>
        <section id="Welcome" className="vh-100 d-flex align-items-center justify-content-center text-center text-white">
          <div className="container">
            <motion.h1
              className="fw-bold mb-3 display-2"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Welcome to <br /> Subscription Management System
            </motion.h1>

            <motion.p
              className="text-light mb-4 lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Subscribe, upgrade, or cancel plans effortlessly—<br />
              manage all subscriptions in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link to="/signup" className="btn btn-light px-4 py-2 rounded-pill me-3">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline-light px-4 py-2 rounded-pill">
                Login
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="vh-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 text-white">
          <div className="container">
            <h2 className="display-4 mb-5">✨ Key Features</h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="p-4 rounded bg-dark bg-opacity-50 h-100">
                  <h3>Easy Subscription Management</h3>
                  <p>Create, manage, and cancel subscriptions effortlessly.</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="p-4 rounded bg-dark bg-opacity-50 h-100">
                  <h3>Plan Upgrades & Notifications</h3>
                  <p>Upgrade plans or receive timely alerts about your subscriptions.</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="p-4 rounded bg-dark bg-opacity-50 h-100">
                  <h3>Analytics & Reports</h3>
                  <p>Track usage, payments, and active subscriptions with detailed insights.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="vh-100 d-flex justify-content-center align-items-center bg-secondary bg-opacity-25 text-white">
          <div className="container">
            <h2 className="display-4 mb-5">ℹ️ About Our System</h2>
            <div className="row">
              <div className="col-md-8 mx-auto">
                <p className="lead">
                  Our Subscription Management System simplifies how users and businesses handle multiple subscription services. 
                  Manage all your subscriptions, payments, and notifications in one unified platform.
                </p>
                <p className="lead">
                  Designed for efficiency and ease-of-use, it provides a seamless experience for tracking subscription plans, 
                  analyzing usage, and making data-driven decisions to optimize spending.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="vh-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 text-white">
          <div className="container">
            <h2 className="display-4 mb-5">📩 Contact Us</h2>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <form>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control form-control-lg bg-dark text-white border-secondary" 
                      placeholder="Your Name"
                      style={{ color: 'white' }}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      className="form-control form-control-lg bg-dark text-white border-secondary" 
                      placeholder="Your Email"
                      style={{ color: 'white' }}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea 
                      className="form-control form-control-lg bg-dark text-white border-secondary" 
                      rows="5" 
                      placeholder="Your Message"
                      style={{ color: 'white' }}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-light btn-lg w-100">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
