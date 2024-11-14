import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/OrderConfirmed.css';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

function OrderConfirmed() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice, address, paymentMethod, restaurantLocation, userLocation } = location.state || {};
  const mapRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDGaO6DdRlV_-nKerXOU63XEEFGSkIW54w',
  })

  useEffect(() => {
    // Check if google and the required data are available
    if (window.google && mapRef.current && restaurantLocation && userLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();

      // Initialize the map
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 14,
        center: userLocation,
      });

      directionsRenderer.setMap(map);

      // Request directions from the user's location to the restaurant
      directionsService.route(
        {
          origin: userLocation,
          destination: restaurantLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error('Error fetching directions', status);
          }
        }
      );
    }
  }, [restaurantLocation, userLocation]);

  // Fallback for missing data
  const paymentMethodText = paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card';
  const formattedTotalPrice = totalPrice ? `₹${totalPrice.toFixed(2)}` : 'N/A';

  return (
    <div className="order-confirmed-container">
      <div className="order-confirmed-message">
        <h1>Thank You for Your Order!</h1>
        <h3>Your order has been confirmed!</h3>
      </div>

      <div className="order-summary-box">
        <h4>Order Summary:</h4>
        <div className="order-details">
          <div><strong>Shipping Address:</strong> {address || 'Not Available'}</div>
          <div><strong>Payment Method:</strong> {paymentMethodText}</div>
          <div><strong>Total Price:</strong> {formattedTotalPrice}</div>
        </div>
      </div>

      <div className="order-items-box">
        <h4>Items Ordered:</h4>
        <ul>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map(item => (
              <li key={item.id}>
                {item.name} - ₹{item.price} x {item.quantity}
              </li>
            ))
          ) : (
            <li>No items in your cart</li>
          )}
        </ul>
      </div>

      <h4>Route from Your Home to the Restaurant:</h4>
      <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>

      <button className="go-home-button" onClick={() => navigate('/')}>
        Go to Home
      </button>

      <div className="thank-you-footer">
        <h5>We appreciate your business!</h5>
      </div>
    </div>
  );
}

export default OrderConfirmed;
