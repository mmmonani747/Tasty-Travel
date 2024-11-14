// controllers/restaurantController.js

// Import the Restaurant model
const Restaurant = require('../models/Restaurant');

// Controller function to get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // Fetch all restaurants from the database
    res.status(200).json(restaurants); // Send the list of restaurants as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error });
  }
};
