import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">Restaurant</div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/foodblog">Food Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link> {/* Navigate to Contact Page */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
