const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string

const fetchDataAndPrint = async () => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db("hotelsDB"); // Replace with your database name
    const collection = db.collection("hotels"); // Replace with your collection name

    // Fetch data from the collection
    const data = await collection.find().toArray();

    // Print the fetched data to the console
    console.log(data);

    // Close the connection when done
    client.close();
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

fetchDataAndPrint();