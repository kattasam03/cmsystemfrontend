import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Alert } from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";
import "./styles/HomePage.css";

function HomePage() {
  const [showAddress, setShowAddress] = useState(false);
  const [formData, setFormData] = useState({
    userstate: "",
    usercity: "",
    userstreet: "",
    userzipcode: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  // Login-related state variables
  const [username, setUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
    try {
      const response = await axios.post(
        "http://localhost:9999/api/cms/login/post/userslogin",
        {
          username,
          loginPassword,
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        localStorage.setItem("userId", response.data); // Store user ID
        // Redirect to homepage (if necessary)
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid credentials. Please try again.");
    }
  };

  // Handle address submission

// Handle address submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); 

  const userId = localStorage.getItem("userId");
  if (!userId || userId === "null" || userId === "undefined") {
    setError("User not logged in. Please log in first.");
    return;
  }

  try {
    // Check if the user already has an address
    const existingAddressResponse = await axios.get(`http://localhost:9999/api/cms/address/${userId}`);
    const existingAddress = existingAddressResponse.data;

    if (existingAddress) {
      // If the address exists, update it
      const updateResponse = await axios.put(`http://localhost:9999/api/cms/address/${userId}`, {
        ...formData,
        userLogin: { id: parseInt(userId) },
      });
      if (updateResponse.status === 200) {
        setSubmitted(true);
        setShowAddress(false);
        setFormData({ userstate: "", usercity: "", userstreet: "", userzipcode: "" });

        // Delay hiding the login form
        setTimeout(() => {
          setUsername("");  // Clear username
          setLoginPassword("");  // Clear password
          // Optionally, you can also hide the login section with another state if needed.
        }, 500); // 0.5-second delay
      } else {
        setError("Failed to update address. Please try again.");
      }
    } else {
      // If no address exists, insert a new one
      const createResponse = await axios.post("http://localhost:9999/api/cms/address", {
        ...formData,
        userLogin: { id: parseInt(userId) },
      });
      if (createResponse.status === 201) {
        setSubmitted(true);
        setShowAddress(false);
        setFormData({ userstate: "", usercity: "", userstreet: "", userzipcode: "" });

        // Delay hiding the login form
        setTimeout(() => {
          setUsername("");  // Clear username
          setLoginPassword("");  // Clear password
          // Optionally, you can also hide the login section with another state if needed.
        }, 500); // 0.5-second delay
      } else {
        setError("Failed to submit address. Please try again.");
      }
    }
  } catch (err) {
    console.error("Error submitting:", err);
    setError("An unexpected error occurred. Please try again.");
  }
};



  // Hide success message after 3 seconds
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className="home-page container text-center">
      <h1>Welcome to the Restaurant!</h1>
      <p>Explore our menu and enjoy delicious meals!</p>

      {/* Login Form */}
      <div className="login-form mt-4">
        <h3>Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </div>

      {/* Address Button */}
      <Button
        variant="primary"
        className="address-btn d-flex align-items-center justify-content-center mx-auto"
        onClick={() => {
          setShowAddress(!showAddress);
          setSubmitted(false); // Reset success message when reopening form
        }}
      >
        <GeoAltFill className="me-2" /> Address
      </Button>

      {/* Address Form */}
      {showAddress && (
        <div className="address-form mt-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="userstate"
                value={formData.userstate}
                onChange={handleChange}
                placeholder="Enter your state"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="usercity"
                value={formData.usercity}
                onChange={handleChange}
                placeholder="Enter your city"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="userstreet"
                value={formData.userstreet}
                onChange={handleChange}
                placeholder="Enter your street"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                name="userzipcode"
                value={formData.userzipcode}
                onChange={handleChange}
                placeholder="Enter your zipcode"
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Submit Address
            </Button>
          </Form>
        </div>
      )}

      {/* Success Message */}
      {submitted && (
        <Alert variant="success" className="mt-3">
          Address submitted successfully!
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </div>
  );
}

export default HomePage;
