import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles/CakesPage.css";

import chocolateCake from "../Images/chocolate_cake.png";
import vanillaCake from "../Images/vanilla_cake.png";
import redVelvetCake from "../Images/red_velvet_cake.png";
import fruitCake from "../Images/fruit_cake.png";

const CakesPage = () => {
  const navigate = useNavigate();

  const cakesItems = [
    { id: 1, name: "Chocolate Cake", img: chocolateCake, price: 450, availableQuantity: 10, arrivedDate: "2025-02-01" },
    { id: 2, name: "Vanilla Cake", img: vanillaCake, price: 400, availableQuantity: 15, arrivedDate: "2025-02-02" },
    { id: 3, name: "Red Velvet Cake", img: redVelvetCake, price: 500, availableQuantity: 8, arrivedDate: "2025-02-03" },
    { id: 4, name: "Fruit Cake", img: fruitCake, price: 550, availableQuantity: 12, arrivedDate: "2025-02-04" },
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
      <h2 className="text-center">Cakes Menu</h2>
      <Row>
        {cakesItems.map((item) => (
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
                <Card.Text><strong>Available Quantity:</strong> {item.availableQuantity}</Card.Text>
                <Card.Text><strong>Arrived Date:</strong> {item.arrivedDate}</Card.Text>
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

export default CakesPage;
