import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/OrderNow.css';

function OrderNow() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const items = [
    { id: 1, name: 'Dish 1', price: 100 },
    { id: 2, name: 'Dish 2', price: 150 },
    { id: 3, name: 'Dish 3', price: 200 },
    { id: 4, name: 'Dish 4', price: 250 },
    { id: 5, name: 'Dish 5', price: 300 },
    { id: 6, name: 'Dish 6', price: 350 },
    { id: 7, name: 'Dish 7', price: 400 },
    { id: 8, name: 'Dish 8', price: 450 },
    { id: 9, name: 'Dish 9', price: 500 },
    { id: 10, name: 'Dish 10', price: 550 },
    { id: 11, name: 'Dish 11', price: 600 },
    { id: 12, name: 'Dish 12', price: 650 },
  ];

  useEffect(() => {
    // Reset cart on revisiting page
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
    setTotalPrice(savedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, []);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    let updatedCartItems;

    if (existingItem) {
      updatedCartItems = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(updatedCartItems);
    setTotalPrice(prevTotal => prevTotal + item.price);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    setTotalPrice(updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCartItems);
    setTotalPrice(updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
    setTotalPrice(updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleProceedToCheckout = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/checkout', { state: { cartItems, totalPrice } });
  };

  return (
    <div className="order-now-wrapper">
      {/* Hide cart icon when offcanvas is open */}
      <button className={`cart-icon ${showCart ? 'hidden' : ''}`} onClick={() => setShowCart(true)}>
        <i className="bi bi-cart"></i>
        {cartItems.length > 0 && <span className="cart-item-count">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>}
      </button>

      <h2 className="order-now-title">Order Now</h2>

      <div className="order-now-items row">
        {items.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="order-now-card card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Price: ₹{item.price}</p>
                <button className="order-now-button btn btn-primary" onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-now-total-container">
        <h3 className="order-now-total">Total Price: ₹{totalPrice.toFixed(2)}</h3>
        <button className="checkout-button btn btn-success" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      </div>

      {showCart && (
        <div className="offcanvas offcanvas-end show">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Your Cart</h5>
            <button type="button" className="btn-close" onClick={() => setShowCart(false)}></button>
          </div>
          <div className="offcanvas-body">
            {cartItems.length === 0 ? (
              <p>Your cart is empty!</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <p>{item.name} - ₹{item.price} x {item.quantity}</p>
                  <div className="quantity-buttons">
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
                </div>
              ))
            )}
            <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
          </div>
          <div className="offcanvas-footer">
            <button className="btn btn-danger" onClick={() => setShowCart(false)}>Close</button>
            <button className="btn btn-success" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderNow;
