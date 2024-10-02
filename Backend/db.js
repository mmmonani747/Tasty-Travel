const mongoose = require('mongoose');

// Define the Restaurant schema (optional, but good practice)
const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  cuisine: String,
  rating: Number
});

// Create a Mongoose model for the Restaurant collection
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

async function mongoDB() {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/Tasty-Travel'); // Connect to MongoDB
    console.log('Connected to MongoDB:', conn.connection.host);
    // console.log('Database connected:', conn.connection.name);

    // const data = await Restaurant.find({}); // Fetch all documents from the Restaurant collection
    // console.log('Data fetched:', data);
    // const data = await fetched_data.find({}).toArray();
    // console.log('Data fetched:', data);
     const db = mongoose.connection.db;
        console.log('Database connected:', db.databaseName);
    const fetched_data = await db.collection("Restaurant");
    console.log('Collection found: ', fetched_data.collectionName);

    const data = await fetched_data.find({}).toArray();
    global.Restaurant=data;
    // console.log(global.Restaurant)
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if there's a database connection error
  }
}

module.exports = mongoDB;