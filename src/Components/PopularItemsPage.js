import React from "react"; 
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles/PopularItemsPage.css";

import pizzaImg from "../Images/pizza.jpg";
import burgerImg from "../Images/burger.jpg";
import pastaImg from "../Images/pasta.png";
import sushiImg from "../Images/sushi.jpg";


const PopularItemsPage = () => {
    const navigate = useNavigate();
  
    const popularItems = [
      { id: 1, name: "Pizza", description: "Cheesy delight with toppings", price: "₹500", availableQuantity: 15, arrivedDate: "2025-02-01", img: pizzaImg },
      { id: 2, name: "Burger", description: "Juicy patty with fresh veggies", price: "₹150", availableQuantity: 20, arrivedDate: "2025-02-02", img: burgerImg },
      { id: 3, name: "Pasta", description: "Creamy Italian-style pasta", price: "₹250", availableQuantity: 10, arrivedDate: "2025-02-03", img: pastaImg },
      { id: 4, name: "Sushi", description: "Authentic Japanese sushi rolls", price: "₹600", availableQuantity: 8, arrivedDate: "2025-02-04", img: sushiImg },
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
      <h2 className="text-center">Popular Menu</h2>
      <Row>
        {popularItems.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.img} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> {item.price} <br />
                  <strong>Available Quantity:</strong> {item.availableQuantity} <br />
                  <strong>Arrived Date:</strong> {item.arrivedDate}
                </Card.Text>
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

export default PopularItemsPage;
