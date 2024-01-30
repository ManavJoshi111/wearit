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
  return await Product.find({});
};

export const getProductById = async (id) => {
  return await Product.findOne({ _id: id });
};

// update
export const updateProduct = async (data) => {
  return await Product.updateOne(
    { _id: data._id },
    {
      $set: {
        ...data,
      },
    }
  );
};

// delete
export const deleteProduct = async (id) => {
  return await Product.deleteOne({ _id: id });
};
