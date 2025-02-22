import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Carousel, Container, Row, Col } from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";
import "./styles/HomePage.css";
import { useNavigate } from "react-router-dom";

import drink1 from "../Images/drinks1.jpg";
import drink2 from "../Images/drinks2.jpg";
import drink3 from "../Images/drinks3.jpg";

import tiffin1 from "../Images/tiffinpic1.jpg";
import tiffin2 from "../Images/tiffinpic2.jpg";
import tiffin3 from "../Images/tiffinpic3.jpg";

import burger1 from "../Images/burger1.jpg";
import burger2 from "../Images/burger2.jpg";
import burger3 from "../Images/burger3.jpg";

import biryani1 from "../Images/biryani1.jpg";
import biryani2 from "../Images/biryani2.jpg";
import biryani3 from "../Images/biryani3.jpg";

import CategoriesSection from "./CategoriesSection";
import OrderTable from "./OrderTable";


function HomePage() {
  const [showAddress, setShowAddress] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userstate: "",
    usercity: "",
    userstreet: "",
    userzipcode: "",
  });

  const handleSignOut = () => {
    navigate("/signout");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in. Please log in first.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:9999/api/cms/address/${userId}`);
      const existingAddress = response.data;

      if (existingAddress) {
        await axios.put(`http://localhost:9999/api/cms/address/${userId}`, {
          ...formData,
          userLogin: { id: parseInt(userId) },
        });
      } else {
        await axios.post("http://localhost:9999/api/cms/address", {
          ...formData,
          userLogin: { id: parseInt(userId) },
        });
      }

      setSubmitted(true);
      setFormData({ userstate: "", usercity: "", userstreet: "", userzipcode: "" });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };
  

  const handleToggleCategories = () => {
    setShowCategories(!showCategories);
    setShowAddress(false);
  };

  const handleShowOrders = () => {
    setShowOrders(!showOrders);
    setShowCategories(false);
    setShowAddress(false);
  };
  return (
    <div className="home-container">
      {/* Buttons Group */}
      <div className="button-group">
        <Button className="address-btn" onClick={() => setShowAddress(!showAddress)}>
          <GeoAltFill className="me-2" /> Address
        </Button>
        <Button className="category-btn" onClick={handleToggleCategories}>
          Categories
        </Button>
        <Button className="order-btn" onClick={handleShowOrders}>
          My Orders
        </Button>
        <Button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      {/* Address Form */}
 
      {showAddress && (
        <div className="address-form slide-in">
          <Card className="black-card">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" name="userstate" value={formData.userstate} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="usercity" value={formData.usercity} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Street</Form.Label>
                  <Form.Control type="text" name="userstreet" value={formData.userstreet} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control type="text" name="userzipcode" value={formData.userzipcode} onChange={handleChange} />
                </Form.Group>
                <Button type="submit" className="gold-button">Submit</Button>
              </Form>
              {submitted && <div className="success-message">Address successfully submitted!</div>}
            </Card.Body>
          </Card>
        </div>
      )}


      {/* Categories Section */}
      {showCategories && <CategoriesSection />}
      
      {/* Order Table */}
      {showOrders && <OrderTable />}

      {/* Carousel Section */}
{!showCategories && !showAddress && !showOrders && (
  <Container className="carousel-grid">
    <Row>
      <Col md={6}>
        <Carousel className="custom-carousel">
          {[drink1, drink2, drink3].map((img, index) => (
            <Carousel.Item key={index}>
              <img className="carousel-image" src={img} alt="Drinks" />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col md={6}>
        <Carousel className="custom-carousel">
          {[tiffin1, tiffin2, tiffin3].map((img, index) => (
            <Carousel.Item key={index}>
              <img className="carousel-image" src={img} alt="Tiffin" />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col md={6}>
        <Carousel className="custom-carousel">
          {[burger1, burger2, burger3].map((img, index) => (
            <Carousel.Item key={index}>
              <img className="carousel-image" src={img} alt="Burgers" />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col md={6}>
        <Carousel className="custom-carousel">
          {[biryani1, biryani2, biryani3].map((img, index) => (
            <Carousel.Item key={index}>
              <img className="carousel-image" src={img} alt="Biryani" />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  </Container>
)}

    </div>
  );
}

export default HomePage;
