import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import GlobalHeader from "./GlobalHeader";
import LoginRegistrationPage from "./Components/LoginRegistrationPage";
import HomePage from "./Components/HomePage";
import ContactPage from "./Components/Contactpage";
import FoodBlog from "./Components/BlogPage";
import FeedbackCard from "./Components/feedbackPage";
import FrontPage from "./Components/entrancepage";
import CategoriesSection from "./Components/CategoriesSection";
import VegPage from "./Components/VegPage"; 
import NonVegPage from "./Components/NonVegPage"; 
import CakesPage from "./Components/CakesPage";
import BeveragesPage from "./Components/BeveragesPage";
import DessertsPage from "./Components/DessertsPage";
import PopularItemsPage from "./Components/PopularItemsPage";
import MyOrdersPage from "./Components/MyOrdersPage";
import Signout from "./Components/Signout";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFrontPage, setShowFrontPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowFrontPage(false), 4000); // Show front page for 4 seconds
  }, []);

  // Function to handle successful login or registration
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
  };

  // Redirect to home when `isLoggedIn` changes
  

  return (
    <>
      {showFrontPage ? (
        <FrontPage />
      ) : (
        <>
          <GlobalHeader /> {/* Place it here so it appears on all pages except FrontPage */}
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/home" /> : <LoginRegistrationPage onAuthSuccess={handleAuthSuccess} />
              }
            />
            <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/foodblog" element={<FoodBlog />} />
            <Route path="/feedback" element={<FeedbackCard />} />
            <Route path="/categories" element={<CategoriesSection />} />
            <Route path="/veg" element={isLoggedIn ? <VegPage /> : <Navigate to="/" />} />   
            <Route path="/non-veg" element={isLoggedIn ? <NonVegPage /> : <Navigate to="/" />} />   
            <Route path="/cakes" element={isLoggedIn ? <CakesPage /> : <Navigate to="/" />} />
            <Route path="/beverages" element={isLoggedIn ? <BeveragesPage /> : <Navigate to="/" />} />
            <Route path="/desserts" element={isLoggedIn ? <DessertsPage /> : <Navigate to="/" />} />
            <Route path="/popular-items" element={isLoggedIn ? <PopularItemsPage /> : <Navigate to="/" />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/signout" element={<Signout />} />

            </Routes>
        </>
      )}
    </>
  );
}

export default App;
