import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Signout.css";

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    
   
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, [navigate]);

  return (
    <div className="signout-container">
      <div className="signout-card">
        <h2 className="signout-title">Signing Out...</h2>
        <p className="signout-message">You have been successfully signed out.</p>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="redirect-message">Redirecting to login page...</p>
      </div>
    </div>
  );
};

export default Signout;
