import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/CategoriesSection.css";
import vegImage from "../Images/veg.jpg";
import nonVegImage from "../Images/nonveg.jpg";
import dessertsImage from "../Images/desserts.jpg";
import cakesImage from "../Images/cakes.jpg";
import beveragesImage from "../Images/beverages.jpg";
import popularImage from "../Images/popular.jpg";

function CategoriesSection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const staticCategories = [
    { name: "Veg", img: vegImage, description: "Fresh and healthy vegetarian dishes.", path: "/veg" },
    { name: "Non-Veg", img: nonVegImage, description: "Delicious non-vegetarian meals.", path: "/non-veg" },
    { name: "Desserts", img: dessertsImage, description: "Sweet treats and desserts.", path: "/desserts" },
    { name: "Cakes", img: cakesImage, description: "A delightful selection of cakes.", path: "/cakes" },
    { name: "Beverages", img: beveragesImage, description: "Refreshing drinks and beverages.", path: "/beverages" },
    { name: "Popular", img: popularImage, description: "Most loved dishes by customers.", path: "/popular" }
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cms/categorytable")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryClick = (categoryPath) => {
    console.log("Navigating to:", categoryPath);
    navigate(categoryPath);
  };

  return (
    <div className="categories-section">
      <Row className="g-4">
        {staticCategories.map((category, index) => (
          <Col key={`static-${index}`} md={4}>
            <Card className="category-card">
              <Card.Img variant="top" src={category.img} />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>{category.description}</Card.Text>
                <Button variant="primary" onClick={() => handleCategoryClick(category.path)}>
                  Explore {category.name} Menu
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {categories.map((category) => (
          <Col key={`dynamic-${category.categoryid}`} md={4}>
            <Card className="category-card">
              <Card.Img variant="top" src={category.imageUrl || "default.jpg"} />
              <Card.Body>
                <Card.Title>{category.categorytitle}</Card.Title>
                <Card.Text>{category.categoryDescription}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleCategoryClick(`/category/${category.categoryid}`)}
                >
                  Explore {category.categorytitle} Menu
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CategoriesSection;
