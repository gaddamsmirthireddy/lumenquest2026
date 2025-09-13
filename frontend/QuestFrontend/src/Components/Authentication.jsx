
import React, { useState } from "react";
import {
    Form,
    Button,
    Card,
    Container,
    Row,
    Col,
    Alert,
    Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./Authentication.css";

const Authentication = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [role, setRole] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminKey, setAdminKey] = useState(""); 

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !password || (!isSignIn && !name)) {
            setError("Please fill in all required fields");
            setLoading(false);
            return;
        }

        try {
            if (isSignIn) {
                // LOGIN
                const res = await axios.post("http://localhost:5000/api/auth/login", {
                    email,
                    password,
                });
                localStorage.setItem("authToken", res.data.token);
                localStorage.setItem("userRole", res.data.user.role);

                navigate(
                    res.data.user.role === "admin" ? "/adminDashboard" : "/userDashboard"
                );
            } else {
                // REGISTER
                await axios.post("http://localhost:5000/api/auth/register", {
                    name,
                    email,
                    password,
                    role,
                    adminKey: role === "admin" ? adminKey : undefined, // NEW
                });
                alert("Registration successful! Please log in.");
                setIsSignIn(true);
                // Clear form
                setName("");
                setRole("user");
                setEmail("");
                setPassword("");
                setAdminKey(""); 
            }
        } catch (err) {
            setError(err.response?.data?.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar isAuthPage={true} />
            <div className="auth-page-container">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10} lg={8}>
                            <div
                                className={`auth-container ${isSignIn ? "" : "right-panel-active"}`}
                            >
                                {/* Sign Up */}
                                <div className="auth-form-container sign-up-container">
                                    <Card className="auth-card">
                                        <Card.Body className="p-4 p-md-5">
                                            <h3 className="auth-title">Create Your Account</h3>
                                            <p className="auth-subtitle">
                                                Join the Subscription Management System
                                            </p>
                                            {error && <Alert variant="danger">{error}</Alert>}
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Full Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="auth-input"
                                                    />
                                                </Form.Group>

                                                <Row>
                                                    <Col md={8}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                placeholder="Enter your email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                className="auth-input"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Role</Form.Label>
                                                            <Form.Select
                                                                value={role}
                                                                onChange={(e) => setRole(e.target.value)}
                                                                className="auth-input"
                                                            >
                                                                <option value="user">User</option>
                                                                <option value="admin">Admin</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                {/* Showing it only if role is admin */}
                                                {role === "admin" && (
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Admin Secret Key</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Enter your Admin Secret Key"
                                                            value={adminKey}
                                                            onChange={(e) => setAdminKey(e.target.value)}
                                                            className="auth-input"
                                                        />
                                                    </Form.Group>
                                                )}

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Create a strong password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="auth-input"
                                                    />
                                                </Form.Group>

                                                <div className="d-grid">
                                                    <Button
                                                        type="submit"
                                                        className="auth-btn"
                                                        disabled={loading}
                                                    >
                                                        {loading ? (
                                                            <Spinner animation="border" size="sm" />
                                                        ) : (
                                                            "Create Account"
                                                        )}
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </div>

                                {/* Sign In */}
                                <div className="auth-form-container sign-in-container">
                                    <Card className="auth-card">
                                        <Card.Body className="p-4 p-md-5">
                                            <h3 className="auth-title">Welcome Back</h3>
                                            <p className="auth-subtitle">
                                                Sign in to manage your subscriptions
                                            </p>
                                            {error && <Alert variant="danger">{error}</Alert>}
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="auth-input"
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="auth-input"
                                                    />
                                                </Form.Group>

                                                <div className="d-grid">
                                                    <Button
                                                        type="submit"
                                                        className="auth-btn"
                                                        disabled={loading}
                                                    >
                                                        {loading ? (
                                                            <Spinner animation="border" size="sm" />
                                                        ) : (
                                                            "Sign In"
                                                        )}
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </div>

                                {/* Overlay */}
                                <div className="overlay-container">
                                    <div className="overlay">
                                        <div className="overlay-panel overlay-left">
                                            <h4 className="fw-bold">Welcome Back!</h4>
                                            <p className="mb-3">Sign in to access your subscriptions</p>
                                            <Button
                                                className="overlay-btn"
                                                onClick={() => setIsSignIn(true)}
                                            >
                                                Sign In
                                            </Button>
                                        </div>
                                        <div className="overlay-panel overlay-right">
                                            <h4 className="fw-bold">Hello, Friend!</h4>
                                            <p className="mb-3">
                                                Enter your details to start managing subscriptions
                                            </p>
                                            <Button
                                                className="overlay-btn"
                                                onClick={() => setIsSignIn(false)}
                                            >
                                                Sign Up
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Authentication;

























