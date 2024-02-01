import { ObjectId } from "mongodb";
import { client } from "../DB/db.js";
const Product = client.db("wearit").collection("products");

// create
export const insertProduct = async (data) => {
  return await Product.insertOne({
    ...data,
  });
};

// read
export const getAllProducts = async () => {
  return await Product.find({}).toArray();
};

export const getProductById = async (id) => {
  return await Product.findOne({ _id: new ObjectId(id) });
};

// update
export const updateProductData = async (data) => {
  return await Product.findOneAndUpdate(
    { _id: new ObjectId(data.id) },
    {
      $set: {
        ...data,
      },
    }
  );
};

// delete
export const deleteProductData = async (id) => {
  return await Product.deleteOne({ _id: new ObjectId(id) });
};
