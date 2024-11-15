const express = require('express');
const cors = require('cors');
require('./db/connection');  // Database connection file
const RestaurantList = require('./models/res');  // Importing the Restaurant model

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests only from your frontend's origin
}));

// POST route to add a new restaurant
app.post("/restaurants", async (req, res) => {
    try {
        const newRestaurant = new RestaurantList(req.body);
        const addRestaurant = await newRestaurant.save();
        res.status(201).send(addRestaurant);
    } catch (e) {
        res.status(400).send({ error: `Error adding restaurant: ${e.message}` });
    }
});

// GET route to fetch restaurants with pagination and optional search functionality
app.get("/restaurants", async (req, res) => {
    const { page = 1, limit = 60, search, location } = req.query;  // Adding location as a query param
    const skip = (page - 1) * parseInt(limit);

    // Construct filter based on the search query and location
    let filter = {};

    // Search functionality (by name, city, cuisine, or rating)
    if (search) {
        const numericSearch = parseFloat(search);
        filter = {
            $or: [
                { name: { $regex: search, $options: "i" } },     // Case-insensitive search for name
                { city: { $regex: search, $options: "i" } },     // Case-insensitive search for city
                { cuisine: { $regex: search, $options: "i" } },  // Case-insensitive search for cuisine
                ...(isNaN(numericSearch) ? [] : [{ rating: numericSearch }])  // Optional exact match for rating if numeric
            ]
        };
    }

    // Location filter (if provided)
    if (location) {
        filter.city = { $regex: location, $options: 'i' };  // Case-insensitive search by city (location)
    }

    try {
        const totalRestaurants = await RestaurantList.countDocuments(filter);
        const restaurants = await RestaurantList.find(filter)
            .select('name city cuisine rating rating_count cost')
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).send({
            data: restaurants,
            total: totalRestaurants,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalRestaurants / limit)
        });
    } catch (e) {
        res.status(400).send({ error: `Error fetching restaurants: ${e.message}` });
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
