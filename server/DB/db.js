import { MongoClient } from "mongodb";
import { MONGODB_LOCAL_URI } from "../utils/constants.js";
const uri = MONGODB_LOCAL_URI;
export const client = new MongoClient(uri);

export const connectToDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
