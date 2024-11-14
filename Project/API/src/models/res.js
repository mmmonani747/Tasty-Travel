const mongoose = require('mongoose');

// Define Restaurant schema
const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    cuisine: {  // Ensure this is 'cuisine' and not 'Cusine' (case-sensitive)
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        default: 'No address available'  // Default value in case no address is provided
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 0  // Default value if no rating is provided
    },
    rating_count: {
        type: Number,
        default: 0  // Default value for rating count
    }
});

// Create and export the Restaurant model
const RestaurantList = mongoose.model("RestaurantList", RestaurantSchema);
module.exports = RestaurantList;
