const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant'); // Make sure the path to your Restaurant model is correct

// API route to fetch all restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = global.Restaurant || await Restaurant.find(); // Fetch data from global object or database
    res.json(restaurants); // Send response
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
