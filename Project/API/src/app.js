const express = require('express');
const cors = require('cors');
require('./db/connection');  // Database connection file
const RestaurantList = require('./models/res');  // Importing the Restaurant model

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle CORS for requests from your frontend (localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests only from your frontend's origin
}));

// POST route to add a new restaurant
app.post("/restaurants", async (req, res) => {
    try {
        const newRestaurant = new RestaurantList(req.body);
        console.log(req.body);  // Logging request body for debugging
        const addRestaurant = await newRestaurant.save();
        res.status(201).send(addRestaurant);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// GET route to fetch all restaurants
app.get("/restaurants", async (req, res) => {
    try {
        const getRes = await RestaurantList.find({});

        // Format data before sending to frontend
        const formattedData = getRes.map(restaurant => ({
            _id: restaurant._id,
            name: restaurant.name,
            cuisine: restaurant.cuisine,  // Corrected field name from `Cuisine` to `cuisine`
            address: restaurant.address || 'No address available', // Example of how you might format the address
            rating: restaurant.rating || 'No rating available',  // Add a fallback if no rating is available
            rating_count: restaurant.rating_count || 'No rating count available'  // Similar for rating_count
        }));

        res.status(200).send(formattedData);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// GET route to fetch restaurants by cuisine
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
    try {
        const getCuisine = await RestaurantList.find({ cuisine: req.params.cuisine });

        if (getCuisine.length === 0) {
            return res.status(404).send("No restaurants found with the specified cuisine.");
        }

        const formattedData = getCuisine.map(restaurant => ({
            _id: restaurant._id,
            name: restaurant.name,
            cuisine: restaurant.cuisine,
            address: restaurant.address,
            rating: restaurant.rating,
            rating_count: restaurant.rating_count
        }));

        res.send(formattedData);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// GET route to fetch restaurants by city
app.get("/restaurants/city/:city", async (req, res) => {
    try {
        const getCity = await RestaurantList.find({ city: req.params.city });

        if (getCity.length === 0) {
            return res.status(404).send("No restaurants found in the specified city.");
        }

        const formattedData = getRes.map(restaurant => ({
            _id: restaurant._id,
            name: restaurant.name,
            cuisine: restaurant.cuisine || 'Cuisine not specified',  // Default value if missing
            address: restaurant.address || 'No address available',  // Default value if missing
            rating: restaurant.rating || 'No rating available',  // Default value if missing
            rating_count: restaurant.rating_count || 'No rating count available'  // Default value if missing
        }));
        res.send(formattedData);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// Root route for testing
app.get("/", (req, res) => {
    res.send("Hello from Dhyan");
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
