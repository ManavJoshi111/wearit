import { ObjectId } from "mongodb";
import { client } from "../DB/db.js";

const Cart = client.db("wearit").collection("carts");

export const getCartData = async (userId) => {
  return await Cart.find({ userId: new ObjectId(userId) }).toArray();
};

export const addToCartData = async ({ userId, productId, quantity }) => {
  console.log("Userid: ", userId);
  console.log("Productid: ", productId);
  const productExists = await Cart.findOne({
    userId: new ObjectId(userId),
    "products.productId": new ObjectId(productId),
  });
  if (productExists) {
    console.log("exists");
    return await Cart.findOneAndUpdate(
      {
        userId: new ObjectId(userId),
        "products.productId": new ObjectId(productId),
      },
      {
        $inc: {
          "products.$.quantity": quantity,
        },
      },
      {
        returnDocument: "after",
      }
    );
  } else {
    console.log("doesn't exist");
    return await Cart.findOneAndUpdate(
      { userId: new ObjectId(userId) },
      {
        $push: {
          products: { productId: new ObjectId(productId), quantity: quantity },
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
  }
};
