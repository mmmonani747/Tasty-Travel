// controllers/restaurantController.js
const Restaurant = require('../models/res');

const addRestaurant = async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        const addedRestaurant = await newRestaurant.save();
        res.status(201).json(addedRestaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRestaurants = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 60;
    const skip = (page - 1) * limit;

    const { name, city, cuisine, rating } = req.query;
    let filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (cuisine) filter.cuisine = { $regex: cuisine, $options: 'i' };
    if (rating) filter.rating = { $gte: parseFloat(rating) };

    try {
        const totalRestaurants = await Restaurant.countDocuments(filter);
        const restaurants = await Restaurant.find(filter)
            .select('name city cuisine rating rating_count cost')
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: restaurants,
            total: totalRestaurants,
            currentPage: page,
            totalPages: Math.ceil(totalRestaurants / limit),
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRestaurantsByCuisine = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 60;
    const skip = (page - 1) * limit;

    const { city, rating } = req.query;
    let filter = { cuisine: req.params.cuisine };
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (rating) filter.rating = { $gte: parseFloat(rating) };

    try {
        const cuisineCount = await Restaurant.countDocuments(filter);
        const restaurants = await Restaurant.find(filter)
            .select('name city cuisine rating rating_count cost')
            .skip(skip)
            .limit(limit);

        if (restaurants.length === 0) {
            return res.status(404).json({ error: "No restaurants found with the specified cuisine." });
        }

        res.status(200).json({
            data: restaurants,
            total: cuisineCount,
            currentPage: page,
            totalPages: Math.ceil(cuisineCount / limit),
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRestaurantsByCity = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 60;
    const skip = (page - 1) * limit;

    const { cuisine, rating } = req.query;
    let filter = { city: req.params.city };
    if (cuisine) filter.cuisine = { $regex: cuisine, $options: 'i' };
    if (rating) filter.rating = { $gte: parseFloat(rating) };

    try {
        const cityCount = await Restaurant.countDocuments(filter);
        const restaurants = await Restaurant.find(filter)
            .select('name city cuisine rating rating_count cost')
            .skip(skip)
            .limit(limit);

        if (restaurants.length === 0) {
            return res.status(404).json({ error: "No restaurants found in the specified city." });
        }

        res.status(200).json({
            data: restaurants,
            total: cityCount,
            currentPage: page,
            totalPages: Math.ceil(cityCount / limit),
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addRestaurant,
    getRestaurants,
    getRestaurantsByCuisine,
    getRestaurantsByCity
};
