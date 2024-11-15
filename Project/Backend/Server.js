const express = require('express');
const mongoDB = require('./db');
const cors = require('cors'); 
const RestaurantData=require('./models/Restaurant');

const app = express();
const PORT = 5000;


mongoDB();

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true 
};


app.use(cors(corsOptions));


app.use(express.json());

app.use('/api', require('./Routes/CreateUser')); 
app.use('/api',require('./Routes/LoginUser'));
app.use('/api/users', require('./routes/user'));

// app.use('/api',RestaurantData);
// app.use('/api', require('./Routes/GetRestaurants'));



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});