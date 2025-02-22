import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, resetPassword } from "./services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/LoginRegistration.css";

const LoginRegistrationPage = ({ onAuthSuccess }) => {
    const [view, setView] = useState("login");
    const [form, setForm] = useState({
        username: "",
        email: "",
        loginPassword: "",
        confirmPassword: "",
        newPassword: "",
        loginType: "",
        phoneNo: "",
        roles: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
    
        try {
            if (view === "login") {
                const response = await loginUser({ username: form.username, loginPassword: form.loginPassword });
                console.log("Login Response:", response);
    
                setMessage("Login successful!");
                setTimeout(() => {
                    onAuthSuccess();
                    navigate("/home"); // Redirect to home page
                }, 1000);
            } 
            else if (view === "register") {
                if (form.loginPassword !== form.confirmPassword) {
                    setMessage("Passwords do not match!");
                    return;
                }
    
                const response = await registerUser({
                    username: form.username,
                    email: form.email,
                    loginPassword: form.loginPassword,
                    loginConfirmPassword: form.confirmPassword,
                    loginType: form.loginType,
                    phoneNo: form.phoneNo,
                    roles: form.roles,
                });
    
                console.log("Registration Response:", response);
                setMessage("Registration successful!");
                setTimeout(() => {
                    navigate("/home"); // Redirect to home page after registration
                }, 1000);
            } 
            else if (view === "forgot") { 
                if (form.newPassword !== form.confirmPassword) {
                    setMessage("Passwords do not match!");
                    return;
                }
    
                const response = await resetPassword({
                    email: form.email,
                    username: form.username, 
                    newPassword: form.newPassword
                });
    
                console.log("Password Reset Response:", response);
                setMessage("Password reset successful!");
                setTimeout(() => {
                    setView("login"); // Switch back to login page
                }, 1000);
            }
        } catch (error) {
            console.error("Error Details:", error);
            setMessage("Error: " + (error.response?.data || "Something went wrong"));
        }
    };
    return (
                <div className="container-centered">
                <div className={`auth-container ${view === "register" ? "register" : ""}`}>
                <h2 className="text-center">
                    {view === "login" ? "Login" : view === "register" ? "Register" : "Reset Password"}
                </h2>

                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleSubmit}>
                    {view !== "forgot" && (
                        <div className="form-group">
                            <label><i className="bi bi-person"></i> Username</label>
                            <input type="text" name="username" className="form-control" onChange={handleChange} required />
                        </div>
                    )}

                    {view !== "login" && (
                        <div className="form-group mt-3">
                            <label><i className="bi bi-envelope"></i> Email</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} required />
                        </div>
                    )}

                    {view === "register" && (
                        <>
                            <div className="form-group mt-3">
                                <label><i className="bi bi-phone"></i> Phone Number</label>
                                <input type="tel" name="phoneNo" className="form-control" onChange={handleChange} required />
                            </div>

                            <div className="form-group mt-3">
                                <label><i className="bi bi-briefcase"></i> Login Type</label>
                                <input type="text" name="loginType" className="form-control" onChange={handleChange} required />
                            </div>

                            <div className="form-group mt-3">
                                <label><i className="bi bi-people"></i> Roles</label>
                                <input type="text" name="roles" className="form-control" onChange={handleChange} required />
                            </div>
                        </>
                    )}

                    {view !== "forgot" && (
                        <>
                            <div className="form-group mt-3">
                                <label><i className="bi bi-lock"></i> Password</label>
                                <input type="password" name="loginPassword" className="form-control" onChange={handleChange} required />
                            </div>

                            {view === "register" && (
                                <div className="form-group mt-3">
                                    <label><i className="bi bi-lock-fill"></i> Confirm Password</label>
                                    <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
                                </div>
                            )}
                        </>
                    )}

                    {view === "forgot" && (
                        <>
                            <div className="form-group mt-3">
                                <label><i className="bi bi-lock"></i> New Password</label>
                                <input type="password" name="newPassword" className="form-control" onChange={handleChange} required />
                            </div>

                            <div className="form-group mt-3">
                                <label><i className="bi bi-lock-fill"></i> Confirm New Password</label>
                                <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn btn-primary mt-3 w-100">
                        {view === "login" ? "Login" : view === "register" ? "Register" : "Reset Password"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    {view === "login" ? (
                        <>
                            <p>Don't have an account? <span className="text-primary" onClick={() => setView("register")}>Register</span></p>
                            <p>Forgot password? <span className="text-primary" onClick={() => setView("forgot")}>Reset</span></p>
                        </>
                    ) : (
                        <p><span className="text-primary" onClick={() => setView("login")}>Back to Login</span></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginRegistrationPage;
