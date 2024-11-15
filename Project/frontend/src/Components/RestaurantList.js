import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/RestaurantList.css';
import { FaSearch } from 'react-icons/fa';  // Import React Icon
import { Link } from 'react-router-dom';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationTerm, setLocationTerm] = useState("");  // Location term input state
    const [isLocationSet, setIsLocationSet] = useState(false);  // To track if location is set

    // Fetch restaurants data based on location and search term
    useEffect(() => {
        if (!isLocationSet) {
            return; // Don't fetch if location is not set
        }

        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/restaurants`, {
                    params: {
                        page: currentPage,
                        limit: 60,
                        search: searchTerm,
                        location: locationTerm,  // Fetch restaurants by location
                    },
                });
                setRestaurants(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, [currentPage, searchTerm, locationTerm, isLocationSet]);  // Trigger fetch when location, search term, or page changes

    // Functions to handle pagination
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
    };

    // Handle search input changes
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    // Handle location input changes
    const handleLocationChange = (e) => setLocationTerm(e.target.value);

    // Handle location submission (click "OK")
    const handleLocationSubmit = () => {
        if (locationTerm.trim() !== "") {
            setIsLocationSet(true); // Set location and enable restaurant fetch
        } else {
            alert("Please enter a valid location.");
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px' }}>Restaurants</h1>

            {/* Location Input */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div className="search-bar-container">
                    <input
                        type="text"
                        value={locationTerm}
                        onChange={handleLocationChange}
                        placeholder="Enter your location"
                        className="search-input"
                    />
                    <button className="search-button" onClick={handleLocationSubmit}>OK</button> {/* Location submit */}
                </div>
            </div>

            {/* Search Bar */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div className="search-bar-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by name, city, cuisine, or rating..."
                        className="search-input"
                    />
                    <button className="search-button">
                        <FaSearch className="search-icon" /> {/* Using React Icon */}
                    </button>
                </div>
            </div>

            {/* Restaurant List */}
            <div className="restaurant-grid">
                {restaurants.length > 0 ? (
                    restaurants.map(restaurant => (
                        <div key={restaurant._id} className="card">
                            <h2>{restaurant.name}</h2>
                            <h4>Cuisine: {restaurant.cuisine}</h4>
                            <h6>Rating: {restaurant.rating || "No Rating"}</h6>
                            <h6>City: {restaurant.city}</h6>
                            <h6>{restaurant.rating_count || "No Rating Count"}</h6>
                            <div className="button-group">
                                <Link to="/order" className="order-button">Order Now</Link>
                                <Link to="/booktable" className="book-button">Book Table</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>No restaurants found for "{locationTerm}" and "{searchTerm}". Try another search!</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination" style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default RestaurantList;
