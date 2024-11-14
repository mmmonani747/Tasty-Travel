import { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "./RestaurantCard"; // Import the RestaurantCard component
import "../css/RestaurantList.css"; // Optional, for additional styling (e.g., for the grid)

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Making API request..."); // Log when the request is made

    axios.get("http://localhost:3001/restaurants")
      .then((res) => {
        console.log("API Response:", res.data); // Log the response data for debugging
        setRestaurants(res.data); // Save the data in state
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error); // Log errors
        setError("Failed to fetch restaurant data. Please try again later.");
        setLoading(false); // Stop loading
      });
  }, []);

  return (
    <div className="restaurant-list-container">
      {loading ? (
        <div>Loading...</div> // Show loading message while data is being fetched
      ) : error ? (
        <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div> // Show error message if there's an issue
      ) : (
        <div className="restaurant-grid">
          {restaurants.length > 0 ? (
            // Loop over the restaurants and render each RestaurantCard component
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id || restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <div>No restaurants found.</div> // Show message if no restaurants are available
          )}
        </div>
      )}
    </div>
  );
}

export default RestaurantList;
