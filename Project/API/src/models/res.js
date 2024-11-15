const mongoose = require('mongoose');

// Define simplified Restaurant schema
const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    cuisine: {
        type: String,
        required: true,
        default: 'No cuisine available'
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    rating_count: {
        type: String,
        default: 'No rating count available'
    },
    cost: {
        type: String,
        default: 'Cost not available'
    },
    lic_no: {
        type: String,
        default: 'License number not available'
    },
    link: {
        type: String,
        default: 'Link not available'
    },
    address: {
        type: String,
        default: 'No address available'
    },
    menu: {
        type: String,
        default: 'No menu available'
    }
});

// Create and export the Restaurant model
const RestaurantList = mongoose.model("RestaurantList", RestaurantSchema);
module.exports = RestaurantList;
