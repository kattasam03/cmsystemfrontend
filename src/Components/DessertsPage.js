import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles/DessertsPage.css";
import chocolateMousse from "../Images/chocolate_mousse.jpg";
import fruitSalad from "../Images/fruit_salad.png";
import iceCream from "../Images/ice_cream.jpg";
import gulabJamun from "../Images/gulab_jamun.jpg";


const DessertsPage = () => {
  const navigate = useNavigate();
  
  const dessertsItems = [
    { id: 1, name: "Chocolate Mousse", img: chocolateMousse, price: 200, availableQuantity: 12, arrivedDate: "2025-02-01" },
    { id: 2, name: "Fruit Salad", img: fruitSalad, price: 150, availableQuantity: 20, arrivedDate: "2025-02-02" },
    { id: 3, name: "Ice Cream", img: iceCream, price: 100, availableQuantity: 25, arrivedDate: "2025-02-03" },
    { id: 4, name: "Gulab Jamun", img: gulabJamun, price: 120, availableQuantity: 15, arrivedDate: "2025-02-04" },
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
      <h2 className="text-center">Desserts Menu</h2>
      <Row>
        {dessertsItems.map((item) => (
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

export default DessertsPage;
