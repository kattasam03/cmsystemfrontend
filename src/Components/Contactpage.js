import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/ContactPage.css";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully!");
    setForm({ name: "", email: "", contactNumber: "", message: "" });
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", contactNumber: "", message: "" });
  };

  return (
    <div className="container contact-container">
      <div className="header-with-dots">
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label><i className="bi bi-person"></i> Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-group mt-3">
          <label><i className="bi bi-envelope"></i> Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-group mt-3">
          <label><i className="bi bi-telephone"></i> Contact Number</label>
          <input type="tel" name="contactNumber" className="form-control" value={form.contactNumber} onChange={handleChange} required />
        </div>

        <div className="form-group mt-3">
          <label><i className="bi bi-chat-dots"></i> Message</label>
          <textarea name="message" className="form-control" rows="4" value={form.message} onChange={handleChange} required></textarea>
        </div>

        <div className="btn-group mt-4 d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn btn-success">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;