import React, { useState, useEffect } from 'react';
import "./styles/MyOrdersPage.css";

const MyOrdersPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const updateQuantity = (id, newQuantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === id
                ? { ...item, quantity: newQuantity, totalPrice: newQuantity * (item.unitPrice || item.price) }
                : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (id) => {
        const filteredCart = cartItems.filter(item => item.id !== id);
        setCartItems(filteredCart);
        localStorage.setItem('cart', JSON.stringify(filteredCart));
    };

    // ✅ Calculate Total Price
    const totalPrice = cartItems.reduce((total, item) => total + (item.totalPrice || item.price * item.quantity), 0);

    return (
        <div className="orders-container">
            <h2>My Order Details</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="order-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="order-item">
                            <img 
                                src={item.image ? String(item.image) : "https://via.placeholder.com/80"} 
                                alt={item.name || "Product Image"} 
                                className="order-image"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/80"; }} 
                            />

                            <div className="order-details">
                                <h4 className="order-name">{item.name}</h4> {/* Name in White */}
                                <p className="order-price">Price: ₹{item.totalPrice || item.price * item.quantity}</p>
                                <div className="quantity-control">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    {/* ✅ Total Price Display */}
                    <div className="total-price">
                        <h3>Total: ₹{totalPrice}</h3>
                    </div>

                    <button className="place-order-btn">Place Order</button> {/* Place Order Button */}
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;
