import '@fortawesome/fontawesome-free/css/all.min.css';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure this is the last imported JavaScript file
import logo from '../assets/icon.png';
import '../css/Navbar.css';
import React, { useState, useEffect, createContext, useContext } from 'react'; // Added createContext and useContext imports
import { useNavigate } from 'react-router-dom';

// Create CartContext
const CartContext = createContext();  

// Export the CartContext and custom hook to use it
export { CartContext }; // Export CartContext
export function useCart() {
  return useContext(CartContext);  // Custom hook to access cart items
}

function Navbar() {
  const [quantity, setQuantity] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const itemPrice = 10.00;

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      fetchUserProfile();
    }
  }, []);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ address: userAddress })
      });
      alert('Location saved successfully');
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  };
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/restaurants?search=${searchTerm}`); // Redirect to restaurant list page with search query
  };
  
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Tasty Travel Logo" width="80" className="navbar-logo" />
          </a>
          <div className="fs-3 text-light ms-3" id="name">Tasty Travel</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex align-items-center ms-auto">
              {localStorage.getItem("authToken") ? (
                <>
                  <a id="location" className="btn" data-bs-toggle="offcanvas" href="#offcanvasLocation" role="button" aria-controls="offcanvasLocation">
                    <i className="fas fa-map-marker-alt"></i> Location
                  </a>
                  {/* <a id="search" className="btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch" aria-controls="offcanvasSearch">
                    <i className="ri-search-line"></i> Search
                  </a> */}
                  {/* <a id="cart" className="btn position-relative" data-bs-toggle="offcanvas" href="#offcanvasCart" role="button" aria-controls="offcanvasCart">
                    <i className="fas fa-shopping-cart"></i> Cart 
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItemCount}
                      </span>
                    )}
                  </a> */}
                  <a id="profile" className="btn" data-bs-toggle="offcanvas" href="#offcanvasProfile" role="button" aria-controls="offcanvasProfile">
                    <i className="ri-user-line"></i> Profile
                  </a>
                </>
              ) : (
                <>
                  <a id="login" href="/login" className="btn">
                    <i className="ri-login-box-line"></i> Login
                  </a>
                  <a id="signup" href="/createuser" className="btn">
                    <i className="ri-user-add-line"></i> Signup
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Location Offcanvas */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasLocation" aria-labelledby="offcanvasLocationLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLocationLabel">Set Location</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleLocationSubmit}>
            <label>Enter Location:</label>
            <input type="text" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} className="form-control" />
            <button type="submit" className="btn btn-primary mt-3">Save Location</button>
          </form>
        </div>
      </div>

      {/* Profile Offcanvas */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasProfile" aria-labelledby="offcanvasProfileLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasProfileLabel">{userProfile ? `Hello, ${userProfile.username}` : 'User Profile'}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {userProfile && (
            <>
              <p>Email: {userProfile.email}</p>
              <p>Phone: {userProfile.phone}</p>
            </>
          )}
          <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Cart Offcanvas */}
      {/* <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasCartLabel">Your Cart</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ₹{item.price}
              </li>
            ))}
          </ul>
          <h5>Total: ₹{totalPrice}</h5>
          <button className="btn btn-secondary mt-3" data-bs-dismiss="offcanvas">Continue Shopping</button>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
      </div> */}

      {/* Search Offcanvas */}
      {/* <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasSearch" aria-labelledby="offcanvasSearchLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSearchLabel">Search</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
        <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for food, restaurant, or city"
              />
              <button className="btn btn-outline-dark" type="submit">
                <i className="ri-search-line"></i> Search
              </button>
            </form>
        </div>
      </div> */}
    </CartContext.Provider>
  );
}

export default Navbar;
