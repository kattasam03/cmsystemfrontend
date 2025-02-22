import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/FeedbackCard.css";


const FeedbackCard = () => {
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
  

    const handleSubmit = () => {
        if (message.trim() !== "" && rating > 0) {
          setSubmitted(true);
          setTimeout(() => {
            setShow(false);
            setSubmitted(false);
            setMessage("");
            setRating(0);
          }, 3000);
        } else {
          alert("Please provide a rating and feedback message");
        }
      };

      return (
        <div>
          <Button className="open-btn" onClick={() => setShow(true)}>
            Give Feedback
          </Button>
          <div className={`feedback-card ${show ? "show" : ""}`}>
            {submitted ? (
              <div className="thank-you-message">
                <h2>🎉 Thank You! 🎉</h2>
                <p>Your feedback helps us improve 😊</p>
              </div>
            ) : (
              <Card className="p-5 shadow-lg feedback-card-content">
                <Card.Body>
                  <h2 className="text-center">We Value Your Feedback</h2>
                  <p className="text-center text-muted">Help us improve by sharing your thoughts!</p>
                  <div className="rating text-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarFill
                        key={star}
                        className={`star ${star <= rating ? "selected" : ""}`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <Form>
                    <Form.Group className="mt-4">
                      <Form.Control
                        as="textarea"
                        rows="4"
                        placeholder="Write your feedback here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                  <div className="d-flex justify-content-between mt-4">
                    <Button variant="danger" onClick={() => setShow(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      );
    };
    
    export default FeedbackCard;