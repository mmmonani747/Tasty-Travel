import React from "react";

function RestaurantCard({ name, city, cuisine, rating }) {
  return (
    <div className="restaurant-card">
      <h3>{name}</h3>
      <p><strong>City:</strong> {city}</p>
      <p><strong>Cuisine:</strong> {cuisine}</p>
      <p><strong>Rating:</strong> {rating}</p>
    </div>
  );
}

export default RestaurantCard;
