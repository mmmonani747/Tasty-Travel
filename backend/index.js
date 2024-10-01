const mongoose = require('mongoose');

const mongoURI = 'mongodb://gofood:mern123@ac-kgn9gzn-shard-00-00.unfngxf.mongodb.net:27017,';

const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---", err)
    else {
      console.log("connected");
      const fetched_data = await mongoose.connection.db.collection("restaurants");
      fetched_data.find({}).toArray(function(err, data) {
        if (err) console.log(err);
        else {
          console.log(data);
        }
      });
    }
  });
};

mongoDB();