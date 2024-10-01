const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user1:user1@cluster0.lymbh.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('Error connecting to MongoDB:', err));


  
 