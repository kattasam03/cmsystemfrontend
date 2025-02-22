import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./styles/BeveragesPage.css";

import cocaCola from "../Images/coca_cola.png";
import pepsi from "../Images/pepsi.png";
import lemonade from "../Images/lemonade.jpg";
import orangeJuice from "../Images/orange_juice.jpg";
import icedTea from "../Images/iced_tea.jpg";
import milkshake from "../Images/milkshake.png";
import coffee from "../Images/coffee.png";

const BeveragesPage = () => {
  const navigate = useNavigate();

  const beveragesItems = [
    { id: 1, name: "Coca-Cola", img: cocaCola, price: 50 },
    { id: 2, name: "Pepsi", img: pepsi, price: 50 },
    { id: 3, name: "Lemonade", img: lemonade, price: 40 },
    { id: 4, name: "Orange Juice", img: orangeJuice, price: 60 },
    { id: 5, name: "Iced Tea", img: icedTea, price: 40 },
    { id: 6, name: "Milkshake", img: milkshake, price: 80 },
    { id: 7, name: "Coffee", img: coffee, price: 70 },
  ];

  const handleAddToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart];
    const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);
  
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    // Navigate to MyOrdersPage after adding to cart
    navigate("/my-orders");  
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Beverages Menu</h2>
      <Row>
        {beveragesItems.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={item.img}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text><strong>Price:</strong> ₹{item.price}</Card.Text>
                <Button variant="success" onClick={() => handleAddToCart(item)}>
                  + Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BeveragesPage;
