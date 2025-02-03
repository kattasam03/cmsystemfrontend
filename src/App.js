import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LoginRegistrationPage from "./Components/LoginRegistrationPage";
import HomePage from "./Components/HomePage";
import ContactPage from "./Components/Contactpage"; 
import FoodBlog from "./Components/BlogPage"; 


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to handle successful login or registration
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    navigate("/home"); // Navigate to Home after login/register
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <LoginRegistrationPage onAuthSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path="/foodblog" element={<FoodBlog />} /> 
      </Routes>
      <Footer />
    </>
  );
}

export default App;
