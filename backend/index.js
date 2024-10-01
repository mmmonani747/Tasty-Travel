const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://user1:user1@cluster0.lymbh.mongodb.net/'
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function (err, data) {
                if (err) console.log(err);
                else {
                    console.log(data);
                }
            });
        }
    });
};

mongoDB();