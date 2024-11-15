const mongoose= require('mongoose');
mongoose.connect("mongodb://localhost:27017/Restaurant-Api")
    .then(() => {
        console.log("Connection successful");
    })
    .catch((e) => {
        console.log("No connection", e);
    });
