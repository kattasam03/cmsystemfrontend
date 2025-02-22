import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles/NonVegPage.css";
import chickenBiryani from "../Images/chicken_biryani.png";
import butterChicken from "../Images/butter_chicken.png";
import fishCurry from "../Images/fish_curry.png";
import prawnMasala from "../Images/prawn.png";
import eggCurry from "../Images/egg_curry.png";
import tandooriChicken from "../Images/tandoori.png";
import chickenKorma from "../Images/chicken_korma.png";
import muttonBiryani from "../Images/mutton_biryani.png";

const NonVegPage = () => {
  const navigate = useNavigate();
  
  const nonVegItems = [
    { id: 1, name: "Chicken Biryani", img: chickenBiryani, price: 280, availableQuantity: 15, arrivedDate: "2025-02-01" },
    { id: 2, name: "Butter Chicken", img: butterChicken, price: 320, availableQuantity: 12, arrivedDate: "2025-02-02" },
    { id: 3, name: "Fish Curry", img: fishCurry, price: 300, availableQuantity: 8, arrivedDate: "2025-02-03" },
    { id: 4, name: "Prawn Masala", img: prawnMasala, price: 400, availableQuantity: 10, arrivedDate: "2025-02-04" },
    { id: 5, name: "Egg Curry", img: eggCurry, price: 180, availableQuantity: 20, arrivedDate: "2025-02-01" },
    { id: 6, name: "Tandoori Chicken", img: tandooriChicken, price: 360, availableQuantity: 6, arrivedDate: "2025-02-05" },
    { id: 7, name: "Chicken Korma", img: chickenKorma, price: 310, availableQuantity: 9, arrivedDate: "2025-02-06" },
    { id: 8, name: "Hyderabadi Mutton Biryani", img: muttonBiryani, price: 380, availableQuantity: 5, arrivedDate: "2025-02-02" },
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
      <h2 className="text-center">Non-Vegetarian Menu</h2>
      <Row>
        {nonVegItems.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={item.img}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "150px", // Ensures uniform height
                  objectFit: "cover", // Prevents distortion
                  borderRadius: "10px", // Optional for rounded edges
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

export default NonVegPage;
