import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Checkout.css';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox ,LoadScript} from '@react-google-maps/api';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardHolder: '',
  });
  const inputRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDGaO6DdRlV_-nKerXOU63XEEFGSkIW54w',
    libraries: ["places"]
  });

  const [error, setError] = useState('');

  const handleOnPlacesChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places.length > 0) {
      const address = places[0].formatted_address;  // Get the formatted address
      setAddress(address);
    }
  };

  useEffect(() => {
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
      setTotalPrice(location.state.totalPrice);
    } else {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
      if (savedCartItems) {
        setCartItems(savedCartItems);
        setTotalPrice(savedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
      }
    }
  }, [location]);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const isExpiryDateValid = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const { expiryMonth, expiryYear } = cardDetails;
    return (
      parseInt(expiryYear) > currentYear ||
      (parseInt(expiryYear) === currentYear && parseInt(expiryMonth) > currentMonth)
    );
  };

  const handleConfirmOrder = () => {
    if (!address || !paymentMethod) {
      setError('Please fill in the address and select a payment method.');
    } else {
      if (paymentMethod === 'credit-card') {
        const { cardNumber, expiryMonth, expiryYear, cvv, cardHolder } = cardDetails;
        if (!cardNumber || !expiryMonth || !expiryYear || !cvv || !cardHolder) {
          setError('Please fill in all card details.');
          return;
        }
        if (cardNumber.length !== 10) {
          setError('Card number should be 10 digits long.');
          return;
        }
        if (cvv.length !== 3) {
          setError('CVV should be 3 digits long.');
          return;
        }
        if (!isExpiryDateValid()) {
          setError('Expiry date should be after the current month and year.');
          return;
        }
      }

      localStorage.setItem('userAddress', address);
      navigate('/order-confirmed', { state: { cartItems, totalPrice, address, paymentMethod, cardDetails } });
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="bill-total-section">
        <h3>Bill Summary</h3>
        <div className="order-total">
          <p>Items Total: ₹{totalPrice.toFixed(2)}</p>
          <hr />
          <p>GST (8%): ₹{(totalPrice * 0.08).toFixed(2)}</p>
          <p>Delivery Charge: ₹50</p>
          <hr />
          <strong>Total: ₹{(totalPrice * 1.08 + 50).toFixed(2)}</strong>
        </div>
      </div>

      <div className="address-section">
        <h3>Shipping Address</h3>
        {isLoaded && (
          // <StandaloneSearchBox
          //   onLoad={(ref) => inputRef.current = ref}
          //   onPlacesChanged={handleOnPlacesChanged}>
            <input
              type="text"
              className="address-input"
              placeholder="Search for your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)} // Allow manual input
            />
          // </StandaloneSearchBox>
        )}
      </div>

      <div className="payment-method-section">
        <h3>Payment Method</h3>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="credit-card"
              checked={paymentMethod === 'credit-card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit / Debit Card
          </label>
        </div>

        {paymentMethod === 'credit-card' && (
          <div className="card-details-section">
            <h4>Card Details</h4>
            <div className="card-detail-inputs">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                className="card-input"
                placeholder="Enter card number"
                value={cardDetails.cardNumber}
                onChange={handleCardInputChange}
                maxLength="10"
              />
              <label>Expiry Date</label>
              <div className="expiry-date-selectors">
                <select
                  name="expiryMonth"
                  value={cardDetails.expiryMonth}
                  onChange={handleCardInputChange}
                  className="expiry-selector"
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name="expiryYear"
                  value={cardDetails.expiryYear}
                  onChange={handleCardInputChange}
                  className="expiry-selector"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 2025} value={i + 2025}>
                      {i + 2025}
                    </option>
                  ))}
                </select>
              </div>
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                className="card-input"
                placeholder="Enter CVV"
                value={cardDetails.cvv}
                onChange={handleCardInputChange}
                maxLength="3"
              />
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardHolder"
                className="card-input"
                placeholder="Enter cardholder name"
                value={cardDetails.cardHolder}
                onChange={handleCardInputChange}
              />
            </div>
          </div>
        )}
      </div>

      <button className="confirm-order-btn" onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
}

export default Checkout;
