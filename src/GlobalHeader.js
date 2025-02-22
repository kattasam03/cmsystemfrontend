import React from "react";
import profileIcon from "./Images/resu.jpg"; // Using resu.jpg as the icon
import "./Components/styles/global.css"; // Ensure the CSS file is present

const GlobalHeader = () => {
  return (
    <div className="global-header">
      <img src={profileIcon} alt="Profile Icon" className="header-icon" />

    </div>
  );
};

export default GlobalHeader;
