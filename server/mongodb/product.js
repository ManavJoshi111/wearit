import { ObjectId } from "mongodb";
import { client } from "../DB/db.js";
import { Cart } from "./cart.js";
export const Product = client.db("wearit").collection("products");

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

export const getUserProductsData = async (id) => {
  return await Product.find({ userId: id }).toArray();
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
    },
    {
      returnDocument: "after",
    }
  );
};

// delete
export const deleteProductData = async (id) => {
  return await Product.deleteOne({ _id: new ObjectId(id) });
};

export const decreaseProductQuantity = async (cartId) => {
  const cart = await Cart.findOne({ _id: new ObjectId(cartId) });
  console.log("cart: ", cart, cartId);
  for (const product of cart.products) {
    await Product.findOneAndUpdate(
      { _id: new ObjectId(product.productId) },
      {
        $inc: {
          quantity: -product.quantity,
        },
      }
    );
  }
};
