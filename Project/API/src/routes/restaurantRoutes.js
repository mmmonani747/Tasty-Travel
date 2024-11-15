// routes/restaurantRoutes.js
const express = require('express');
const { addRestaurant, getRestaurants, getRestaurantsByCuisine, getRestaurantsByCity } = require('../controller/restaurantController');

const router = express.Router();

// POST route to add a new restaurant
router.post('/restaurants', addRestaurant);

// GET routes to fetch restaurants
router.get('/restaurants', getRestaurants);
router.get('/restaurants/cuisine/:cuisine', getRestaurantsByCuisine);
router.get('/restaurants/city/:city', getRestaurantsByCity);

module.exports = router;
