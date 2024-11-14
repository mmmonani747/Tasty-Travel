import React from "react";
import "../css/RestaurantCard.css"; // Import the CSS file for styling

function RestaurantCard({ restaurant }) {
  // Logging restaurant data for debugging purposes
  console.log("Restaurant data inside card:", restaurant);

  // Destructuring data for easier access
  const { name, address, rating, rating_count } = restaurant;

  // Fallback for missing or placeholder values
  const displayAddress = address && address !== "No address available" ? address : "Address not available";
  const displayRating = rating && rating !== "No rating available" ? rating : "Not rated yet";
  const displayRatingCount = rating_count && rating_count !== "No rating count available" ? rating_count : "No reviews yet";

  return (
    <div className="restaurant-card">
      <h2>{name || "Unnamed Restaurant"}</h2>
      <p><strong>Address:</strong> {displayAddress}</p>
      <p><strong>Rating:</strong> {displayRating}</p>
      <p><strong>Rating Count:</strong> {displayRatingCount}</p>
    </div>
  );
}

export default RestaurantCard;
