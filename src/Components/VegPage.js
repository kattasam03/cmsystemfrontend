import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles/VegPage.css";

import alooFry from "../Images/aloofry.jpg";
import pizza from "../Images/pizza.jpg";
import mushroomCurry from "../Images/mushroomcurry.jpg";
import paneerBiryani from "../Images/paneerbiryani.png";
import dalTadka from "../Images/daltadka.jpg";
import alooParatha from "../Images/Alooparatha.jpg";
import gobiManchurian from "../Images/gobimanchurian.jpg";
import dosa from "../Images/dosa.jpg";
import palakPaneer from "../Images/palakpaneer.jpg";

const VegPage = () => {
  const navigate = useNavigate();

  const vegItems = [
    { id: 1, name: "Aloo Fry", img: alooFry, price: 99, availableQuantity: 20, arrivedDate: "2025-02-01" },
    { id: 2, name: "Veg Pizza", img: pizza, price: 249, availableQuantity: 15, arrivedDate: "2025-02-03" },
    { id: 3, name: "Mushroom Curry", img: mushroomCurry, price: 199, availableQuantity: 10, arrivedDate: "2025-02-02" },
    { id: 4, name: "Paneer Biryani", img: paneerBiryani, price: 299, availableQuantity: 8, arrivedDate: "2025-02-04" },
    { id: 5, name: "Dal Tadka", img: dalTadka, price: 179, availableQuantity: 25, arrivedDate: "2025-02-01" },
    { id: 6, name: "Aloo Paratha", img: alooParatha, price: 89, availableQuantity: 30, arrivedDate: "2025-02-05" },
    { id: 7, name: "Gobi Manchurian", img: gobiManchurian, price: 149, availableQuantity: 12, arrivedDate: "2025-02-06" },
    { id: 8, name: "Dosa", img: dosa, price: 80, availableQuantity: 40, arrivedDate: "2025-02-02" },
    { id: 9, name: "Palak Paneer Curry", img: palakPaneer, price: 150, availableQuantity: 18, arrivedDate: "2025-02-03" },
  ];

  const handleAddToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart];

    const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ 
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: String(item.img) // Convert to a string
    });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/my-orders");
};




  return (
    <Container className="mt-4">
      <h2 className="text-center">Vegetarian Menu</h2>
      <Row>
        {vegItems.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.img} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text><strong>Price:</strong> ₹{item.price}</Card.Text>
                <Card.Text><strong>Available Quantity:</strong> {item.availableQuantity}</Card.Text>
                <Card.Text><strong>Arrived Date:</strong> {item.arrivedDate}</Card.Text>
                <Button variant="success" onClick={() => handleAddToCart(item)}>+ Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VegPage;
