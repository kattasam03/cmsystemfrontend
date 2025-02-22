import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/OrderTable.css";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("cart")) || [];
    const currentDate = new Date();

    const formattedOrders = storedOrders.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image || "https://via.placeholder.com/80",
      placedDate: currentDate.toDateString(),
      deliveryDate: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000).toDateString(), // 3 days later
      status: "Processing",
    }));
    setOrders(formattedOrders);
  }, []);

  const handleFeedbackSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="order-table-container">
      {!showFeedback ? (
        <>
          <h2 className="table-title">My Orders</h2>
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Placed Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No orders placed.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <img src={order.image} alt={order.name} className="order-image" />
                    </td>
                    <td>{order.name}</td>
                    <td>{order.placedDate}</td>
                    <td>{order.deliveryDate}</td>
                    <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <button className="feedback-btn" onClick={() => setShowFeedback(true)}>Give Feedback</button>
        </>
      ) : (
        <div className="feedback-container">
          {!submitted ? (
            <>
              <h2 className="feedback-title">Give Feedback</h2>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span key={num} className={num <= rating ? "gold-star" : "gray-star"} onClick={() => setRating(num)}>
                    ★
                  </span>
                ))}
              </div>
              <textarea className="feedback-message" placeholder="Write your feedback..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
              <button className="submit-feedback" onClick={handleFeedbackSubmit}>Submit Feedback</button>
            </>
          ) : (
            <div className="thank-you-message">Thank you for your feedback!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTable;