import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/FrontPage.css";

const FrontPage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [showFrontPage, setShowFrontPage] = useState(true);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 500);
    setTimeout(() => {
      setShowFrontPage(false);
      // Removed auto-navigation to keep front page visible
    }, 4000);
  }, []);

  return (
    <div>
      {showFrontPage ? (
        <div className="front-page">
          <div className={`paint-text ${animate ? "animate" : ""}`}>
            <div className="line left"></div>
            <span className="text">Feast</span>
            <div className="line right"></div>
          </div>
          <div className={`caption ${animate ? "caption-animate" : ""}`}>
            <span className="golden-text">Desire meets a new Food</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FrontPage;
