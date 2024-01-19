const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_LOCAL_URI;
const client = new MongoClient(uri);

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { client, connectToDB };
